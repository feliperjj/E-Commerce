// paginacao.js

import { dadosPaginas } from './dados.js';

// IMPORTANTE: Importe a função de adicionar ao carrinho aqui. 
// Ajuste o caminho se o arquivo tiver outro nome (ex: ./pokemon.js)
import { adicionarAoCarrinho } from './pokemon.js'; 

export default function initPagin() {
  const catalogoContainer = document.querySelector('.catalogoPrincipal');
  const ulPaginacao = document.querySelector('.paginacaob'); 
  
  if (!catalogoContainer) return; 

  const itensPorPagina = 8;
  const numTotalDePaginas = Math.ceil(dadosPaginas.length / itensPorPagina);
  
  const itensDivididoPorPaginas = [];

  for (let i = 1; i <= numTotalDePaginas; i++) {
    const pagina = i;
    const IdDoprimeiroDaPagina = itensPorPagina * pagina - itensPorPagina;
    const idDoUltimoDaPagina = itensPorPagina * pagina - 1;
    
    const itensDessaPagina = dadosPaginas.filter((item) => {
      return item.id >= IdDoprimeiroDaPagina && item.id <= idDoUltimoDaPagina;
    });
    itensDivididoPorPaginas.push(itensDessaPagina);
  }

  let paginaAtual = 0;

  function renderizarItens() {
    catalogoContainer.innerHTML = '';
    const dadosPaginaAtual = itensDivididoPorPaginas[paginaAtual];

    dadosPaginaAtual.forEach((produto) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'itemComprar';

      const imgContainer = document.createElement('div');
      imgContainer.className = 'imgProduto';

      const img = document.createElement('img');
      img.className = 'itemImg';
      img.src = produto.imagem;
      img.alt = `Imagem do Pokémon ${produto.nome}`;

      const conteudoItem = document.createElement('div');
      conteudoItem.className = 'conteudoItem';

      const preco = document.createElement('div');
      preco.className = 'preco';

      const precoParagrafo = document.createElement('p');
      precoParagrafo.id = 'precoTexto';
      precoParagrafo.textContent = `${produto.preco.toFixed(2)} Kwanzas`;
      precoParagrafo.dataset.valor = produto.preco;

      const quantiParagrafo = document.createElement('p');
      quantiParagrafo.id = 'quantidade';
      quantiParagrafo.textContent = `Qtd: ${produto.quantidade}`;

      const totalParagrafo = document.createElement('p');
      totalParagrafo.id = 'total';
      totalParagrafo.textContent = `Total: ${produto.total.toFixed(2)} Kwz`;

      const nomeProduto = document.createElement('p');
      nomeProduto.id = 'nome';
      nomeProduto.textContent = produto.nome;

      // BOTÃO COMPRAR
      const botaoComprar = document.createElement('button');
      botaoComprar.className = 'comprar';
      botaoComprar.textContent = 'Comprar';
      // EVENTO COMPRAR: Adiciona e vai para o carrinho
      botaoComprar.addEventListener('click', () => {
        adicionarAoCarrinho(produto);
        window.location.href = 'carrinho.html';
      });

      // BOTÃO ADICIONAR AO CARRINHO
      const botaoCarrinho = document.createElement('button');
      botaoCarrinho.className = 'carrinho';
      botaoCarrinho.textContent = 'Adicionar ao Carrinho';
      // EVENTO CARRINHO: Apenas adiciona
      botaoCarrinho.addEventListener('click', () => {
        adicionarAoCarrinho(produto);
      });

      preco.appendChild(nomeProduto);
      preco.appendChild(precoParagrafo);
      conteudoItem.appendChild(totalParagrafo);
      conteudoItem.appendChild(preco);
      conteudoItem.appendChild(quantiParagrafo);
      conteudoItem.appendChild(botaoComprar);
      conteudoItem.appendChild(botaoCarrinho);
      imgContainer.appendChild(img);
      itemContainer.appendChild(imgContainer);
      itemContainer.appendChild(conteudoItem);
      catalogoContainer.appendChild(itemContainer);
    });
  }

  function renderizarBotoesPaginacao() {
    if (!ulPaginacao) return;
    ulPaginacao.innerHTML = ''; 

    for (let i = 1; i <= numTotalDePaginas; i++) {
      const li = document.createElement('li');
      li.textContent = i;
      li.className = 'pagina';
      
      if (i - 1 === paginaAtual) {
        li.classList.add('active');
      }

      li.addEventListener('click', trocarPagina);
      ulPaginacao.appendChild(li);
    }
  }

  function trocarPagina(event) {
    const paginaSelecionada = Number(event.target.textContent) - 1;

    if (paginaSelecionada !== paginaAtual && !isNaN(paginaSelecionada)) {
      paginaAtual = paginaSelecionada;
      renderizarItens(); 
      renderizarBotoesPaginacao(); 
    }
  }

  renderizarItens();
  renderizarBotoesPaginacao();
}