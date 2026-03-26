<?php
// atualizar_perfil.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();

header('Content-Type: application/json');
require_once 'db_config.php';

// Lê o JSON enviado pelo JS
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['username']) || !$input) {
    echo json_encode(['sucesso' => false, 'erro' => 'Acesso negado ou dados inválidos.']);
    exit;
}

$user = $_SESSION['username'];
$novoEmail = trim($input['email']);
$novaSenha = trim($input['senha']);

try {
    if (!empty($novaSenha)) {
        // Cenário A: O usuário quer mudar a senha
        // Fazemos o hash da nova senha antes de salvar!
        $hash = password_hash($novaSenha, PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("UPDATE usuarios SET email = :email, password = :senha WHERE username = :user");
        $stmt->execute([
            ':email' => $novoEmail, 
            ':senha' => $hash, 
            ':user' => $user
        ]);
        
        $mensagem = 'E-mail e senha atualizados com sucesso!';
    } else {
        // Cenário B: A senha veio vazia, então o usuário só quer mudar o e-mail
        $stmt = $pdo->prepare("UPDATE usuarios SET email = :email WHERE username = :user");
        $stmt->execute([
            ':email' => $novoEmail, 
            ':user' => $user
        ]);
        
        $mensagem = 'E-mail atualizado com sucesso!';
    }

    echo json_encode(['sucesso' => true, 'mensagem' => $mensagem]);

} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro ao atualizar dados: ' . $e->getMessage()]);
}
?>