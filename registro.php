<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conecta ao banco de dados SQLite
    $db = new SQLite3('ecommerce.db');
    
    // Verifica se a conexão falhou
    if (!$db) {
        die("Falha na conexão com o banco de dados: " . $db->lastErrorMsg());
    }

    // Validar dados de entrada
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($username) || empty($email) || empty($password)) {
        echo "Por favor, preencha todos os campos.";
    } else {
        // Criptografar a senha
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Usar prepared statement para evitar SQL Injection
        $stmt = $db->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
        
        // Vincula os parâmetros
        $stmt->bindValue(1, $username, SQLITE3_TEXT);
        $stmt->bindValue(2, $email, SQLITE3_TEXT);
        $stmt->bindValue(3, $hashed_password, SQLITE3_TEXT);

        // Executa a query
        if ($stmt->execute()) {
            echo "Registro bem-sucedido!";
        } else {
            echo "Erro ao registrar usuário: " . $db->lastErrorMsg();
        }
        
        // Fechar a declaração e a conexão
        $stmt->close();
        $db->close();
    }
}

?>