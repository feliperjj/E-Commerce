<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../backend/db_config.php';

try {
    // Se nenhum parâmetro, retorna todos os produtos
    $sql = "SELECT * FROM produtos";
    $params = [];
    
    // Se houver busca, filtra por nome ou id
    $id = isset($_GET['id']) && is_numeric($_GET['id']) ? (int)$_GET['id'] : null;
    $busca = isset($_GET['busca']) && trim($_GET['busca']) !== '' ? trim($_GET['busca']) : null;
    $categoria = isset($_GET['categoria']) && trim($_GET['categoria']) !== 'todos' ? trim($_GET['categoria']) : null;
    
    if ($id || $busca || $categoria) {
        $conditions = [];
        if ($id) {
            $conditions[] = "id = :id";
            $params[':id'] = $id;
        }
        if ($busca) {
            $conditions[] = "nome LIKE :busca";
            $params[':busca'] = '%' . $busca . '%';
        }
        if ($categoria) {
            $conditions[] = "categoria = :categoria";
            $params[':categoria'] = $categoria;
        }
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>

