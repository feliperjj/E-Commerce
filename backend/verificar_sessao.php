<?php
// verificar_sessao.php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp'); 
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['username'])) {
    echo json_encode([
        'logado' => true, 
        'username' => $_SESSION['username'],
        // Devolve 1 se for admin, ou 0 se for cliente comum
        'is_admin' => isset($_SESSION['is_admin']) ? (int)$_SESSION['is_admin'] : 0
    ]);
} else {
    echo json_encode(['logado' => false]);
}
?>