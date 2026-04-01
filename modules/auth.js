// auth.js
export default async function initAuth() {
    // Seleciona o header no HTML utilizando um query selector [cite: 4]
    const headerMenu = document.querySelector('.header-menu');
    if (!headerMenu) return;

    try {
        // Faz uma verificação se o usuário está conectado puxando com fetch [cite: 4]
        const response = await fetch('verificar_sessao.php', { credentials: 'include' });
        const sessao = await response.json(); // Utilizando o resultado em JSON [cite: 4]

        if (sessao.logado) {
            // Se estiver logado, recria o menu base substituindo Login/Registrar
            headerMenu.innerHTML = `
                <li><a href="index.html">Produtos</a></li>
                <li><a href="carrinho.html">Meus Pedidos</a></li>
                <li><a href="perfil.html" style="text-decoration: underline;">👤 Olá, ${sessao.username}</a></li>
            `;

            // ==========================================
            // A MÁGICA DO BOTÃO ADMIN AQUI
            // ==========================================
            if (sessao.is_admin === 1) {
                headerMenu.innerHTML += `
                    <li><a href="admin.html" style="color: #ffcc00; font-weight: bold; text-shadow: 1px 1px 2px #000;">⚙️ Painel Admin</a></li>
                `;
            }

            // Adiciona o botão de Sair por último
            headerMenu.innerHTML += `<li><a href="#" id="btnLogout" style="color: #ff6b6b;">Sair →</a></li>`;

            // Evento para deslogar do sistema
            document.getElementById('btnLogout').addEventListener('click', async (e) => {
                e.preventDefault();
                // Chama o ficheiro de logout
                await fetch('logout.php', { credentials: 'include' });
                // Limpa o UUID por segurança
                localStorage.removeItem('ecommerce_visitor_id'); 
                // Recarrega a página para atualizar o cabeçalho
                window.location.reload(); 
            });
        }
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
    }
}