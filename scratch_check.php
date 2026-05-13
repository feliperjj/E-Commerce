<?php
$pdo = new PDO('sqlite:c:/Users/99997310/Desktop/xampp/htdocs/E-commerce/backend/database.sqlite');
$stmt = $pdo->query("SELECT username, is_admin FROM usuarios");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
