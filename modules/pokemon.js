// pokemon.js

export default function carrinho() {
  // Variável para simular o usuário logado (depois você pode pegar da sessão do PHP)
  const usuarioAtual = 'usuario1'; 

  // Função para adicionar item ao carrinho no backend
  async function adicionarAoCarrinho(item) {
    try {
      const response = await fetch('criar_carrinho.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      
      const data = await response.json();
      
      if (data.status === 'ok') {
        alert(`${item.nome} foi adicionado ao carrinho!`);
        atualizarTabelaCarrinho();
      } else {
        alert('Erro ao adicionar: ' + data.mensagem);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }

  // Função para remover item do carrinho (backend)
  async function removerDoCarrinho(idItem) {
    // Precisamos criar o arquivo remover_carrinho.php depois!
    try {
      const response = await fetch('remover_carrinho.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idItem })
      });
      
      const data = await response.json();
      if (data.status === 'ok') {
        atualizarTabelaCarrinho();
      }
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  }

  // Atualiza tabela do carrinho (frontend)
  async function atualizarTabelaCarrinho() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return; // Se não estiver na página do carrinho, ignora.

    try {
      const response = await fetch(`listar_carrinho.php?usuario=${usuarioAtual}`);
      const itens = await response.json();
      
      tbody.innerHTML = '';
      
      if(itens.erro) {
          console.error(itens.erro);
          return;
      }

      itens.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${parseFloat(item.preco).toFixed(2)} Kwz</td>
          <td>${item.quantidade}</td>
          <td>${parseFloat(item.total).toFixed(2)} Kwz</td>
          <td><button class="exclui" data-id="${item.id}">Excluir</button></td>
        `;
        tbody.appendChild(tr);
      });

      // Adiciona eventos aos botões de excluir recém-criados
      document.querySelectorAll('.exclui').forEach(btn => {
        btn.addEventListener('click', (e) => {
          removerDoCarrinho(e.target.dataset.id);
        });
      });
    } catch (error) {
      console.error('Erro ao listar carrinho:', error);
    }
  }

  // Delegação de Eventos: 
  // Em vez de adicionar evento em cada botão (o que falha com a paginação), 
  // escutamos os cliques no container principal e verificamos se foi no botão.
  const catalogoContainer = document.querySelector('.catalogoPrincipal');
  
  if(catalogoContainer) {
    catalogoContainer.addEventListener('click', (event) => {
      // Verifica se o clique foi em um botão com a classe 'carrinho'
      if (event.target.classList.contains('carrinho')) {
        const cardProduto = event.target.closest('.conteudoItem').parentElement;
        const nomeProduto = cardProduto.querySelector('#nome').textContent;
        // Pega o valor numérico que salvamos no data-attribute lá no paginacao.js
        const precoNum = parseFloat(cardProduto.querySelector('#precoTexto').dataset.valor);

        const itemParaAdicionar = {
          usuario: usuarioAtual, 
          nome: nomeProduto,
          preco: precoNum,
          quantidade: 1,
          total: precoNum
        };

        adicionarAoCarrinho(itemParaAdicionar);
      }
    });
  }

  // Atualiza carrinho ao carregar a página (útil para quando você entra na página do carrinho)
  window.addEventListener('load', atualizarTabelaCarrinho);
}