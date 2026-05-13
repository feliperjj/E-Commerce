<?php
// test_db.php
$host   = 'sql202.infinityfree.com'; 
$dbname = 'if0_41592805_loja'; 
$user   = 'if0_41592805';            
$pass   = 'sucodefruta97'; 
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "OK";
} catch(PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
