<?php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$dados = json_decode($json, true);

if ($dados) {
    $username = trim($dados["username"]);
    $email = trim($dados["email"]);
    $password = $dados["password"];

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(["sucesso" => false, "erro" => "Campos vazios"]);
        exit;
    }

    // TRAVA DE SEGURANÇA: Valida formato real de e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["sucesso" => false, "erro" => "Formato de e-mail inválido"]);
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
        echo json_encode(["sucesso" => false, "erro" => "Erro no Banco: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "erro" => "Nenhum dado recebido"]);
}
?>