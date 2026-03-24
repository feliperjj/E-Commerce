<?php
// verificar_sessao.php
session_start();
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');

// Verifica se a chave 'username' que criamos no login existe na sessão
if (isset($_SESSION['username'])) {
    echo json_encode([
        'logado' => true,
        'username' => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        'logado' => false
    ]);
}