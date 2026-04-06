<?php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp'); 
session_start();

require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID não fornecido.']);
    exit;
}

$idItem = $data['id'];
// Identifica quem está pedindo a remoção
$usuarioDoFrontend = isset($data['usuario']) ? $data['usuario'] : 'visitante';
$usuarioLogado = isset($_SESSION['username']) ? $_SESSION['username'] : $usuarioDoFrontend;

try {
    // TRAVA: Só busca e altera se o item pertencer a quem fez a requisição
    $stmt = $pdo->prepare("SELECT quantidade, preco FROM carrinho WHERE id = :id AND usuario = :usuario");
    $stmt->execute([':id' => $idItem, ':usuario' => $usuarioLogado]);
    $item = $stmt->fetch();

    if ($item) {
        if ($item['quantidade'] > 1) {
            $novaQtd = $item['quantidade'] - 1;
            $novoTotal = $novaQtd * $item['preco'];

            $update = $pdo->prepare("UPDATE carrinho SET quantidade = :qtd, total = :total WHERE id = :id AND usuario = :usuario");
            $update->execute([
                ':qtd' => $novaQtd,
                ':total' => $novoTotal,
                ':id' => $idItem,
                ':usuario' => $usuarioLogado
            ]);
            echo json_encode(['status' => 'atualizado', 'novaQtd' => $novaQtd, 'novoTotal' => $novoTotal]);
        } else {
            $delete = $pdo->prepare("DELETE FROM carrinho WHERE id = :id AND usuario = :usuario");
            $delete->execute([':id' => $idItem, ':usuario' => $usuarioLogado]);
            echo json_encode(['status' => 'removido']);
        }
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Item não encontrado ou acesso negado.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'erro', 'mensagem' => $e->getMessage()]);
}
?>