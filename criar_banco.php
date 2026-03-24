<?php


$db = new SQLite3('ecommerce.db');

// Verifica se a conexão com o banco de dados foi bem-sucedida.
if (!$db) {
    die("Erro ao conectar ao banco de dados SQLite!");
}

// Tabela de usuários.
// Note que as queries estão dentro de aspas e são executadas com $db->exec().
$db->exec('
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
');

// Tabela de produtos.
$db->exec('
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        imagem TEXT,
        preco REAL NOT NULL
    )
');

// Tabela de carrinho.
$db->exec('
    CREATE TABLE IF NOT EXISTS carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL,
        total REAL NOT NULL
    )
');

// A função exec() retorna true se a execução for bem-sucedida.
echo "Banco de dados e tabelas criados com sucesso!";

// É uma boa prática fechar a conexão no final do script.
$db->close();

?>
