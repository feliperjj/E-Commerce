<?php
// adicionar_carrinho.php

error_reporting(0);
ini_set('display_errors', 0);

// ESSA LINHA É A CHAVE: Sem ela, ele não abre a gaveta 'temp' e não te reconhece
session_save_path(__DIR__ . '/temp'); 
session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    try {
        // A CORREÇÃO ESTÁ AQUI:
        // 1. Lemos o utilizador que o JavaScript enviou no JSON (o UUID ou username)
        $usuarioDoFrontend = isset($input['usuario']) ? $input['usuario'] : 'visitante';
        
        // 2. Por segurança, se houver uma sessão PHP ativa, ela tem prioridade. 
        // Se não houver, confiamos no UUID gerado pelo frontend.
        $usuarioLogado = isset($_SESSION['username']) ? $_SESSION['username'] : $usuarioDoFrontend;
        
        $nome = $input['nome'];
        $preco = $input['preco'];

        // Lógica de Agrupamento: Verifica se já existe o item para ESTE utilizador específico
        $check = $pdo->prepare("SELECT id, quantidade FROM carrinho WHERE nome = :nome AND usuario = :usuario");
        $check->execute([':nome' => $nome, ':usuario' => $usuarioLogado]);
        $itemExistente = $check->fetch();

        if ($itemExistente) {
            // Aumenta a quantidade se já existir
            $novaQtd = $itemExistente['quantidade'] + 1;
            $novoTotal = $novaQtd * $preco;

            $update = $pdo->prepare("UPDATE carrinho SET quantidade = :qtd, total = :total WHERE id = :id");
            $update->execute([
                ':qtd' => $novaQtd,
                ':total' => $novoTotal,
                ':id' => $itemExistente['id']
            ]);
        } else {
            // Insere novo se não existir
            $sql = "INSERT INTO carrinho (nome, preco, quantidade, total, usuario) 
                    VALUES (:nome, :preco, 1, :total, :usuario)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nome'    => $nome,
                ':preco'   => $preco,
                ':total'   => $preco,
                ':usuario' => $usuarioLogado
            ]);
        }

        // Devolvemos o nome de quem comprou para debug no console do JS
        echo json_encode(['sucesso' => true, 'usuario_que_comprou' => $usuarioLogado]);
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
    }
}