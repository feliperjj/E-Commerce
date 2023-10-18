export default function carrinho() {
  const nomeProduto = document.querySelector("#nome");
  const precoEmTexto = document.querySelector("#precoTexto");
  const botaoCarrinho = document.querySelectorAll("#carrinho");
  const itensNoCarrinho = [];
  const botaoToArray = Array.from(botaoCarrinho);

  botaoToArray.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Atualizar o carrinho e armazenar no localStorage
      atualizarCarrinho(precoEmTexto.textContent, nomeProduto.textContent);
    });
  });

  function atualizarCarrinho(precoDoTexto, nomeProduto) {
    const ObjetoPokemon = {
      nome: nomeProduto,
      descricao: '',
      preco: precoDoTexto,
    };
    itensNoCarrinho.push(ObjetoPokemon);

    const carrinhoJSON = JSON.stringify(itensNoCarrinho);
    localStorage.setItem("carrinho", carrinhoJSON);
  }

  function clearStorage() {
    console.log("O Storage foi Limpo");
    localStorage.removeItem("carrinho");
  }

  setTimeout(clearStorage, 3000 * 1000 * 60);

  window.addEventListener("load", () => {
    const carrinhoJSON = localStorage.getItem("carrinho");

    if (carrinhoJSON) {
      const carrinhoItens = JSON.parse(carrinhoJSON);
      itensNoCarrinho.push(...carrinhoItens);
      // A parte comentada para criar elementos HTML para exibir os itens do carrinho não foi alterada.
    }
  });
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
