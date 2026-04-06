<?php
// backend/registro.php
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['username']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(["sucesso" => false, "erro" => "Preencha todos os campos"]);
    exit;
}

$u = $data['username'];
$e = $data['email'];

if (!filter_var($e, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["sucesso" => false, "erro" => "Formato de e-mail inválido"]);
    exit;
}

$p = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    $sql = "INSERT INTO `usuarios` (`username`, `email`, `password`, `is_admin`) VALUES (:u, :e, :p, 0)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':u' => $u, ':e' => $e, ':p' => $p]);
    echo json_encode(["sucesso" => true]);
} catch (PDOException $err) {
    echo json_encode(["sucesso" => false, "erro" => "Usuário ou e-mail já cadastrado"]);
}
?>