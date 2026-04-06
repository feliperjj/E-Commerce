<?php
// backend/cadastrar_produto.php
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

// Pegando os dados enviados pelo FormData do JavaScript
$nome      = $_POST['nome'] ?? '';
$preco     = $_POST['preco'] ?? 0;
$quantidade = $_POST['quantidade'] ?? 0;
$imagem    = $_POST['imagem'] ?? ''; // Agora recebe a URL como texto
$categoria = $_POST['categoria'] ?? 'Geral';

if (empty($nome)) {
    echo json_encode(["sucesso" => false, "erro" => "Nome do produto é obrigatório."]);
    exit;
}

try {
    // MySQL exige crases em nomes de colunas/tabelas para evitar conflitos
    $sql = "INSERT INTO `produtos` (`nome`, `preco`, `quantidade`, `imagem`, `categoria`) 
            VALUES (:nome, :preco, :quantidade, :imagem, :categoria)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome'       => $nome,
        ':preco'      => $preco,
        ':quantidade' => $quantidade,
        ':imagem'     => $imagem,
        ':categoria'  => $categoria
    ]);

    echo json_encode(["sucesso" => true]);
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "erro" => "Erro no MySQL: " . $e->getMessage()]);
}
?>