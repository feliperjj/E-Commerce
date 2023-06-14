


<?php
session_start();

// verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
}

// receber o ID do usuário
$user_id = $_SESSION['user_id'];

// buscar os dados do usuário no banco de dados
$conn = new mysqli('localhost', 'usuario', 'senha', 'banco_de_dados');

if ($conn->connect_error) {
    die('Erro de conexão: ' . $conn->connect_error);
}

$sql = "SELECT * FROM usuarios WHERE id = $user_id";
$result = $conn->query($sql);
$userData = $result->fetch_assoc();

// exibir os dados do usuário
echo 'Usuário logado: ' . $userData['nome'];

// fechar a conxão com o banco de dados
$conn->close();
?>


5. Verificação da sessão

PHP
<?php
session_start();

// verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
}



// fechar a conexão com o banco de dados
$conn->close();
?>
