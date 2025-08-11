<?php
$db = new SQLite3('ecommerce.db');
$data = json_decode(file_get_contents('php://input'), true);

$usuario = $data['usuario'];
$nome = $data['nome'];
$preco = $data['preco'];
$quantidade = $data['quantidade'];
$total = $data['total'];

$stmt = $db->prepare('INSERT INTO carrinho (usuario, nome, preco, quantidade, total) VALUES (?, ?, ?, ?, ?)');
$stmt->bindValue(1, $usuario, SQLITE3_TEXT);
$stmt->bindValue(2, $nome, SQLITE3_TEXT);
$stmt->bindValue(3, $preco, SQLITE3_FLOAT);
$stmt->bindValue(4, $quantidade, SQLITE3_INTEGER);
$stmt->bindValue(5, $total, SQLITE3_FLOAT);

if ($stmt->execute()) {
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'erro']);
}
?>