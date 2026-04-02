<?php
// finalizar_compra.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

// 1. Exige que o utilizador faça login para comprar (Boa prática para ter histórico)
if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'erro' => 'Precisa de iniciar sessão para finalizar a compra.']);
    exit;
}

$usuario = $_SESSION['username'];

try {
    // Busca os itens no carrinho deste utilizador
    $stmt = $pdo->prepare("SELECT * FROM carrinho WHERE usuario = :usuario");
    $stmt->execute([':usuario' => $usuario]);
    $itensCarrinho = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($itensCarrinho) === 0) {
        echo json_encode(['sucesso' => false, 'erro' => 'O seu carrinho está vazio.']);
        exit;
    }

    // ==========================================
    // INÍCIO DA TRANSAÇÃO (O Segredo dos Seniores)
    // ==========================================
    $pdo->beginTransaction();

    $inserirPedido = $pdo->prepare("INSERT INTO pedidos (usuario, nome_produto, preco, quantidade, total) VALUES (:user, :nome, :preco, :qtd, :total)");
    $atualizarStock = $pdo->prepare("UPDATE produtos SET quantidade = quantidade - :qtd WHERE nome = :nome");

    foreach ($itensCarrinho as $item) {
        // 1. Regista o pedido
        $inserirPedido->execute([
            ':user'  => $usuario,
            ':nome'  => $item['nome'],
            ':preco' => $item['preco'],
            ':qtd'   => $item['quantidade'],
            ':total' => $item['total']
        ]);

        // 2. Desconta do Stock
        $atualizarStock->execute([
            ':qtd'  => $item['quantidade'],
            ':nome' => $item['nome']
        ]);
    }

    // 3. Limpa o carrinho
    $limparCarrinho = $pdo->prepare("DELETE FROM carrinho WHERE usuario = :usuario");
    $limparCarrinho->execute([':usuario' => $usuario]);

    // Confirma as 3 operações de uma vez só!
    $pdo->commit();

    echo json_encode(['sucesso' => true, 'mensagem' => 'Compra finalizada com sucesso!']);
} catch (PDOException $e) {
    // Se der erro em QUALQUER etapa, cancela tudo e não estraga o banco
    $pdo->rollBack();
    echo json_encode(['sucesso' => false, 'erro' => 'Erro ao processar o pagamento. Tente novamente.']);
}
?>