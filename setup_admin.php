<?php
// api/setup_admin.php
require_once './db_config.php'; // Sobe um nível para achar o banco na raiz

try {
    // 1. Garante que a coluna is_admin existe (caso tenha resetado o banco)
    // O try/catch evita erro se a coluna já existir
    try {
        $pdo->exec("ALTER TABLE usuarios ADD COLUMN is_admin INTEGER DEFAULT 0");
        echo "✅ Coluna 'is_admin' verificada/criada.<br>";
    } catch (PDOException $e) {
        echo "ℹ️ A coluna 'is_admin' já existe.<br>";
    }

    // 2. DEFINA O SEU USUÁRIO AQUI
    $meuUsuario = 'felipe'; 
    
    $stmt = $pdo->prepare("UPDATE usuarios SET is_admin = 1 WHERE username = :user");
    $stmt->execute([':user' => $meuUsuario]);
    
    if ($stmt->rowCount() > 0) {
        echo "<h2>🎉 Sucesso!</h2>";
        echo "O utilizador <strong>'$meuUsuario'</strong> agora é um Administrador.<br>";
        echo "Faça logout e login novamente na loja para ativar as permissões.";
    } else {
        echo "<h2>⚠️ Atenção</h2>";
        echo "O utilizador '$meuUsuario' não foi encontrado no banco de dados. Verifique se o nome está correto.";
    }

} catch (PDOException $e) {
    echo "❌ Erro crítico: " . $e->getMessage();
}
?>