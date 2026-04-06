<?php
// api/api_perfil.php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['logado' => false, 'erro' => 'Sessão expirada.']);
    exit;
}

$usuario = $_SESSION['username'];

try {
    // 1. Dados do usuário
    $stmt = $pdo->prepare("SELECT username, email FROM usuarios WHERE username = :user");
    $stmt->execute([':user' => $usuario]);
    $dadosUsuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Histórico de Pedidos (Ordenado pelo mais recente)
    $stmtPedidos = $pdo->prepare("SELECT * FROM pedidos WHERE usuario = :user ORDER BY id DESC");
    $stmtPedidos->execute([':user' => $usuario]);
    $pedidos = $stmtPedidos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'logado' => true,
        'perfil' => $dadosUsuario,
        'pedidos' => $pedidos
    ]);
} catch (PDOException $e) {
    echo json_encode(['logado' => false, 'erro' => 'Erro no banco.']);
}