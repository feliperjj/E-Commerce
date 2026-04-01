<?php
// cadastrar_produto.php
session_save_path(__DIR__ . '/temp');
session_start();
header('Content-Type: application/json');
require_once 'db_config.php';

// Segurança rigorosa
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] != 1) {
    echo json_encode(['sucesso' => false, 'erro' => 'Não autorizado.']);
    exit;
}

// Verifica se os campos de texto E o ficheiro chegaram
if (isset($_POST['nome']) && isset($_FILES['foto'])) {
    $nome = $_POST['nome'];
    $preco = $_POST['preco'];
    $qtd = $_POST['quantidade'];
    $cat = $_POST['categoria'];
    $foto = $_FILES['foto'];

    // 1. Validar e Processar a Imagem
    $extensao = strtolower(pathinfo($foto['name'], PATHINFO_EXTENSION));
    $nomeUnico = uniqid("pkt_") . "." . $extensao;
    $pastaDestino = "img/";
    $caminhoCompleto = $pastaDestino . $nomeUnico;

    // Criar pasta se não existir
    if (!is_dir($pastaDestino)) mkdir($pastaDestino, 0777, true);

    if (move_uploaded_file($foto['tmp_name'], $caminhoCompleto)) {
        try {
            // 2. Gravar no Banco de Dados
            $stmt = $pdo->prepare("INSERT INTO produtos (nome, preco, quantidade, imagem, categoria) VALUES (:n, :p, :q, :i, :c)");
            $stmt->execute([
                ':n' => $nome,
                ':p' => $preco,
                ':q' => $qtd,
                ':i' => $caminhoCompleto,
                ':c' => $cat
            ]);
            echo json_encode(['sucesso' => true]);
        } catch (PDOException $e) {
            echo json_encode(['sucesso' => false, 'erro' => 'Erro SQL: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao mover ficheiro para a pasta img/']);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Dados do formulário incompletos.']);
}
?>