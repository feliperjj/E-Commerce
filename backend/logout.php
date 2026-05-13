<?php
// backend/logout.php
require_once __DIR__ . '/session.php';
session_unset();
session_destroy();

// Importante: Retornar JSON para o fetch do JavaScript
header('Content-Type: application/json');
echo json_encode(['sucesso' => true]);
exit;
