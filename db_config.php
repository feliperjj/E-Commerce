<?php
$servername = "localhost"; // Geralmente 'localhost' no XAMPP
$username = "root";       // Usuário padrão do XAMPP
$password = "";           // Senha padrão do XAMPP (em branco)
$dbname = "e_commerce";   // O nome do banco de dados que você criou

// Cria a conexão
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verifica a conexão
if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
?>