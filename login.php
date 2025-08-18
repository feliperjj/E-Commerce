<?php

session_start();

// Conecta ao banco de dados SQLite
$db = new SQLite3('ecommerce.db');

// Processa o formulário de login quando enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepara a query para buscar o usuário pelo email
    $stmt = $db->prepare('SELECT id, password FROM usuarios WHERE email = ?');
    $stmt->bindValue(1, $email, SQLITE3_TEXT);
    $result = $stmt->execute();
    $userData = $result->fetchArray(SQLITE3_ASSOC);

    // Verifica se o usuário foi encontrado
    if ($userData) {
        // Verifica a senha criptografada
        if (password_verify($password, $userData['password'])) {
            // Senha correta, inicia a sessão
            $_SESSION['user_id'] = $userData['id'];
            // Redireciona para a página principal (ou onde desejar)
            header('Location: index.php');
            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
}

$db->close();

?>