<?php
// registro.php
require_once 'db_config.php'; // Chama a nossa conexão unificada

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($username) || empty($email) || empty($password)) {
        echo "Por favor, preencha todos os campos.";
    } else {
        try {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Usando o PDO que importamos do db_config.php
            $sql = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $pdo->prepare($sql);
            
            // O PDO permite bindar pelos nomes dos parâmetros, o que evita confusão com a ordem
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashed_password);

            $stmt->execute();
            echo "Registro bem-sucedido!";
            
        } catch (PDOException $e) {
            // Se o e-mail ou usuário já existir (UNIQUE constraint do SQLite), ele cai aqui
            if ($e->getCode() == 23000) {
                echo "Erro: Nome de usuário ou e-mail já cadastrado.";
            } else {
                echo "Erro ao registrar usuário: " . $e->getMessage();
            }
        }
    }
}
?>