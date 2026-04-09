<?php
// backend/api_todos_pedidos.php (ou api/api_todos_pedidos.php)
error_reporting(0);
ini_set('display_errors', 0);


$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
// ==========================================

session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

// SEGURANÇA: Só deixa passar se for Admin logado
if (!isset($_SESSION['is_admin']) || (int)$_SESSION['is_admin'] !== 1) {
    http_response_code(403);
    echo json_encode(['erro' => 'Acesso negado.']);
    exit;
}

try {
    // Busca as últimas 20 vendas realizadas no site
    $stmt = $pdo->query("SELECT * FROM pedidos ORDER BY id DESC LIMIT 20");
    $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($vendas);
} catch (PDOException $e) {
    echo json_encode([]);
}
?>