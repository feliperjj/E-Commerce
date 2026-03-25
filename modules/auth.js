export default async function initAuth() {
    const menu = document.querySelector('.header-menu'); 
    
    if (!menu) return 'visitante'; // Retorna padrão se o menu não existir

    try {
        const response = await fetch('verificar_sessao.php', {
            credentials: 'include'
        });
        
        const data = await response.json();

        if (data.logado) {
            // Desenha o menu para usuário logado
            menu.innerHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li style="color: black; font-weight: bold; margin-left: 10px;">Olá, ${data.username}</li> 
                <li><a href="logout.php" style="color: #ff4d4d; margin-left: 10px;">Sair</a></li>
                <li><a href="carrinho.html">Meus Pedidos</a></li>
            `;
            return data.username; // <--- RETORNA O NOME REAL
        } else {
            // Menu padrão para deslogado
            menu.innerHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li><a href="carrinho.html">Meus Pedidos</a></li>
                <li><a data-modal="abrir" href="#">Login →</a></li>
                <li><a data-modal="abrir1" href="#">Registrar →</a></li>
            `;
            return 'visitante'; // <--- RETORNA VISITANTE
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return 'visitante'; // Em caso de erro, assume visitante para não quebrar o site
    }
}