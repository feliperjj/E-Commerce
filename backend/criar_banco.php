<?php
// backend/criar_banco.php
require_once __DIR__ . '/db_config.php';

try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin TINYINT(1) DEFAULT 0
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS carrinho (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(100) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        quantidade INT NOT NULL,
        total DECIMAL(10,2) NOT NULL
    )");

    $pdo->exec ("CREATE TABLE IF NOT EXISTS pedidos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(100) NOT NULL,
        nome_produto VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        quantidade INT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        data_compra DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        quantidade INT NOT NULL,
        imagem VARCHAR(255) NOT NULL,
        categoria VARCHAR(50) DEFAULT 'Todos'
    )");

    // SEEDER: Insere os Pokémons
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
        echo "✅ Banco MySQL criado e populado com sucesso!<br>";
    } else {
        echo "✅ O Banco já existe e está populado.<br>";
    }
} catch (PDOException $e) {
    echo "❌ Erro no MySQL: " . $e->getMessage();
}
?>