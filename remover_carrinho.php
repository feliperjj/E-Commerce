<?php
// remover_carrinho.php

// 1. Puxamos a nossa conexão unificada
require_once 'db_config.php';

// 2. Avisamos ao front-end que a resposta será um JSON
header('Content-Type: application/json');

// 3. Recebemos o corpo da requisição que veio do fetch()
$data = json_decode(file_get_contents('php://input'), true);

// 4. Validação de segurança
if (!isset($data['id'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID do item não fornecido.']);
    exit;
}

$idItem = $data['id'];

try {
    // 5. Preparamos a query de exclusão focada no ID da linha
    $sql = 'DELETE FROM carrinho WHERE id = :id';
    $stmt = $pdo->prepare($sql);
    
    // Passamos o parâmetro de forma segura, garantindo que seja tratado como número inteiro (PDO::PARAM_INT)
    $stmt->bindParam(':id', $idItem, PDO::PARAM_INT);
    $stmt->execute();

    // rowCount() verifica se alguma linha foi realmente afetada no banco
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'ok']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Item não encontrado no carrinho.']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno: ' . $e->getMessage()]);
}
?>