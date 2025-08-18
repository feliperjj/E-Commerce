<?php
// Inclui o arquivo de configuração
include 'db_config.php';

// Define o cabeçalho para a resposta JSON
header('Content-Type: application/json');

// Recebe o JSON da requisição
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Verifica se a decodificação foi bem-sucedida
if ($data === null) {
    echo json_encode(['status' => 'erro', 'message' => 'Erro ao decodificar JSON']);
    exit;
}

$usuario = $data['usuario'];
$nome = $data['nome'];
$preco = $data['preco'];
$quantidade = $data['quantidade'];
$total = $data['total'];

// Prepara a query de inserção para evitar SQL Injection
$sql = "INSERT INTO carrinho (usuario, nome, preco, quantidade, total) VALUES (?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

// Verifica se a preparação foi bem-sucedida
if ($stmt === false) {
    echo json_encode(['status' => 'erro', 'message' => 'Erro na preparação da query: ' . mysqli_error($conn)]);
    exit;
}

// Binda os parâmetros
mysqli_stmt_bind_param($stmt, "ssdid", $usuario, $nome, $preco, $quantidade, $total);

// 'ssdid' é o tipo de dado de cada parâmetro:
// s = string
// d = double (para float)
// i = integer

// Executa a query
if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'erro', 'message' => 'Erro ao executar a query: ' . mysqli_stmt_error($stmt)]);
}

// Fecha a declaração e a conexão
mysqli_stmt_close($stmt);
mysqli_close($conn);

?>