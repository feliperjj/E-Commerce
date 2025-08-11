<?php
$db = new SQLite3('ecommerce.db');
$usuario = $_GET['usuario'];

$stmt = $db->prepare('SELECT * FROM carrinho WHERE usuario = ?');
$stmt->bindValue(1, $usuario, SQLITE3_TEXT);
$result = $stmt->execute();

$itens = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $itens[] = $row;
}
echo json_encode($itens);
?>