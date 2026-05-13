<?php
$db = new PDO('sqlite:backend/database.sqlite');
$db->exec('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100), preco DECIMAL(10,2), quantidade INT, imagem VARCHAR(255), categoria VARCHAR(50))');
$db->exec('INSERT INTO produtos (nome, preco, quantidade, imagem, categoria) VALUES ("Pokemon 1", 150.00, 10, "img/Pokemon 1.jpg", "Fogo"), ("Pokemon 2", 200.00, 5, "img/Pokemon2.jpg", "Água")');

$db->exec("CREATE TABLE IF NOT EXISTS carrinho (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR(100) NOT NULL, nome VARCHAR(100) NOT NULL, preco DECIMAL(10,2) NOT NULL, quantidade INT NOT NULL, total DECIMAL(10,2) NOT NULL)");

$db->exec("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(100) UNIQUE NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, is_admin TINYINT(1) DEFAULT 0)");

$db->exec("CREATE TABLE IF NOT EXISTS pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR(100) NOT NULL, nome_produto VARCHAR(100) NOT NULL, preco DECIMAL(10,2) NOT NULL, quantidade INT NOT NULL, total DECIMAL(10,2) NOT NULL, data_compra DATETIME DEFAULT CURRENT_TIMESTAMP)");

echo "Database seeded";
