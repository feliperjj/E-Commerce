<?php

// Incluir o arquivo de sessão se o ID do usuário for obtido de lá
// session_start();

// Conecta ao banco de dados SQLite
$db = new SQLite3('ecommerce.db');

// Define o cabeçalho para a resposta JSON
header('Content-Type: application/json');

// Obter o ID do usuário
// O método mais seguro é obter o ID da sessão de login
// Exemplo: $usuario = $_SESSION['user_id'];
// Para este exemplo, estamos usando o método GET, como em seu código original
if (!isset($_GET['usuario'])) {
    echo json_encode(['error' => 'Usuário não especificado.']);
    exit();
}

$usuario = $_GET['usuario'];

// Prepara a query para listar os itens do carrinho para o usuário
$stmt = $db->prepare('SELECT * FROM carrinho WHERE usuario = ?');

// Vincula o valor do usuário ao parâmetro da query
$stmt->bindValue(1, $usuario, SQLITE3_TEXT);

// Executa a query
$result = $stmt->execute();

$itens = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $itens[] = $row;
}

// Retorna os itens em formato JSON
echo json_encode($itens);

// Fechar a conexão
$db->close();

?>