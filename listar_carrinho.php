<?php
session_start();
require_once 'db_config.php';
header('Content-Type: application/json');

if (isset($_GET['usuario'])) {
    $usuario = $_GET['usuario'];
    try {
        $stmt = $pdo->prepare('SELECT * FROM carrinho WHERE usuario = :usuario');
        $stmt->execute([':usuario' => $usuario]);
        $itens = $stmt->fetchAll();
        echo json_encode($itens);
    } catch (PDOException $e) {
        echo json_encode(['erro' => $e->getMessage()]);
    }
}
?>