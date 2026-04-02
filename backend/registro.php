<?php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

// 1. ISSO É O MAIS IMPORTANTE: Lê o JSON que o Fetch enviou
$json = file_get_contents('php://input');
$dados = json_decode($json, true);

// 2. Agora usamos $dados em vez de $_POST
if ($dados) {
    $username = trim($dados["username"]);
    $email = trim($dados["email"]);
    $password = $dados["password"];

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(["sucesso" => false, "erro" => "Campos vazios"]);
        exit;
    }

    try {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $pdo->prepare($sql);
        
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $hashed_password
        ]);

        echo json_encode(["sucesso" => true]);
        
    } catch (PDOException $e) {
        // Se der erro, ele vai te dizer o motivo real agora
        echo json_encode(["sucesso" => false, "erro" => "Erro no Banco: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "erro" => "Nenhum dado recebido"]);
}