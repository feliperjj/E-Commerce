// export default function pokemon(container) {
//   fetch('pokemons.json')
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(pokemon => {
//         const { nome, preco, imagem } = pokemon;

//         const card = document.createElement('div');
//         card.classList.add('itemComprar');

//         const imgProduto = document.createElement('div');
//         imgProduto.classList.add('imgProduto');
//         const img = document.createElement('img');
//         img.classList.add('itemImg');
//         img.src = imagem;
//         img.alt = nome;
//         imgProduto.appendChild(img);
//         card.appendChild(imgProduto);

//         const conteudoItem = document.createElement('div');
//         conteudoItem.classList.add('conteudoItem');
//         const precoElement = document.createElement('div');
//         precoElement.classList.add('preco');
//         const precoText = document.createElement('p');
//         precoText.textContent = preco;
//         const comprarBtn = document.createElement('button');
//         comprarBtn.classList.add('comprar');
//         comprarBtn.textContent = 'Comprar';

//         precoElement.appendChild(precoText);
//         precoElement.appendChild(comprarBtn);
//         conteudoItem.appendChild(precoElement);
//         card.appendChild(conteudoItem);

//         container.appendChild(card);
//       });
//     })
//     .catch(error => {
//       console.log('Erro ao carregar os dados do arquivo JSON:', error);
//     });
// }
