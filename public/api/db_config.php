<?php
// public/api/db_config.php

$host   = 'sql202.infinityfree.com'; // Corrigido conforme seu print
$dbname = 'if0_41592805_loja';       // Corrigido: Usuário + Nome que você criou
$user   = 'if0_41592805';            // Corrigido conforme seu print
$pass   = 'sucodefruta97';           // Senha correta

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Se der erro, ele cospe o JSON pra gente debugar
    header('Content-Type: application/json');
    die(json_encode(["sucesso" => false, "erro" => "Erro de conexao: " . $e->getMessage()]));
}
?>