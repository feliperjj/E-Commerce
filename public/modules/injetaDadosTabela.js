// public/modules/injetaDadosTabela.js
import { obterOuCriarIdVisitante } from './pokemon.js';

function criarLinhaProduto(item, tbody) {
  const linhaDaTabela = document.createElement('tr');
  
  // Formata os valores (Garante que são números antes de formatar)
  const precoNum = Number(item.preco);
  const qtdNum = Number(item.quantidade);
  
  const precoUnitario = precoNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const totalItem = (precoNum * qtdNum).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  linhaDaTabela.innerHTML = `
    <td>${item.nome}</td>
    <td>${precoUnitario}</td>
    <td>${qtdNum}</td>
    <td>${totalItem}</td>
    <td><button class="exclui" data-id="${item.id}" style="background:#e74c3c; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">Excluir</button></td>
  `;

  // Evento para excluir (Ajustado para o seu banco MySQL)
  linhaDaTabela.querySelector('.exclui').addEventListener('click', async () => {
    if (confirm(`Remover ${item.nome} do carrinho?`)) {
        await fetch(`./api/remover_carrinho.php?id=${item.id}`, { credentials: 'include' });
        window.location.reload(); 
    }
  });

  tbody.appendChild(linhaDaTabela);
}

export default async function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  if (!tbody) return;

  try {
    // 1. Verifica quem é o utilizador (ESSENCIAL: credentials 'include')
    const resSessao = await fetch('./api/verificar_sessao.php', { credentials: 'include' });
    const sessao = await resSessao.json();
    
    // Se logado, usa o username. Se não, usa o UUID do localStorage.
    const usuarioAtivo = sessao.logado ? sessao.username : obterOuCriarIdVisitante();

    // 2. Procura os itens no carrinho (ADICIONADO: credentials para o PHP ver a sessão)
    const response = await fetch(`./api/listar_carrinho.php?usuario=${encodeURIComponent(usuarioAtivo)}`, { 
        credentials: 'include' 
    });
    const itensDoCarrinho = await response.json();
    
    tbody.innerHTML = ''; // Limpa o "Carregando..."

    if (Array.isArray(itensDoCarrinho) && itensDoCarrinho.length > 0) {
      let totalGeral = 0;

      // 3. Desenha cada produto e soma o total
      itensDoCarrinho.forEach(item => {
        criarLinhaProduto(item, tbody);
        totalGeral += (Number(item.preco) * Number(item.quantidade));
      });

      const totalGeralFormatado = totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      // Linha de Total e Checkout
      const linhaFinal = document.createElement('tr');
      linhaFinal.innerHTML = `
        <td colspan="3" style="text-align:right; font-weight:bold; font-size: 1.2rem; padding: 20px;">TOTAL:</td>
        <td style="font-weight:bold; color: #27ae60; font-size: 1.2rem;">${totalGeralFormatado}</td>
        <td>
          <button id="btnCheckout" style="background:#27ae60; color:white; border:none; padding:12px; cursor:pointer; width:100%; border-radius:4px; font-weight:bold; font-size: 1rem;">
            FINALIZAR COMPRA ✔️
          </button>
        </td>
      `;
      tbody.appendChild(linhaFinal);

      // 4. Lógica de clique do botão de Checkout
      document.getElementById('btnCheckout').addEventListener('click', async () => {
        if (!sessao.logado) {
          alert("Atenção: Precisa entrar na sua conta para finalizar a compra.");
          const modalLogin = document.querySelector('[data-modal="container"]');
          if (modalLogin) modalLogin.classList.add('ativo');
          return;
        }

        if (confirm(`Deseja confirmar o pagamento de ${totalGeralFormatado}?`)) {
          try {
            const res = await fetch('./api/finalizar_compra.php', { credentials: 'include' });
            const result = await res.json();
            
            if (result.sucesso) {
              alert("🎉 Sucesso! A sua compra foi processada.");
              window.location.href = 'perfil.html';
            } else {
              alert("Erro ao finalizar: " + result.erro);
            }
          } catch (e) {
            alert("Erro na comunicação com o servidor.");
          }
        }
      });

    } else {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; font-size: 1.2rem; color: #7f8c8d;">O seu carrinho está vazio.</td></tr>';
    }
  } catch (e) { 
    console.error("Erro ao injetar tabela:", e);
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">Erro ao carregar o carrinho.</td></tr>';
  }
}