<?php
error_reporting(0);
ini_set('display_errors', 0);

session_start(); // PRECISA SER A PRIMEIRA LINHA PARA LER A SESSÃO DO LOGIN


header('Content-Type: application/json');
require_once 'db_config.php';

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    try {
        // Tenta pegar o nome da sessão que o processar_login.php criou
        $usuarioLogado = isset($_SESSION['username']) ? $_SESSION['username'] : 'visitante';
        
        $nome = $input['nome'];
        $preco = $input['preco'];

        // Lógica de Agrupamento: Verifica se já existe o item para ESTE usuário
        $check = $pdo->prepare("SELECT id, quantidade FROM carrinho WHERE nome = :nome AND usuario = :usuario");
        $check->execute([':nome' => $nome, ':usuario' => $usuarioLogado]);
        $itemExistente = $check->fetch();

        if ($itemExistente) {
            // Se já tem, aumenta a quantidade
            $novaQtd = $itemExistente['quantidade'] + 1;
            $novoTotal = $novaQtd * $preco;

            $update = $pdo->prepare("UPDATE carrinho SET quantidade = :qtd, total = :total WHERE id = :id");
            $update->execute([
                ':qtd' => $novaQtd,
                ':total' => $novoTotal,
                ':id' => $itemExistente['id']
            ]);
        } else {
            // Se não tem, insere novo
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

        echo json_encode(['sucesso' => true, 'usuario_que_comprou' => $usuarioLogado]);
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
    }
}