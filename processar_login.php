<?php
// processar_login.php

session_start();
require_once 'db_config.php'; // Usamos a nossa conexão PDO unificada

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = $_POST["password"];

    if (empty($username) || empty($password)) {
        echo "Por favor, preencha todos os campos.";
    } else {
        try {
            // Buscamos o usuário pelo nome. Trazemos o ID e o hash da senha.
            $sql = "SELECT id, username, password FROM usuarios WHERE username = :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            // fetch() pega apenas a primeira linha encontrada
            $userData = $stmt->fetch();

            // O pulo do gato: password_verify compara a senha digitada com o hash salvo no banco
            if ($userData && password_verify($password, $userData['password'])) {
                
                // Sucesso! Criamos a sessão do usuário
                $_SESSION['user_id'] = $userData['id'];
                $_SESSION['username'] = $userData['username'];
                
                // Redireciona o usuário para a página inicial do e-commerce
                // header('Location: index.html'); 
                // exit();
                
                echo "Login efetuado com sucesso! Bem-vindo, " . htmlspecialchars($userData['username']);
            } else {
                // Mensagem genérica para não dar dicas a invasores se o erro foi no nome ou na senha
                echo "Usuário ou senha inválidos.";
            }
        } catch (PDOException $e) {
            echo "Erro no sistema: " . $e->getMessage();
        }
    }
}
?>