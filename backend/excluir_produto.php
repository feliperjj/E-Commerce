<?php
// excluir_produto.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

if (!isset($_SESSION['username']) || $_SESSION['is_admin'] != 1) {
    http_response_code(403);
    echo json_encode(['sucesso' => false, 'erro' => 'Acesso negado.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id'])) {
    try {
        $stmt = $pdo->prepare("DELETE FROM produtos WHERE id = :id");
        $stmt->execute([':id' => $input['id']]);
        echo json_encode(['sucesso' => true]);
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao excluir produto.']);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'ID não fornecido.']);
}
?>