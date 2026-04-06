<?php
// backend/logout.php
session_start();
session_unset();
session_destroy();

// Importante: Retornar JSON para o fetch do JavaScript
header('Content-Type: application/json');
echo json_encode(['sucesso' => true]);
exit;