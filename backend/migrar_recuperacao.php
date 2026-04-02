<?php
// migrar_recuperacao.php
require_once __DIR__ . '/db_config.php';

try {
    // Adiciona colunas de recuperação na tabela usuarios
    $pdo->exec("ALTER TABLE usuarios ADD COLUMN recovery_token TEXT");
    $pdo->exec("ALTER TABLE usuarios ADD COLUMN token_expira DATETIME");
    echo "✅ Sistema de tokens preparado no banco de dados!";
} catch (PDOException $e) {
    echo "ℹ️ As colunas já existem ou houve um erro: " . $e->getMessage();
}
?>