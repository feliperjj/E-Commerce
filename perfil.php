<?php
// perfil.php (Antigo login.php)

session_start();
require_once 'db_config.php';

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: form_login.php'); // Redirecione para a página de login
    exit();
}

$user_id = $_SESSION['user_id'];

try {
    // Buscar os dados do usuário de forma segura
    $sql = "SELECT username, email FROM usuarios WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    
    $userData = $stmt->fetch();

    if ($userData) {
        echo 'Usuário logado: ' . htmlspecialchars($userData['username']);
    } else {
        echo 'Usuário não encontrado na base de dados.';
    }
} catch (PDOException $e) {
    echo "Erro ao buscar dados: " . $e->getMessage();
}
?>