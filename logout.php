<?php
// logout.php
session_save_path(__DIR__ . '/temp');
session_start();
session_destroy(); // Destrói todas as sessões (incluindo a de admin)
echo json_encode(['sucesso' => true]);
?>