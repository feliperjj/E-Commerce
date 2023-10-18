import { dadosPaginas } from "./dados.js";

export default function initModal() {
  // Obter o catálogo de container do HTML
  const catalogoContainer = document.querySelector(".catalogoPrincipal");

  const itensPorPagina = 8;
  const numTotalDePaginas = Math.ceil(dadosPaginas.length / itensPorPagina);
  // Dados das páginas
  const itensDivididoPorPaginas = [];

  for (let i = 1; i <= numTotalDePaginas; i++) {
    const pagina = i;
    const [IdDoprimeiroDaPagina, idDoUltimoDaPagina] = [
      itensPorPagina * pagina - itensPorPagina,
      itensPorPagina * pagina - 1,
    ];
    // console.log(IdDoprimeiroDaPagina, idDoUltimoDaPagina);
    const itensDessaPagina = dadosPaginas.filter((item) => {
      return item.id >= IdDoprimeiroDaPagina && item.id <= idDoUltimoDaPagina;
    });
    itensDivididoPorPaginas.push(itensDessaPagina);
    // console.log(itensDessaPagina);
  }

  // Página inicial
  let paginaAtual = 0;

  // Função para renderizar os itens da página atual
  function renderizarItens() {
    // Limpar o conteúdo do catálogo
    catalogoContainer.innerHTML = "";

    // Obter os dados da página atual
    const dadosPaginaAtual = itensDivididoPorPaginas[paginaAtual];

    // Loop através dos dados da página atual
    dadosPaginaAtual.forEach((produto) => {
      // Criar os elementos HTML
      const itemContainer = document.createElement("div");
      itemContainer.className = "itemComprar";

      const imgContainer = document.createElement("div");
      imgContainer.className = "imgProduto";

      const img = document.createElement("img");
      img.className = "itemImg";
      img.src = produto.imagem;
      img.alt = "";

      const conteudoItem = document.createElement("div");
      conteudoItem.className = "conteudoItem";

      const preco = document.createElement("div");
      preco.className = "preco";

      const precoParagrafo = document.createElement("p");
      precoParagrafo.id = "precoTexto";
      precoParagrafo.textContent = produto.preco;

      const nomeProduto = document.createElement("p");
      nomeProduto.id = "nome";
      nomeProduto.textContent = produto.nome;

      const botaoComprar = document.createElement("button");
      botaoComprar.className = "comprar";
      botaoComprar.textContent = "Comprar";

      const botaoCarrinho = document.createElement("button");
      botaoCarrinho.className = "carrinho";
      botaoCarrinho.textContent = "Adicionar ao Carrinho";
      botaoCarrinho.id = "carrinho";
      // Adicionar os elementos à estrutura do DOM
      
      preco.appendChild(nomeProduto)
      preco.appendChild(precoParagrafo);
      conteudoItem.appendChild(preco);
      conteudoItem.appendChild(botaoComprar);
      conteudoItem.appendChild(botaoCarrinho);
      imgContainer.appendChild(img);
      itemContainer.appendChild(imgContainer);
      itemContainer.appendChild(conteudoItem);
      catalogoContainer.appendChild(itemContainer);
    });
  }

  // Função para trocar a página
  function trocarPagina(event) {
    const paginaSelecionada = Number(event.target.textContent) - 1;

    if (paginaSelecionada !== paginaAtual) {
      paginaAtual = paginaSelecionada;
      renderizarItens();
    }
  }

  // Botões de página
  const paginas = document.querySelectorAll(".paginacaob li");

  // Adicionar event listeners aos botões
  paginas.forEach((pagina) => {
    pagina.addEventListener("click", trocarPagina);
  });

  // Renderizar os itens iniciais
  renderizarItens();
}

initModal();

const conteudos = document.querySelectorAll(".itemComprar");
console.log(conteudos);
// const botoesPaginacao = document.querySelectorAll(".paginacaob li:not(.paginacao-seta)");

// const itemsPerPage = 4; // quantidade de itens por página
// let currentPage = 0; // página atual
// let totalPages = Math.ceil(conteudos.length / itemsPerPage); // total de páginas

// function displayItems(items) {
//   items.forEach((item) => {
//     item.style.display = "block";
//   });
// }

// function hideItems(items) {
//   items.forEach((item) => {
//     item.style.display = "none";
//   });
// }

// function listItems(page) {
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return Array.from(conteudos).slice(startIndex, endIndex);
// }

// function updatePagination() {
//   botoesPaginacao.forEach((botao) => {
//     if (parseInt(botao.textContent) === currentPage) {
//       botao.classList.add("pagina-atual");
//     } else {
//       botao.classList.remove("pagina-atual");
//     }
//   });
// }

// function goToPage(page) {
//   currentPage = page;
//   const paginatedItems = listItems(currentPage);
//   hideItems(conteudos);
//   displayItems(paginatedItems);
//   updatePagination();
// }

// // exibe os itens da primeira página
// const paginatedItems = listItems(currentPage);
// displayItems(paginatedItems);
// updatePagination();

// // adiciona o evento de click nos botões da paginação
// botoesPaginacao.forEach((botao) => {
//   botao.addEventListener("click", () => {
//     if (botao.classList.contains("pagina-atual")) {
//       return;
//     }

//     if (botao.textContent === "«") {
//       // botão "anterior"
//       if (currentPage > 1) {
//         goToPage(currentPage - 1);
//       }
//     } else if (botao.textContent === "»") {
//       // botão "próximo"
//       if (currentPage < totalPages) {
//         goToPage(currentPage + 1);
//       }
//     } else {
//       // botão de página
//       goToPage(parseInt(botao.textContent));
//     }
//   });
// });
