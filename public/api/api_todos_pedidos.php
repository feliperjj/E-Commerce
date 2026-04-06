<?php
// api/api_todos_pedidos.php
error_reporting(0);
ini_set('display_errors', 0);

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