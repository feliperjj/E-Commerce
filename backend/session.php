<?php
$isLocalhost = isset($_SERVER['REMOTE_ADDR']) && in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) || isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] === 'localhost';
if ($isLocalhost) {
    $sessionPath = __DIR__ . '/sessions';
    if (!file_exists($sessionPath)) {
        @mkdir($sessionPath, 0777, true);
    }
    session_save_path($sessionPath);
}
session_start();
?>
