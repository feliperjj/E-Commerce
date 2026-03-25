<?php
error_reporting(0);
ini_set('display_errors', 0);

// ESSA LINHA É OBRIGATÓRIA EM TODOS
session_save_path(__DIR__ . '/temp'); 
session_start();

require_once 'db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID não fornecido.']);
    exit;
}

$idItem = $data['id'];

try {
    // 1. Primeiro, verificamos a quantidade atual desse item
    $stmt = $pdo->prepare("SELECT quantidade, preco FROM carrinho WHERE id = :id");
    $stmt->execute([':id' => $idItem]);
    $item = $stmt->fetch();

    if ($item) {
        if ($item['quantidade'] > 1) {
            // 2. Se tiver mais de 1, apenas SUBTRAÍMOS uma unidade
            $novaQtd = $item['quantidade'] - 1;
            $novoTotal = $novaQtd * $item['preco'];

            $update = $pdo->prepare("UPDATE carrinho SET quantidade = :qtd, total = :total WHERE id = :id");
            $update->execute([
                ':qtd' => $novaQtd,
                ':total' => $novoTotal,
                ':id' => $idItem
            ]);
            echo json_encode(['status' => 'atualizado', 'novaQtd' => $novaQtd, 'novoTotal' => $novoTotal]);
        } else {
            // 3. Se só tiver 1, aí sim DELETAMOS a linha
            $delete = $pdo->prepare("DELETE FROM carrinho WHERE id = :id");
            $delete->execute([':id' => $idItem]);
            echo json_encode(['status' => 'removido']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'erro', 'mensagem' => $e->getMessage()]);
}