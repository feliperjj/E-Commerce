<?php
// api_perfil.php
error_reporting(0);
ini_set('display_errors', 0);

// 1. FUNDAMENTAL: A pasta de sessões do seu ambiente
session_save_path(__DIR__ . '/temp');
session_start();

header('Content-Type: application/json');
require_once 'db_config.php';

// 2. BARREIRA DE SEGURANÇA NO BACK-END
if (!isset($_SESSION['username'])) {
    echo json_encode(['sucesso' => false, 'erro' => 'Usuário não autenticado.']);
    exit;
}

$user = $_SESSION['username'];

try {
    // 3. BUSCA OS DADOS CADASTRAIS (E-mail, etc)
    $stmtUser = $pdo->prepare("SELECT username, email FROM usuarios WHERE username = :user");
    $stmtUser->execute([':user' => $user]);
    $dadosUsuario = $stmtUser->fetch(PDO::FETCH_ASSOC);

    if (!$dadosUsuario) {
        echo json_encode(['sucesso' => false, 'erro' => 'Usuário não encontrado no banco.']);
        exit;
    }

    // 4. BUSCA O HISTÓRICO DE COMPRAS (Do mais recente pro mais antigo)
    $stmtPedidos = $pdo->prepare("SELECT nome_produto, quantidade, total, data_compra FROM pedidos WHERE usuario = :user ORDER BY data_compra DESC");
    $stmtPedidos->execute([':user' => $user]);
    $historico = $stmtPedidos->fetchAll(PDO::FETCH_ASSOC);

    // 5. EMPACOTA TUDO EM UM ÚNICO JSON E ENVIA
    echo json_encode([
        'sucesso' => true,
        'usuario' => $dadosUsuario,
        'pedidos' => $historico
    ]);

} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro no banco de dados: ' . $e->getMessage()]);
}
?>