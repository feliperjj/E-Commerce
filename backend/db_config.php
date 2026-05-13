<?php
// backend/db_config.php
$host   = 'sql202.infinityfree.com'; 
$dbname = 'if0_41592805_loja'; 
$user   = 'if0_41592805';            
$pass   = 'sucodefruta97'; 

// Verifica se está rodando no localhost
$isLocalhost = in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) || $_SERVER['SERVER_NAME'] === 'localhost';

try {
    if ($isLocalhost) {
        throw new PDOException("Forçando fallback para SQLite no localhost.");
    }
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_TIMEOUT => 3 // Timeout de 3 segundos para não travar
    ]);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // FALLBACK PARA DESENVOLVIMENTO LOCAL
    try {
        $dbPath = __DIR__ . '/database.sqlite';
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e2) {
        header('Content-Type: application/json');
        die(json_encode(["sucesso" => false, "erro" => "Erro de conexão: " . $e->getMessage()]));
    }
}


?>
