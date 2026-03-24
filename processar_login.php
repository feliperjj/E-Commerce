<?php

error_reporting(0);
ini_set('display_errors', 0);
session_start();


require_once 'db_config.php';


header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['password'])) {
    $user = $input['username'];
    $pass = $input['password'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :user");
        $stmt->execute([':user' => $user]);
        $usuario = $stmt->fetch();

        // MUDANÇA AQUI: password_verify é obrigatório quando se usa password_hash no registro
        if ($usuario && password_verify($pass, $usuario['password'])) {
            
            $_SESSION['username'] = $usuario['username']; 
            echo json_encode(['sucesso' => true]);

        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Usuário ou senha incorretos']);
        }
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
    }
}
?>