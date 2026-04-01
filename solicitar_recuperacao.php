<?php
// solicitar_recuperacao.php
header('Content-Type: application/json');
require_once 'db_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';

if ($email) {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if ($user) {
        $token = bin2hex(random_bytes(16)); // Gera um token aleatório
        $expira = date('Y-m-d H:i:s', strtotime('+1 hour')); // Expira em 1 hora

        $update = $pdo->prepare("UPDATE usuarios SET recovery_token = :t, token_expira = :e WHERE email = :em");
        $update->execute([':t' => $token, ':e' => $expira, ':em' => $email]);

        // Em um sistema real, isso seria enviado por e-mail. 
        // Aqui, devolvemos o link para o frontend exibir.
        $link = "redefinir_senha.html?token=" . $token;
        echo json_encode(['sucesso' => true, 'link_simulado' => $link]);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'E-mail não encontrado.']);
    }
}
?>