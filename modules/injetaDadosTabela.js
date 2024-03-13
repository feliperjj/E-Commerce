export default function injetaDadosTabela() {
  const tbody = document.querySelector("tbody");
  const itensDoLocalStorage = JSON.parse(localStorage.getItem("carrinho"));

  if (itensDoLocalStorage) {
    itensDoLocalStorage.forEach((itens) => {
      const linhaDaTabela = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      const td5 = document.createElement("td"); // Célula para o botão de exclusão

      td1.textContent = itens.nome;
      td2.textContent = itens.preco;
      td3.textContent = itens.quantidade;
      td4.textContent = itens.total;

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";

      // Aqui você pode adicionar a lógica para excluir o item da tabela e do localStorage
      btnExcluir.addEventListener("click", () => {
        console.log("Excluir item:", itens);
      });

   
      td5.appendChild(btnExcluir);

      // Adiciona todas as células à linha da tabela
      linhaDaTabela.appendChild(td1);
      linhaDaTabela.appendChild(td2);
      linhaDaTabela.appendChild(td3);
      linhaDaTabela.appendChild(td4);
      linhaDaTabela.appendChild(td5); // Adiciona a célula de ação à linha da tabela

      // Adiciona a linha da tabela ao corpo da tabela
      tbody.appendChild(linhaDaTabela);
    });
  }
}

// Chama a função para injetar os dados na tabela
injetaDadosTabela();
