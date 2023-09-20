export default function carrinho() {
  const produtos = document.querySelectorAll(".itemComprar");
  const carrinhoItens = document.getElementById("carrinho");
  const itensNoCarrinho = [];

  produtos.forEach((produto) => {
    produto.addEventListener('click', () => {
      const nomeProduto = produto.textContent;
      itensNoCarrinho.push(nomeProduto);
      carrinhoItens.innerHTML = '';

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
   
    console.log("o Storage foi Limpo");
    localStorage.clear(); 
   }
   setTimeout(clearStorage,30000);
   

}
// pegaCarrinhos.forEach(carrinho => {
//   // const cardId =document.getElementById(".carrinhocard");
  
//   carrinho.addEventListener('click', () => {
//     arrayConteudo.push;
//   });
// });
// }

  
