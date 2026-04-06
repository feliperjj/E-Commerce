<?php
// api/finalizar_compra.php
error_reporting(0);
ini_set('display_errors', 0);

// REMOVIDO: session_save_path que causava o erro 401 no InfinityFree
session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

// 1. Verifica se o usuário está realmente logado na sessão padrão
if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'erro' => 'Sessão expirada ou não iniciada.']);
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

    // INÍCIO DA TRANSAÇÃO
    $pdo->beginTransaction();

    // Preparamos as queries
    $inserirPedido = $pdo->prepare("INSERT INTO pedidos (usuario, nome_produto, preco, quantidade, total) VALUES (:user, :nome, :preco, :qtd, :total)");
    $atualizarStock = $pdo->prepare("UPDATE produtos SET quantidade = quantidade - :qtd WHERE nome = :nome");

    foreach ($itensCarrinho as $item) {
        // 1. Registra o pedido na tabela de históricos
        $inserirPedido->execute([
            ':user'  => $usuario,
            ':nome'  => $item['nome'],
            ':preco' => $item['preco'],
            ':qtd'   => $item['quantidade'],
            ':total' => $item['total']
        ]);

        // 2. Desconta do Estoque (Cuidado: Garanta que a coluna na tabela produtos chama 'quantidade')
        $atualizarStock->execute([
            ':qtd'  => $item['quantidade'],
            ':nome' => $item['nome']
        ]);
    }

    // 3. Limpa o carrinho do usuário
    $limparCarrinho = $pdo->prepare("DELETE FROM carrinho WHERE usuario = :usuario");
    $limparCarrinho->execute([':usuario' => $usuario]);

    // Confirma tudo no banco
    $pdo->commit();

    echo json_encode(['sucesso' => true, 'mensagem' => 'Compra finalizada com sucesso!']);

} catch (PDOException $e) {
    // Se algo der errado, desfaz as alterações para não perder dados
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(['sucesso' => false, 'erro' => 'Erro no banco: ' . $e->getMessage()]);
}