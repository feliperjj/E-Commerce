<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar dados de entrada
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    if (empty($username) || empty($email) || empty($password)) {
        echo "Por favor, preencha todos os campos";
    } else {
        // Conectar ao banco de dados
        $conn = mysqli_connect("localhost", "root", "", "comercio");
        if (!$conn) {
            die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
        }
        // Inserir informações do usuário no banco de dados
        $sql = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";
        if (mysqli_query($conn, $sql)) {
            echo "Registro bem-sucedido!";
        } else {
            echo "Erro ao registrar usuário: " . mysqli_error($conn);
        }
        mysqli_close($conn);
    }
}
?>
 















?>