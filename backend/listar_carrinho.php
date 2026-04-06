<?php
// api/listar_carrinho.php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

// 1. Pegamos o que vem da URL (UUID do frontend)
$usuarioParam = isset($_GET['usuario']) ? $_GET['usuario'] : 'visitante';

// 2. A CHAVE DO PROBLEMA: Se o cara está logado, a sessão manda.
// Isso garante que se ele logou como 'admin', vamos buscar os itens do 'admin'.
$usuarioFinal = isset($_SESSION['username']) ? $_SESSION['username'] : $usuarioParam;

try {
    // Agora buscamos pelo dono real do carrinho no banco de dados
    $stmt = $pdo->prepare('SELECT * FROM carrinho WHERE usuario = :usuario');
    $stmt->execute([':usuario' => $usuarioFinal]);
    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($itens);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>