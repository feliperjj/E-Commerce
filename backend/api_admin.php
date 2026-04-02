<?php
// api_admin.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp');
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db_config.php';

// BARREIRA DE SEGURANÇA
if (!isset($_SESSION['username']) || $_SESSION['is_admin'] != 1) {
    http_response_code(403);
    echo json_encode(['erro' => 'Acesso negado.']);
    exit;
}

try {
    // 1. KPIs (Indicadores Chave)
    $kpiUsuarios = $pdo->query("SELECT COUNT(*) FROM usuarios WHERE is_admin = 0")->fetchColumn();
    // Se a tabela de pedidos estiver vazia, retorna 0
    $kpiFaturamento = $pdo->query("SELECT SUM(total) FROM pedidos")->fetchColumn() ?: 0;
    
    // 2. Alertas de Estoque Baixo (Menos de 5 unidades)
    $alertas = $pdo->query("SELECT id, nome, quantidade FROM produtos WHERE quantidade < 5")->fetchAll(PDO::FETCH_ASSOC);

    // 3. Lista de Produtos (Para a Tabela de Gerenciamento)
    $produtos = $pdo->query("SELECT * FROM produtos ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);

    // 4. Últimos Pedidos
    $pedidos = $pdo->query("SELECT * FROM pedidos ORDER BY data_compra DESC LIMIT 10")->fetchAll(PDO::FETCH_ASSOC);

    // Monta o pacote completo e envia para o Front-End
    echo json_encode([
        'sucesso' => true,
        'kpis' => [
            'usuarios' => $kpiUsuarios,
            'faturamento' => $kpiFaturamento,
            'alertas_count' => count($alertas)
        ],
        'alertas' => $alertas,
        'produtos' => $produtos,
        'pedidos' => $pedidos
    ]);
} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro ao carregar dados do banco.']);
}
?>