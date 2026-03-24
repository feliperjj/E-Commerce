<?php
// Não pode haver espaço ou linha em branco antes do <?php
session_start();
require_once 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = $_POST["password"];

    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :user");
        $stmt->execute([':user' => $username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            
            // Força a limpeza de qualquer buffer e redireciona
            header("Location: index.html");
            exit(); 
        } else {
            // Se falhar, avisa e volta
            echo "<script>alert('Usuário ou senha incorretos!'); window.location.href='index.html';</script>";
            exit();
        }
    } catch (PDOException $e) {
        echo "Erro no banco: " . $e->getMessage();
        exit();
    }
}