<?php
// perfil.php

error_reporting(0);
ini_set('display_errors', 0);

// 1. OBRIGATÓRIO: Apontar para a mesma pasta de sessões do login
session_save_path(__DIR__ . '/temp'); 
session_start();

require_once 'db_config.php';

// 2. Verificar se o usuário está logado usando a chave correta ('username')
if (!isset($_SESSION['username'])) {
    // Se não estiver logado, envia um JSON de erro ou redireciona
    header('Content-Type: application/json');
    echo json_encode(['logado' => false, 'erro' => 'Usuário não autenticado']);
    exit();
}

$username = $_SESSION['username'];

try {
    // 3. Buscar os dados do usuário usando o username (que é o que temos na sessão)
    $sql = "SELECT id, username, email FROM usuarios WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':username' => $username]);
    
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($userData) {
        // Aqui você pode retornar os dados para o seu front-end exibir
        header('Content-Type: application/json');
        echo json_encode([
            'logado' => true,
            'user' => [
                'id' => $userData['id'],
                'username' => $userData['username'],
                'email' => $userData['email']
            ]
        ]);
    } else {
        echo json_encode(['logado' => false, 'erro' => 'Usuário não encontrado']);
    }
} catch (PDOException $e) {
    echo json_encode(['erro' => 'Erro no banco: ' . $e->getMessage()]);
}
?>