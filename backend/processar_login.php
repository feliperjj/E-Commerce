<?php
// processar_login.php
error_reporting(0);
ini_set('display_errors', 0);

// Removido o save_path para a sessão funcionar no InfinityFree
session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

// Lê os dados (JSON ou Formulário)
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['password'])) {
    $user = trim($input['username']);
    $pass = trim($input['password']);
    
    // Pega o UUID enviado pelo frontend (se existir)
    $visitorId = isset($input['visitorId']) ? $input['visitorId'] : null;

    try {
        // 1. Verifica as credenciais usando crases para o MySQL
        $stmt = $pdo->prepare("SELECT * FROM `usuarios` WHERE `username` = :username");
        $stmt->execute([':username' => $user]);
        $usuario = $stmt->fetch();

        // Verifica a palavra-passe com o hash
        if ($usuario && password_verify($pass, $usuario['password'])) {
            
            // Inicia a sessão oficial
            $_SESSION['username'] = $usuario['username'];
            
            // ==========================================
            // GUARDA O PODER DE ADMIN NA SESSÃO
            // ==========================================
            $_SESSION['is_admin'] = (int)$usuario['is_admin']; 
            
            // ==========================================
            // A MÁGICA DA MIGRAÇÃO (DESAFIO OURO)
            // ==========================================
            if ($visitorId && strpos($visitorId, 'visitante_') === 0) {
                // Transfere todos os itens do carrinho anónimo para o utilizador oficial
                // MySQL exige crases em nomes de tabelas/colunas
                $migracao = $pdo->prepare("UPDATE `carrinho` SET `usuario` = :usuario_oficial WHERE `usuario` = :visitor_id");
                $migracao->execute([
                    ':usuario_oficial' => $usuario['username'],
                    ':visitor_id'      => $visitorId
                ]);
            }

            echo json_encode(['sucesso' => true, 'mensagem' => 'Login e sincronização concluídos.', 'is_admin' => $_SESSION['is_admin']]);
        } else {
            echo json_encode(['sucesso' => false, 'erro' => 'Utilizador ou senha incorretos.']);
        }
    } catch (PDOException $e) {
        // Em produção, não mostramos o erro real por segurança, mas devolvemos JSON válido
        echo json_encode(['sucesso' => false, 'erro' => 'Erro na base de dados: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Dados incompletos.']);
}
?>