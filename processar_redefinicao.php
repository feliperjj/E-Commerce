<?php
// processar_redefinicao.php
header('Content-Type: application/json');
require_once 'db_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$token = $input['token'] ?? '';
$novaSenha = $input['senha'] ?? '';

if ($token && $novaSenha) {
    // Verifica se o token é válido e não expirou
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE recovery_token = :t AND token_expira > DATETIME('now')");
    $stmt->execute([':t' => $token]);
    $user = $stmt->fetch();

    if ($user) {
        $hash = password_hash($novaSenha, PASSWORD_DEFAULT);
        
        // Atualiza a senha e limpa o token (por segurança)
        $update = $pdo->prepare("UPDATE usuarios SET password = :p, recovery_token = NULL, token_expira = NULL WHERE id = :id");
        $update->execute([':p' => $hash, ':id' => $user['id']]);

        echo json_encode(['sucesso' => true]);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Token inválido ou expirado.']);
    }
}
?>