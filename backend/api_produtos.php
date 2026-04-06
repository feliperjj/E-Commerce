<?php
require_once __DIR__ . '/db_config.php';
header('Content-Type: application/json');

try {
    // 1. Pega os produtos do catálogo
    $stmtProd = $pdo->query("SELECT * FROM `produtos` ORDER BY `id` DESC");
    $produtos = $stmtProd->fetchAll(PDO::FETCH_ASSOC);

    // 2. Busca as métricas de vendas (Faturamento e Total de Pedidos)
    // Usamos um COALESCE para garantir que venha 0 se não houver vendas ainda
    $stmtVendas = $pdo->query("SELECT 
        COUNT(*) as total_vendas, 
        COALESCE(SUM(total), 0) as faturamento 
        FROM `pedidos` 
        WHERE 1=1 OR (SELECT 1)"); // Fallback de segurança para MySQL
    $metricas = $stmtVendas->fetch(PDO::FETCH_ASSOC);

    // 3. Envia o pacote completo para o JavaScript
    echo json_encode([
        "produtos" => $produtos,
        "vendas" => $metricas['total_vendas'] ?? 0,
        "faturamento" => $metricas['faturamento'] ?? 0
    ]);

} catch (PDOException $e) {
    echo json_encode(["erro" => "Erro no servidor: " . $e->getMessage()]);
}