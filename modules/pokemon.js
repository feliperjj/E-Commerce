export default function carrinho() {
  // Exemplo de produtos (substitua por fetch do backend se quiser)
  const produtos = [
    { nome: "Produto 1", preco: 100, imagem: "img/Pokemon1.jpg" },
    { nome: "Produto 2", preco: 200, imagem: "img/Pokemon2.jpg" },
    { nome: "Produto 3", preco: 300, imagem: "img/Pokemon3.jpg" }
  ];

  const catalogo = document.querySelector('.catalogoPrincipalb');
  if (catalogo) {
    catalogo.innerHTML = '';
    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto-card';
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" width="100">
        <h3 id="nome">${produto.nome}</h3>
        <span id="precoTexto">${produto.preco}</span>
        <button class="carrinho">Adicionar ao carrinho</button>
      `;
      catalogo.appendChild(card);
    });
  }

  // O resto do seu código...
  const botaoCarrinho = document.querySelectorAll('.carrinho');

  // Adiciona item ao carrinho (backend)
  function adicionarAoCarrinho(item) {
    fetch('adicionar_carrinho.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'ok') {
        alert('Item adicionado ao carrinho!');
        atualizarTabelaCarrinho();
      }
    });
  }

  // Remove item do carrinho (backend)
  function removerDoCarrinho(nome) {
    fetch('remover_carrinho.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nome })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'ok') {
        atualizarTabelaCarrinho();
      }
    });
  }

  // Atualiza tabela do carrinho (frontend)
  function atualizarTabelaCarrinho() {
    fetch('listar_carrinho.php?usuario=usuario1')
      .then(res => res.json())
      .then(itens => {
        const tbody = document.querySelector('tbody');
        if (tbody) {
          tbody.innerHTML = '';
          itens.forEach((item) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${item.nome}</td>
              <td>${item.preco}</td>
              <td>${item.quantidade}</td>
              <td>${item.total}</td>
              <td><button class="exclui" data-nome="${item.nome}">Excluir</button></td>
            `;
            tbody.appendChild(tr);
          });

          // Adiciona eventos aos botões de excluir
          document.querySelectorAll('.exclui').forEach(btn => {
            btn.addEventListener('click', () => {
              removerDoCarrinho(btn.dataset.nome);
            });
          });
        }
      });
  }

  // Evento para adicionar ao carrinho
  // (precisa ser chamado após renderizar os produtos)
  document.querySelectorAll('.carrinho').forEach((botao) => {
    botao.addEventListener('click', () => {
      const nomeProduto = botao.parentElement.querySelector('#nome').textContent;
      const precoEmTexto = botao.parentElement.querySelector('#precoTexto').textContent;
      const precoFormat = parseFloat(precoEmTexto);
      const item = {
        usuario: 'usuario1', // Troque pelo usuário logado
        nome: nomeProduto,
        preco: precoFormat,
        quantidade: 1,
        total: precoFormat
      };
      adicionarAoCarrinho(item);
    });
  });

  // Atualiza carrinho ao carregar a página
  window.addEventListener('load', atualizarTabelaCarrinho);
}


// * Trecho de codigo que incluia uma div inteira dentro do botao
// itensNoCarrinho.forEach((nomeItem) => {
//   const itemCarrinho = document.createElement("div");
//   itemCarrinho.textContent = nomeItem;
// carrinhoItens.appendChild();
// });
// }

// const itensDoLocalStorage = [
//   {
//     "nome": "Pokemon 1",
//     "descricao": "",
//     "preco": "100 Bilhões de Kwanzas",
//     "imagem": "img/Pokemon1.jpg"
//   },
//   {
//     "nome": "Pokemon 2",
//     "descricao": "",
//     "preco": "300 Bilhões de Kwanzas",
//     "imagem": "img/Pokemon2.jpg"
//   },
//   {
//     "nome": "Pokemon 3",
//     "descricao": "",
//     "preco": "200 Bilhões de Kwanzas",
//     "imagem": "img/Pokemon3.jpg"
//   }
// ];

// itensDoLocalStorage.forEach(item => {
// itensDoLocalStorageString += `<li class="item-card">${item.nome} - R$${item.preco}</li>`;

// });

// itensDoLocalStorage.innerHTML = itensDoLocalStorageString;
// }

// pegaCarrinhos.forEach(carrinho => {
//   // const cardId =document.getElementById(".carrinhocard");

//   carrinho.addEventListener('click', () => {
//     arrayConteudo.push;
//   });
// });
// }
