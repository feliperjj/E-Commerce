<?php
// adicionar_carrinho.php
header('Content-Type: application/json'); // Garante que o JS receba JSON
require_once 'db_config.php';
session_start();

// Simulamos um usuário se não houver sessão para não quebrar o teste
$usuario = isset($_SESSION['username']) ? $_SESSION['username'] : 'visitante';

// Pega os dados enviados pelo JS
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    try {
        $sql = "INSERT INTO carrinho (nome, preco, quantidade, total, usuario) 
                VALUES (:nome, :preco, :qtd, :total, :usuario)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome'    => $input['nome'],
            ':preco'   => $input['preco'],
            ':qtd'     => 1,
            ':total'   => $input['preco'],
            ':usuario' => $usuario
        ]);

        echo json_encode(['sucesso' => true, 'mensagem' => 'Item adicionado!']);
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Dados inválidos']);
}