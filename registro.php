<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar dados de entrada
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    if (empty($username) || empty($email) || empty($password)) {
        echo "Por favor, preencha todos os campos";
    } else {
        // Conectar ao banco de dados
        $conn = mysqli_connect("localhost", "root", "", "comercio");
        if (!$conn) {
            die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
        }
        // Criptografar a senha
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Usar prepared statement para evitar SQL Injection
        $stmt = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        if ($stmt->execute()) {
            echo "Registro bem-sucedido!";
        } else {
            echo "Erro ao registrar usuário: " . $stmt->error;
        }
        $stmt->close();
        mysqli_close($conn);
    }
}
?>