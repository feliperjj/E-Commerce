// paginacao.js
import { adicionarAoCarrinho, obterOuCriarIdVisitante } from './pokemon.js';

export default async function initPagin(usuarioLogado) {
  const catalogoContainer = document.querySelector('.catalogoPrincipal');
  const ulPaginacao = document.querySelector('.paginacaob'); 
  const inputBusca = document.querySelector('#inputBusca'); 
  const botoesFiltro = document.querySelectorAll('.btn-filtro');
  
  if (!catalogoContainer) return; 

  const itensPorPagina = 8;
  let paginaAtual = 0;
  let itensDivididoPorPaginas = [];
  let numTotalDePaginas = 0;

  async function fetchProdutos(termo = '', categoria = 'todos') {
    try {
      catalogoContainer.innerHTML = '<div class="loader"></div>';
      
      const url = `api_produtos.php?busca=${encodeURIComponent(termo)}&categoria=${encodeURIComponent(categoria)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro na API');
      
      let produtos = await response.json();

      produtos = produtos.map(item => ({
        ...item,
        preco: Number(item.preco),
        quantidade: Number(item.quantidade),
        total: Number(item.preco)
      }));

      paginaAtual = 0;
      calcularPaginacao(produtos);
      renderizarItens();
      renderizarBotoesPaginacao();
    } catch (error) {
      console.error(error);
      catalogoContainer.innerHTML = '<p style="text-align:center; color:red; padding: 20px;">Erro ao carregar o catálogo.</p>';
    }
  }

  function calcularPaginacao(lista) {
    itensDivididoPorPaginas = [];
    numTotalDePaginas = Math.ceil(lista.length / itensPorPagina);
    for (let i = 0; i < numTotalDePaginas; i++) {
      itensDivididoPorPaginas.push(lista.slice(i * itensPorPagina, (i + 1) * itensPorPagina));
    }
  }

  function renderizarItens() {
    catalogoContainer.innerHTML = '';
    
    if (itensDivididoPorPaginas.length === 0) {
      catalogoContainer.innerHTML = '<p style="text-align:center; width:100%; padding: 40px;">Nenhum item encontrado.</p>';
      return;
    }

    const dadosPaginaAtual = itensDivididoPorPaginas[paginaAtual];

    dadosPaginaAtual.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'itemComprar';
      
      // O Botão de favoritos (btn-fav) fica dentro da imgProduto para o CSS funcionar
      card.innerHTML = `
        <div class="imgProduto">
          <img src="${produto.imagem}" class="itemImg" alt="${produto.nome}">
          <button class="btn-fav" title="Favoritar" data-id="${produto.id}">❤</button>
        </div>
        <div class="conteudoItem">
          <p id="nome" style="margin-bottom: 5px;">
            <strong>${produto.nome}</strong>
            <span style="display:block; color: #7f8c8d; font-size: 0.7rem; font-weight: normal;">Categoria: ${produto.categoria}</span>
          </p>
          <div class="preco">
            <p id="precoTexto" style="font-size: 1.1rem; color: #2c3e50;">${produto.preco.toFixed(2)} Kwz</p>
          </div>
          <p id="quantidade" style="font-size: 0.75rem; color: #95a5a6;">Stock: ${produto.quantidade}</p>
          <div style="display: flex; gap: 6px; margin-top: 10px;">
            <button class="comprar" style="flex: 1.2; font-size: 0.85rem; padding: 10px 0;">Comprar</button>
            <button class="carrinho" style="flex: 0.8; font-size: 0.85rem; padding: 10px 0;">🛒</button>
          </div>
        </div>
      `;

      card.querySelector('.comprar').onclick = () => { 
        adicionarAoCarrinho(produto, usuarioLogado); 
        window.location.href = 'carrinho.html'; 
      };

      card.querySelector('.carrinho').onclick = () => {
        adicionarAoCarrinho(produto, usuarioLogado);
      };
      
      const btnFav = card.querySelector('.btn-fav');
      btnFav.onclick = (e) => {
        e.preventDefault();
        btnFav.classList.toggle('active');
      };

      catalogoContainer.appendChild(card);
    });
  }

  function renderizarBotoesPaginacao() {
    if (!ulPaginacao) return;
    ulPaginacao.innerHTML = '';
    for (let i = 0; i < numTotalDePaginas; i++) {
      const li = document.createElement('li');
      li.textContent = i + 1;
      li.className = `pagina ${i === paginaAtual ? 'active' : ''}`;
      li.onclick = () => { paginaAtual = i; renderizarItens(); renderizarBotoesPaginacao(); };
      ulPaginacao.appendChild(li);
    }
  }

  if (inputBusca) {
    let timerBusca;
    inputBusca.addEventListener('input', (e) => {
      clearTimeout(timerBusca);
      const catAtiva = document.querySelector('.btn-filtro.active')?.dataset.categoria || 'todos';
      timerBusca = setTimeout(() => fetchProdutos(e.target.value, catAtiva), 400);
    });
  }

  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', (e) => {
      botoesFiltro.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      fetchProdutos(inputBusca?.value || '', e.target.dataset.categoria);
    });
  });

  fetchProdutos();
}