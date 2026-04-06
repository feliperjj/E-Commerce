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
      
      const url = `./api/api_produtos.php?busca=${encodeURIComponent(termo)}&categoria=${encodeURIComponent(categoria)}`;
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
      
      const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      
      // AJUSTE DE CORES: Branco Puro (#ffffff) e Verde Neon (#2ecc71) com sombra (text-shadow)
      card.innerHTML = `
        <div class="imgProduto" style="position: relative;">
          <img src="${produto.imagem}" class="itemImg" alt="${produto.nome}">
        </div>
        <div class="conteudoItem" style="padding: 15px; text-align: left;">
          
          <p id="nome" style="margin-bottom: 5px; color: #ffffff; text-shadow: 2px 2px 4px rgba(0,0,0,0.9);">
            <strong style="font-size: 1.1rem; display: block;">${produto.nome}</strong>
            <span style="display:block; color: #f0f0f0; font-size: 0.75rem; font-weight: normal; text-shadow: 1px 1px 2px #000;">
                Categoria: ${produto.categoria}
            </span>
          </p>

          <div class="preco">
            <p id="precoTexto" style="font-size: 1.3rem; color: #2ecc71; font-weight: 800; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); margin: 5px 0;">
                ${precoFormatado}
            </p>
          </div>

          <p id="quantidade" style="font-size: 0.8rem; color: #ffffff; opacity: 0.9; text-shadow: 1px 1px 2px #000;">
            Stock: ${produto.quantidade}
          </p>

          <div style="display: flex; gap: 6px; margin-top: 10px;">
            <button class="comprar" style="flex: 1.2; font-size: 0.85rem; padding: 10px 0; background: #3498db; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Comprar
            </button>
            <button class="carrinho" style="flex: 0.8; font-size: 0.85rem; padding: 10px 0; background: #ffffff; color: #1e1e24; border: none; border-radius: 5px; cursor: pointer;">
                🛒
            </button>
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