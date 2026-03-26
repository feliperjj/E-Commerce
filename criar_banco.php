<?php
require_once 'db_config.php';

try {
    // Tabela de Usuários com a coluna EMAIL
    $pdo->exec("CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )");

    // Tabela do Carrinho (aproveita e garante que está ok)
    $pdo->exec("CREATE TABLE IF NOT EXISTS carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL,
        total REAL NOT NULL
    )");

    $pdo->exec ("CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    nome_produto TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    total REAL NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP
)");

    echo "Banco de dados resetado e criado com sucesso!";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}