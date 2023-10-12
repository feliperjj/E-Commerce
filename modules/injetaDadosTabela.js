export default function injetaDadosTabela() {
  const tbody = document.querySelector("tbody");
  // const linhaDaTabela = document.createElement("tr");
  // const td1 = document.createElement("td");
  // const td2 = document.createElement("td");
  // const td3 = document.createElement("td");

  const itensDoLocalStorage = JSON.parse(localStorage.getItem("carrinho"));

  if (itensDoLocalStorage) {
    itensDoLocalStorage.forEach((itens) => {
      const linhaDaTabela = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");

      td1.textContent = itens.nome;
      td2.textContent = itens.preco;
      td3.textContent = itens.id;
      linhaDaTabela.appendChild(td1);
      linhaDaTabela.appendChild(td2);
      linhaDaTabela.appendChild(td3);
      tbody.appendChild(linhaDaTabela); 
    });

  }
}

injetaDadosTabela();
