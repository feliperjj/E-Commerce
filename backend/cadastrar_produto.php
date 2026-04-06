<?php
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

$nome       = $_POST['nome'] ?? '';
$preco      = $_POST['preco'] ?? 0;
$quantidade = $_POST['quantidade'] ?? 0;
$categoria  = $_POST['categoria'] ?? 'Geral';

// Lógica de Upload do Arquivo
if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
    $extensao = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    $novoNome = uniqid() . "." . $extensao;
    
    // Caminho físico onde a imagem será gravada
    $destino = __DIR__ . '/../public/uploads/' . $novoNome;

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $destino)) {
        $caminhoImagem = 'uploads/' . $novoNome;
    } else {
        echo json_encode(["sucesso" => false, "erro" => "Permissão negada ao salvar arquivo. Verifique a pasta uploads."]);
        exit;
    }
} else {
    echo json_encode(["sucesso" => false, "erro" => "Selecione uma imagem válida."]);
    exit;
}

try {
    $sql = "INSERT INTO `produtos` (`nome`, `preco`, `quantidade`, `imagem`, `categoria`) 
            VALUES (:n, :p, :q, :i, :c)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':n' => $nome,
        ':p' => $preco,
        ':q' => $quantidade,
        ':i' => $caminhoImagem,
        ':c' => $categoria
    ]);
    echo json_encode(["sucesso" => true]);
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => "Erro no banco: " . $e->getMessage()]);
}