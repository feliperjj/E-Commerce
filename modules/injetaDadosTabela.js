export default function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  // Troque o localStorage por uma requisição AJAX
  fetch('criar_carrinho.php?usuario=usuario1')
    .then(response => response.json())
    .then(itensDoCarrinho => {
      if (itensDoCarrinho && Array.isArray(itensDoCarrinho)) {
        itensDoCarrinho.forEach((itens) => {
          const linhaDaTabela = document.createElement('tr');
          const td1 = document.createElement('td');
          const td2 = document.createElement('td');
          const td3 = document.createElement('td');
          const td4 = document.createElement('td');
          const td5 = document.createElement('td');
          const btnExcluir = document.createElement('button');
          td1.textContent = itens.nome;
          td2.textContent = itens.preco;
          td3.textContent = itens.quantidade;
          td4.textContent = itens.total;
          btnExcluir.textContent = 'Excluir';
          btnExcluir.className = 'exclui';

          td5.appendChild(btnExcluir);

          linhaDaTabela.appendChild(td1);
          linhaDaTabela.appendChild(td2);
          linhaDaTabela.appendChild(td3);
          linhaDaTabela.appendChild(td4);
          linhaDaTabela.appendChild(td5);

          tbody.appendChild(linhaDaTabela);
        });
      }
    });
}