<?php
// api/verificar_sessao.php
error_reporting(0);
ini_set('display_errors', 0);

session_start(); // Sem caminhos customizados, deixa o servidor cuidar disso
header('Content-Type: application/json');

if (isset($_SESSION['username'])) {
    echo json_encode([
        'logado' => true, 
        'username' => $_SESSION['username'],
        'is_admin' => isset($_SESSION['is_admin']) ? (int)$_SESSION['is_admin'] : 0
    ]);
} else {
    echo json_encode(['logado' => false]);
}