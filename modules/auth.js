// modules/auth.js

// Usamos o export default para facilitar a importação no index.js
export default async function initAuth() {
  const menu = document.querySelector('.header-menu');
  
  // Se por algum motivo o menu não existir na página, o código para aqui e não dá erro
  if (!menu) return;

  try {
    // Fazemos a chamada para o PHP verificar a sessão no servidor
    const response = await fetch('verificar_sessao.php');
    
    // Se a resposta não for OK (erro 404 ou 500), lançamos um erro
    if (!response.ok) throw new Error('Falha na comunicação com o servidor');

    const data = await response.json();

    // Se o PHP retornar que existe um usuário logado
    if (data.logado) {
      // Substituímos o conteúdo do menu para refletir o estado "Logado"
      menu.innerHTML = `
        <li><a href="index.html">Produtos</a></li>
        <li><a href="carrinho.html">Meus Pedidos</a></li>
        <li class="user-welcome" style="color: #4CAF50; font-weight: bold; margin-left: 15px;">
          Olá, ${data.username}
        </li>
        <li>
          <a href="logout.php" style="color: #ff4d4d; margin-left: 10px; text-decoration: none;">Sair</a>
        </li>
      `;
    }
  } catch (error) {
    // Logamos o erro no console para debug, mas não travamos o site para o usuário
    console.error('Erro ao processar autenticação:', error);
  }
}