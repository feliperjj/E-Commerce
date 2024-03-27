export default function carrinho() {
  const botaoCarrinho = document.querySelectorAll('.carrinho');
  const itensNoCarrinho = [];
  const botaoToArray = Array.from(botaoCarrinho);
  const btnExclui = document.querySelectorAll('.exclui');

  botaoToArray.forEach((botao) => {
    botao.addEventListener('click', () => {
      const nomeProduto =
        botao.parentElement.querySelector('#nome').textContent;
      const precoEmTexto =
        botao.parentElement.querySelector('#precoTexto').textContent;
      const precoFormat = parseFloat(precoEmTexto);
      const quant = 1;

      const itemExistente = itensNoCarrinho.find(
        (item) => item.nome === nomeProduto
      );

      if (itemExistente) {
        itemExistente.quantidade++;
        itemExistente.total += parseFloat(itemExistente.preco);
      } else {
        const novoItem = {
          nome: nomeProduto,
          descricao: '',
          preco: precoFormat,
          quantidade: parseInt(quant),
          total: precoFormat * parseInt(quant),
        };
        itensNoCarrinho.push(novoItem);
      }
      atualizarCarrinho();
    });
  });

  btnExclui?.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const itemSelecionado = itensNoCarrinho[index];
      itemSelecionado.total -= itemSelecionado.preco;
      itemSelecionado.quantidade--;
      if (itemSelecionado.quantidade <= 0) {
        itensNoCarrinho.splice(index, 1);
      }
      atualizarCarrinho();
      location.reload();
    });
  });

  function atualizarCarrinho() {
    const carrinhoJSON = JSON.stringify(itensNoCarrinho);
    localStorage.setItem('carrinho', carrinhoJSON);
  }

  function clearStorage() {
    console.log('O Storage foi Limpo');
    localStorage.removeItem('carrinho');
  }

  setTimeout(clearStorage, 3000 * 1000 * 60);

  window.addEventListener('load', () => {
    const carrinhoJSON = localStorage.getItem('carrinho');

    if (carrinhoJSON) {
      const carrinhoItens = JSON.parse(carrinhoJSON);
      itensNoCarrinho.push(...carrinhoItens);
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
