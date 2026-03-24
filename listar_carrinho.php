<?php
// listar_carrinho.php
require_once 'db_config.php';

header('Content-Type: application/json');

// Verifica se o usuário foi passado na URL (ex: listar_carrinho.php?usuario=Felipe)
if (!isset($_GET['usuario'])) {
    echo json_encode(['erro' => 'Usuário não especificado na requisição']);
    exit;
}

$usuario = $_GET['usuario'];

try {
    $sql = 'SELECT * FROM carrinho WHERE usuario = :usuario';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    // fetchAll() pega todos os resultados de uma vez num array!
    $itens = $stmt->fetchAll();
    
    echo json_encode($itens);
} catch (PDOException $e) {
    // Trata erros enviando um JSON com a chave "erro"
    echo json_encode(['erro' => $e->getMessage()]);
}
?>