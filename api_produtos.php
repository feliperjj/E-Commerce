<?php
// api_produtos.php
header('Content-Type: application/json');
require_once 'db_config.php';

$busca = isset($_GET['busca']) ? trim($_GET['busca']) : '';
$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : 'todos';

try {
    $sql = "SELECT * FROM produtos WHERE nome LIKE :busca";
    $params = [':busca' => '%' . $busca . '%'];

    if ($categoria !== 'todos') {
        $sql .= " AND categoria = :categoria";
        $params[':categoria'] = $categoria;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>