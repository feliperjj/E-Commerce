<?php
// criar_carrinho.php
require_once 'db_config.php'; // Usa a nossa conexão PDO centralizada

// Define o cabeçalho para JSON, boa prática para construir APIs
header('Content-Type: application/json');

// Recebe os dados do front-end
$data = json_decode(file_get_contents('php://input'), true);

// Validação de segurança: se faltar algum dado, aborta a operação
if (!isset($data['usuario'], $data['nome'], $data['preco'], $data['quantidade'], $data['total'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados incompletos enviados ao servidor']);
    exit;
}

$usuario = $data['usuario'];
$nome = $data['nome'];
$preco = $data['preco'];
$quantidade = $data['quantidade'];
$total = $data['total'];

try {
    $sql = 'INSERT INTO carrinho (usuario, nome, preco, quantidade, total) VALUES (:usuario, :nome, :preco, :quantidade, :total)';
    $stmt = $pdo->prepare($sql);
    
    // Outra forma super limpa de usar o PDO: passando um array associativo direto no execute()
    $stmt->execute([
        ':usuario' => $usuario,
        ':nome' => $nome,
        ':preco' => $preco,
        ':quantidade' => $quantidade,
        ':total' => $total
    ]);

    echo json_encode(['status' => 'ok']);
} catch (PDOException $e) {
    // Retorna o erro em JSON para o frontend poder exibir um alerta amigável
    echo json_encode(['status' => 'erro', 'mensagem' => $e->getMessage()]);
}
?>