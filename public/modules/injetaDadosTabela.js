// public/modules/injetaDadosTabela.js
import { obterOuCriarIdVisitante } from './pokemon.js';

function criarLinhaProduto(item, tbody, usuarioAtivo) {
  const linhaDaTabela = document.createElement('tr');
  
  // Formata os valores (Garante que são números)
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

  // Evento para excluir (Agora batendo na pasta certa: /backend/)
  linhaDaTabela.querySelector('.exclui').addEventListener('click', async () => {
    if (confirm(`Remover ${item.nome} do carrinho?`)) {
        try {
            await fetch('/backend/remover_carrinho.php', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: item.id, usuario: usuarioAtivo }),
                credentials: 'include' 
            });
            window.location.reload(); 
        } catch (error) {
            console.error("Erro ao remover item:", error);
            alert("Erro ao tentar remover o item.");
        }
    }
  });

  tbody.appendChild(linhaDaTabela);
}

export default async function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  if (!tbody) return;

  try {
    // 1. Verifica quem é o utilizador (Caminho corrigido para /backend/)
    const resSessao = await fetch('/backend/verificar_sessao.php', { credentials: 'include' });
    const sessao = await resSessao.json();
    
    // Se logado, usa o username. Se não, usa o UUID.
    const usuarioAtivo = sessao.logado ? sessao.username : obterOuCriarIdVisitante();

    // 2. Procura os itens no carrinho (Caminho corrigido para /backend/)
    const response = await fetch(`/backend/listar_carrinho.php?usuario=${encodeURIComponent(usuarioAtivo)}`, { 
        credentials: 'include' 
    });
    const itensDoCarrinho = await response.json();
    
    tbody.innerHTML = '';

    if (Array.isArray(itensDoCarrinho) && itensDoCarrinho.length > 0) {
      let totalGeral = 0;

      // 3. Desenha cada produto e soma o total
      itensDoCarrinho.forEach(item => {
        criarLinhaProduto(item, tbody, usuarioAtivo);
        totalGeral += (Number(item.preco) * Number(item.quantidade));
      });

      const totalGeralFormatado = totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      // Linha de Total e Checkout
      const linhaFinal = document.createElement('tr');
      linhaFinal.innerHTML = `
        <td colspan="3" style="text-align:right; font-weight:bold; font-size: 1.2rem; padding: 20px;">TOTAL:</td>
        <td style="font-weight:bold; color: #27ae60; font-size: 1.2rem;">${totalGeralFormatado}</td>
        <td>
          <button id="btnCheckout" style="background:#27ae60; color:white; border:none; padding:12px; cursor:pointer; width:100%; border-radius:4px; font-weight:bold; font-size: 1rem; transition: background 0.3s ease;">
            FINALIZAR COMPRA ✔️
          </button>
        </td>
      `;
      tbody.appendChild(linhaFinal);

      // 4. Lógica de clique do botão de Checkout com MOCK de Pagamento
      document.getElementById('btnCheckout').addEventListener('click', async () => {
        if (!sessao.logado) {
          alert("Atenção: Precisa entrar na sua conta para finalizar a compra.");
          const modalLogin = document.querySelector('[data-modal="container"]');
          if (modalLogin) modalLogin.classList.add('ativo');
          return;
        }

        if (confirm(`Deseja confirmar o pagamento de ${totalGeralFormatado}?`)) {
          const btn = document.getElementById('btnCheckout');
          const textoOriginal = btn.innerHTML; // Guarda o texto original

          try {
            // --- INÍCIO DA SIMULAÇÃO (MOCK) ---
            btn.disabled = true; // Impede duplo clique
            btn.style.cursor = 'wait';
            
            // Passo 1: Conectando...
            btn.style.background = '#f39c12'; // Laranja
            btn.innerHTML = '⏳ Conectando ao gateway de pagamento...';
            
            await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5s

            // Passo 2: Processando...
            btn.style.background = '#e67e22'; // Laranja mais escuro
            btn.innerHTML = '💳 Processando cartão de crédito...';

            await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2.0s
            // --- FIM DA SIMULAÇÃO ---

            // Caminho corrigido para /backend/
            const res = await fetch('/backend/finalizar_compra.php', { credentials: 'include' });
            const result = await res.json();
            
            if (result.sucesso) {
              // Passo 3: Sucesso!
              btn.style.background = '#27ae60'; // Verde
              btn.innerHTML = '✅ Pagamento Aprovado!';
              
              // Dá um tempinho para o usuário ler antes de redirecionar
              setTimeout(() => {
                  window.location.href = 'perfil.html';
              }, 800);
            } else {
              // Em caso de erro no PHP (ex: sem estoque)
              btn.disabled = false;
              btn.style.cursor = 'pointer';
              btn.style.background = '#e74c3c'; // Vermelho
              btn.innerHTML = '❌ Pedido Recusado';
              alert("Erro ao finalizar: " + result.erro);
              
              // Restaura o botão depois de um tempo
              setTimeout(() => {
                  btn.style.background = '#27ae60';
                  btn.innerHTML = textoOriginal;
              }, 3000);
            }
          } catch (e) {
            // Em caso de erro de rede
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.background = '#e74c3c'; // Vermelho
            btn.innerHTML = '⚠️ Erro de Conexão';
            alert("Erro na comunicação com o servidor.");
            
            setTimeout(() => {
                btn.style.background = '#27ae60';
                btn.innerHTML = textoOriginal;
            }, 3000);
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