export default function carrinho() {
  const produtos = document.querySelectorAll(".itemComprar");
  const carrinhoItens = document.getElementById("carrinho");
  const itensNoCarrinho = [];

  produtos.forEach((produto) => {
    produto.addEventListener('click', () => {
      const nomeProduto = produto.textContent;
      itensNoCarrinho.push(nomeProduto);
      // carrinhoItens.innerHTML = '';

      itensNoCarrinho.forEach((nomeItem) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.textContent = nomeItem;
        carrinhoItens.appendChild(itemCarrinho);
      });

      const carrinhoJSON = JSON.stringify(itensNoCarrinho);
      localStorage.setItem("carrinho", carrinhoJSON);
    });
    
  });
   function clearStorage (){
   
   
   // Recupere os dados do carrinho do localStorage

const carrinhoJSON = localStorage.getItem("carrinho");

if (carrinhoJSON) {
  const carrinhoItens = JSON.parse(carrinhoJSON);

  // Se há itens no carrinho, exiba-os na página
  const carrinhoContainer = document.getElementById("carrinho");
  carrinhoContainer.innerHTML = ''; // Limpe o conteúdo anterior, se houver

  carrinhoItens.forEach((nomeItem) => {
    const itemCarrinho = document.createElement('div');
    itemCarrinho.textContent = nomeItem;
    carrinhoContainer.appendChild(itemCarrinho);
  });
}
console.log("o Storage foi Limpo");
localStorage.clear(); 
}
setTimeout(clearStorage,3000);

  

}
// pegaCarrinhos.forEach(carrinho => {
//   // const cardId =document.getElementById(".carrinhocard");
  
//   carrinho.addEventListener('click', () => {
//     arrayConteudo.push;
//   });
// });
// }

  
