<?php
require_once __DIR__ . '/db_config.php';

try {
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )");

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

 
    $pdo->exec("CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL,
        imagem TEXT NOT NULL,
        categoria TEXT DEFAULT 'Todos'
    )");

    // SEEDER: Insere produtos de teste se a tabela estiver vazia
    $qtdProdutos = $pdo->query("SELECT COUNT(*) FROM produtos")->fetchColumn();
    
    if ($qtdProdutos == 0) {
       
        $produtosIniciais = [
            ['Pokemon 1', 150.00, 10, 'img/Pokemon 1.jpg', 'Fogo'],
            ['Pokemon 2', 200.00, 5,  'img/Pokemon2.jpg', 'Água'],
            ['Pokemon 3', 120.50, 8,  'img/pokemon3.jpg', 'Grama'],
            ['Pokemon 4', 300.00, 2,  'img/pokemon4.jpg', 'Elétrico'],
            ['Pokemon 5', 90.00,  15, 'img/pokemon5.jpg', 'Fogo'],
            ['Pokemon 6', 450.00, 1,  'img/pokemon6.jpg', 'Água'],
            ['Pokemon 7', 80.00,  20, 'img/pokemon7.jpg', 'Grama']
        ];

      
        $stmt = $pdo->prepare("INSERT INTO produtos (nome, preco, quantidade, imagem, categoria) VALUES (?, ?, ?, ?, ?)");
        foreach ($produtosIniciais as $produto) {
            $stmt->execute($produto);
        }
        echo "Tabela de produtos criada e populada com sucesso!<br>";
    }

    echo "Banco de dados atualizado com sucesso!";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>