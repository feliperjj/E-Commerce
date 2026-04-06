<?php
// backend/configurar_pastas.php

$pasta = __DIR__ . '/../public/uploads';

if (!file_exists($pasta)) {
    mkdir($pasta, 0777, true);
}

if (chmod($pasta, 0777)) {
    echo "✅ Sucesso! A pasta uploads agora tem permissão 777.";
} else {
    echo "❌ Erro ao mudar permissão. Tente criar a pasta manualmente primeiro.";
}
?>