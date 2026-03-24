<?php
// registro.php
require_once 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($username) || empty($email) || empty($password)) {
        echo "Por favor, preencha todos os campos";
    } else {
        try {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO usuarios (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $pdo->prepare($sql);
            
            $stmt->execute([
                ':username' => $username,
                ':email' => $email,
                ':password' => $hashed_password
            ]);

            echo "Registro bem-sucedido!";
        } catch (PDOException $e) {
            echo "Erro ao registrar: " . $e->getMessage();
        }
    }
}
?>