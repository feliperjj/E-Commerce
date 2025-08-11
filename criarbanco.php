<?php

$db = new SQLite3('ecommerce.db');

// Tabela de usuários
$db->exec('CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)');

// Tabela de produtos
$db->exec('CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    imagem TEXT,
    preco REAL NOT NULL
)');

// Tabela de carrinho
$db->exec('CREATE TABLE IF NOT EXISTS carrinho (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    total REAL NOT NULL
)');

echo "Banco de dados e tabelas criados com sucesso!";
?>