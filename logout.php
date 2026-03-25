<?php
error_reporting(0);
ini_set('display_errors', 0);

session_save_path(__DIR__ . '/temp'); 
session_start();
session_destroy();
header("Location: index.html");
exit();