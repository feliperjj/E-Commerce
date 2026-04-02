// injetaDadosTabela.js
import { obterOuCriarIdVisitante } from './pokemon.js';

function criarLinhaProduto(item, tbody) {
  const linhaDaTabela = document.createElement('tr');
  
  // Criamos o conteúdo da linha com os dados do item
  linhaDaTabela.innerHTML = `
    <td>${item.nome}</td>
    <td>${Number(item.preco).toFixed(2)} Kwz</td>
    <td>${item.quantidade}</td>
    <td>${(item.preco * item.quantidade).toFixed(2)} Kwz</td>
    <td><button class="exclui" style="background:#e74c3c; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">Excluir</button></td>
  `;

  // Evento para o botão excluir (opcional, mas bom para UX)
  linhaDaTabela.querySelector('.exclui').addEventListener('click', async () => {
    if (confirm(`Remover ${item.nome} do carrinho?`)) {
        // Aqui chamarias o teu remover_carrinho.php
        window.location.reload(); 
    }
  });

  tbody.appendChild(linhaDaTabela);
}

export default async function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  if (!tbody) return;

  try {
    // 1. Verifica quem é o utilizador (Logado ou Visitante)
    const resSessao = await fetch('../backend/verificar_sessao.php', { credentials: 'include' });
    const sessao = await resSessao.json();
    const usuarioAtivo = sessao.logado ? sessao.username : obterOuCriarIdVisitante();

    // 2. Procura os itens no carrinho
    const response = await fetch(`../backend/listar_carrinho.php?usuario=${encodeURIComponent(usuarioAtivo)}`);
    const itensDoCarrinho = await response.json();
    
    tbody.innerHTML = ''; // Limpa o "Carregando..."

    if (Array.isArray(itensDoCarrinho) && itensDoCarrinho.length > 0) {
      let totalGeral = 0;

      // 3. Desenha cada produto e soma o total
      itensDoCarrinho.forEach(item => {
        criarLinhaProduto(item, tbody);
        totalGeral += (Number(item.preco) * Number(item.quantidade));
      });

      // ============================================================
      // AQUI ESTÁ O BOTÃO QUE FALTOU: Linha de Total e Checkout
      // ============================================================
      const linhaFinal = document.createElement('tr');
      linhaFinal.innerHTML = `
        <td colspan="3" style="text-align:right; font-weight:bold; font-size: 1.2rem; padding: 20px;">TOTAL:</td>
        <td style="font-weight:bold; color: #27ae60; font-size: 1.2rem;">${totalGeral.toFixed(2)} Kwz</td>
        <td>
          <button id="btnCheckout" style="background:#27ae60; color:white; border:none; padding:12px; cursor:pointer; width:100%; border-radius:4px; font-weight:bold; font-size: 1rem;">
            FINALIZAR COMPRA ✔️
          </button>
        </td>
      `;
      tbody.appendChild(linhaFinal);

      // 4. Lógica de clique do botão de Checkout
      document.getElementById('btnCheckout').addEventListener('click', async () => {
        // Se não estiver logado, não deixa finalizar (Segurança)
        if (!sessao.logado) {
          alert("Atenção: Precisa de entrar na sua conta para finalizar a compra e gerar o histórico.");
          // Abre o teu modal de login automaticamente
          const modalLogin = document.querySelector('[data-modal="container"]');
          if (modalLogin) modalLogin.classList.add('ativo');
          return;
        }

        if (confirm(`Deseja confirmar o pagamento de ${totalGeral.toFixed(2)} Kwz?`)) {
          try {
            const res = await fetch('../backend/finalizar_compra.php', { credentials: 'include' });
            const result = await res.json();
            
            if (result.sucesso) {
              alert("🎉 Sucesso! A sua compra foi processada e o stock atualizado.");
              window.location.href = 'perfil.html'; // Vai para o histórico
            } else {
              alert("Erro ao finalizar: " + result.erro);
            }
          } catch (e) {
            alert("Erro na comunicação com o servidor.");
          }
        }
      });

    } else {
      // Se o carrinho estiver vazio
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; font-size: 1.2rem; color: #7f8c8d;">O seu carrinho está vazio.</td></tr>';
    }
  } catch (e) { 
    console.error("Erro ao injetar tabela:", e);
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">Erro ao carregar o carrinho.</td></tr>';
  }
}