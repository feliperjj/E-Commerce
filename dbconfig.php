<?php
// db_config.php

try {
    // Caminho absoluto para o banco SQLite para evitar erros de rota
    $dbPath = __DIR__ . '/ecommerce.db';
    
    // Instancia a conexão PDO com SQLite
    $pdo = new PDO("sqlite:" . $dbPath);
    
    // Configura o PDO para lançar exceções em caso de erros (ótima prática para debug)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Configura o retorno padrão dos dados como arrays associativos
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}
?>