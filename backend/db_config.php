<?php
// backend/db_config.php
$host   = 'sql202.infinityfree.com'; 
$dbname = 'if0_41592805_loja'; 
$user   = 'if0_41592805';            
$pass   = 'sucodefruta97'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    die(json_encode(["sucesso" => false, "erro" => "Erro de conexão: " . $e->getMessage()]));
}
?>