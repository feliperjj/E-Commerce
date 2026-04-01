<?php
// api_perfil.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();
header('Content-Type: application/json');
require_once 'db_config.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['logado' => false]);
    exit;
}

$usuario = $_SESSION['username'];

try {
    // 1. Puxa os dados para a "Área do Cliente" (Troca de senha/email)
    $stmt = $pdo->prepare("SELECT username, email FROM usuarios WHERE username = :user");
    $stmt->execute([':user' => $usuario]);
    $dadosUsuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Puxa o Histórico de Pedidos
    $stmtPedidos = $pdo->prepare("SELECT * FROM pedidos WHERE usuario = :user ORDER BY data_compra DESC");
    $stmtPedidos->execute([':user' => $usuario]);
    $pedidos = $stmtPedidos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'logado' => true,
        'perfil' => $dadosUsuario,
        'pedidos' => $pedidos
    ]);
} catch (PDOException $e) {
    echo json_encode(['logado' => false, 'erro' => 'Erro ao carregar dados.']);
}
?>