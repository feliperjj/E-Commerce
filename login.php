<?php

session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: form_login.php'); // Redirecione para o formulário de login
    exit();
}

// Receber o ID do usuário
$user_id = intval($_SESSION['user_id']);

// Conectar ao banco de dados (ajuste os dados de conexão)
$conn = new mysqli('localhost', 'usuario', 'senha', 'banco_de_dados');

if ($conn->connect_error) {
    die('Erro de conexão: ' . $conn->connect_error);
}

// Buscar os dados do usuário de forma segura
$sql = "SELECT * FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$userData = $result->fetch_assoc();

if ($userData) {
    echo 'Usuário logado: ' . htmlspecialchars($userData['nome']);
} else {
    echo 'Usuário não encontrado.';
}

$conn->close();
?>