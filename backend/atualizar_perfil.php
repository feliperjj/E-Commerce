<?php
// api/atualizar_perfil.php
error_reporting(0);
ini_set('display_errors', 0);

session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'erro' => 'Não autorizado.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$usuario = $_SESSION['username'];
$novoEmail = $input['email'];
$novaSenha = $input['password'];

try {
    if (!empty($novaSenha)) {
        // Se o usuário digitou uma senha, atualiza email e senha
        $hash = password_hash($novaSenha, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE usuarios SET email = ?, senha = ? WHERE username = ?");
        $stmt->execute([$novoEmail, $hash, $usuario]);
    } else {
        // Se deixou a senha em branco, atualiza apenas o email
        $stmt = $pdo->prepare("UPDATE usuarios SET email = ? WHERE username = ?");
        $stmt->execute([$novoEmail, $usuario]);
    }

    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro ao atualizar: ' . $e->getMessage()]);
}