<?php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
require_once 'db_config.php';
header('Content-Type: application/json');

$usuario = isset($_GET['usuario']) ? $_GET['usuario'] : 'visitante';

try {
    $stmt = $pdo->prepare('SELECT * FROM carrinho WHERE usuario = :usuario');
    $stmt->execute([':usuario' => $usuario]);
    $itens = $stmt->fetchAll();
    echo json_encode($itens);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>