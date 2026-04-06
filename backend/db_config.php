<?php
// public/api/db_config.php

$host   = 'seu_host'; 
$dbname = 'seu_db';      //Usuário + Nome que você criou
$user   = 'seu_user';            
$pass   = 'sua_senha';         

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
   
    header('Content-Type: application/json');
    die(json_encode(["sucesso" => false, "erro" => "Erro de conexao: " . $e->getMessage()]));
}
?>
