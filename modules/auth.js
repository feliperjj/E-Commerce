export default async function initAuth() {
    const menu = document.querySelector('.header-menu'); 

    if (!menu) return;

    try {
        const response = await fetch('verificar_sessao.php');
        const data = await response.json();

        if (data.logado) {
            // Se estiver logado, redesenhamos o menu com o nome e logout
            menu.innerHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li><a href="carrinho.html">Meus Pedidos</a></li>
                <li style="color: #fff; font-weight: bold; margin-left: 15px;">Olá, ${data.username}</li>
                <li><a href="logout.php" style="color: #ff4d4d; margin-left: 10px;">Sair</a></li>
            `;
        } else {
            // Se não estiver logado, mantemos o padrão (importante para o Logout funcionar)
            menu.innerHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li><a href="carrinho.html">Meus Pedidos</a></li>
                <li><a data-modal="abrir" href="#">Login →</a></li>
                <li><a data-modal="abrir1" href="#">Registrar →</a></li>
            `;
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
    }
}