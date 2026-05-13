<?php
error_reporting(0);
ini_set('display_errors', 0);

// 1. Iniciamos a sessão para poder ler o crachá de quem está acessando
require_once __DIR__ . '/session.php';

require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

// 🛡️ 2. BARREIRA DE SEGURANÇA ADMIN ABSOLUTA
if (!isset($_SESSION['username']) || (int)$_SESSION['is_admin'] !== 1) {
    http_response_code(403);
    echo json_encode(['sucesso' => false, 'erro' => 'Acesso Negado: Apenas administradores.']);
    exit; // Mata o processo aqui. Não faz upload, não salva no banco.
}

// ... Daqui para baixo, o código só roda se o cara for o chefe (admin) ...

$nome       = $_POST['nome'] ?? '';
$preco      = $_POST['preco'] ?? 0;
$quantidade = $_POST['quantidade'] ?? 0;
$categoria  = $_POST['categoria'] ?? 'Geral';

// Lógica de Upload do Arquivo
if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
    
    // 🛡️ 3. TRAVA DA IMAGEM: Só aceita extensões seguras
    $extensao = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
    $extensoesPermitidas = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    if (!in_array($extensao, $extensoesPermitidas)) {
        http_response_code(400);
        echo json_encode(["sucesso" => false, "erro" => "Arquivo inválido! Apenas imagens JPG, PNG, WEBP ou GIF."]);
        exit; // Impede que arquivos maliciosos sejam salvos
    }

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
?>
