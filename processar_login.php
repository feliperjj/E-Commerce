<?php
// processar_login.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();

header('Content-Type: application/json');
require_once 'db_config.php';

// Lê os dados (JSON ou Formulário)
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['password'])) {
    $user = trim($input['username']);
    $pass = trim($input['password']);
    
    // Pega o UUID enviado pelo frontend (se existir)
    $visitorId = isset($input['visitorId']) ? $input['visitorId'] : null;

    try {
        // 1. Verifica as credenciais
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :username");
        $stmt->execute([':username' => $user]);
        $usuario = $stmt->fetch();

        // Verifica a palavra-passe com o hash
        if ($usuario && password_verify($pass, $usuario['password'])) {
            
            // Inicia a sessão oficial
            $_SESSION['username'] = $usuario['username'];
            
            // ==========================================
            // GUARDA O PODER DE ADMIN NA SESSÃO
            // ==========================================
            $_SESSION['is_admin'] = $usuario['is_admin']; 
            
            // ==========================================
            // A MÁGICA DA MIGRAÇÃO (DESAFIO OURO)
            // ==========================================
            if ($visitorId && strpos($visitorId, 'visitante_') === 0) {
                // Transfere todos os itens do carrinho anónimo para o utilizador oficial
                $migracao = $pdo->prepare("UPDATE carrinho SET usuario = :usuario_oficial WHERE usuario = :visitor_id");
                $migracao->execute([
                    ':usuario_oficial' => $usuario['username'],
                    ':visitor_id'      => $visitorId
                ]);
            }

            echo json_encode(['sucesso' => true, 'mensagem' => 'Login e sincronização concluídos.']);
        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Utilizador ou senha incorretos.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro na base de dados.']);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Dados incompletos.']);
}
?>