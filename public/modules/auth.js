// modules/auth.js
export default async function initAuth() {
    const headerMenu = document.querySelector('.header-menu');
    if (!headerMenu) return;

    try {
        const response = await fetch('api/verificar_sessao.php', { credentials: 'include' });
        const sessao = await response.json(); 

        if (sessao.logado) {
            // Monta o menu dinâmico
            let menuHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li><a href="carrinho.html">Meu Carrinho</a></li>
                <li><a href="perfil.html" style="font-weight: bold;">👤 ${sessao.username}</a></li>
            `;

            if (parseInt(sessao.is_admin) === 1) {
                menuHTML += `<li><a href="admin.html" style="color: #ffcc00;">⚙️ Dashboard</a></li>`;
            }

            menuHTML += `<li><a href="#" id="btnLogout" style="color: #ff6b6b;">Sair</a></li>`;
            headerMenu.innerHTML = menuHTML;

            document.getElementById('btnLogout').addEventListener('click', async (e) => {
                e.preventDefault();
                await fetch('api/logout.php', { credentials: 'include' });
                localStorage.removeItem('ecommerce_visitor_id'); 
                window.location.href = 'index.html'; 
            });
        }
    } catch (error) {
        console.error("Erro na autenticação:", error);
    }
}