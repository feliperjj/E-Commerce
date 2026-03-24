// injetaDadosTabela.js

export default function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  
  if (!tbody) {
    console.error("Erro: Tag <tbody> não encontrada no HTML.");
    return;
  }

  // 1. Buscamos a lista de itens do banco de dados
  // Usamos 'visitante' ou 'usuario1' conforme o seu teste no navegador
  fetch('listar_carrinho.php?usuario=visitante')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar dados do servidor');
      return response.json();
    })
    .then(itensDoCarrinho => {
      // Limpamos a tabela antes de preencher para evitar duplicatas visuais
      tbody.innerHTML = '';

      if (itensDoCarrinho && Array.isArray(itensDoCarrinho)) {
        
        itensDoCarrinho.forEach((item) => {
          // Criamos a linha da tabela
          const linhaDaTabela = document.createElement('tr');

          // Criamos as células (TDs)
          const tdNome = document.createElement('td');
          const tdPreco = document.createElement('td');
          const tdQtd = document.createElement('td');
          const tdTotal = document.createElement('td');
          const tdAcoes = document.createElement('td');
          
          const btnExcluir = document.createElement('button');

          // Preenchemos os textos das células
          tdNome.textContent = item.nome;
          tdPreco.textContent = `${Number(item.preco).toFixed(2)} Kwz`;
          tdQtd.textContent = item.quantidade;
          
          // Cálculo do total da linha
          const valorTotal = item.preco * item.quantidade;
          tdTotal.textContent = `${valorTotal.toFixed(2)} Kwz`;

          // Configuração do Botão Excluir
          btnExcluir.textContent = 'Excluir';
          btnExcluir.className = 'exclui';

          // --- EVENTO DE CLIQUE PARA REMOVER ---
         btnExcluir.addEventListener('click', () => {
  // Mudamos a pergunta para ficar mais claro
  if (confirm(`Deseja remover uma unidade de ${item.nome}?`)) {
    
    fetch('remover_carrinho.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id })
    })
    .then(res => res.json())
    .then(data => {
      // CASO 1: Era o último item, removemos a linha toda
      if (data.status === 'removido') {
        linhaDaTabela.remove();
        console.log(`${item.nome} totalmente removido.`);
      } 
      // CASO 2: Ainda restam itens, apenas atualizamos os números na tela
      else if (data.status === 'atualizado') {
        // Supondo que tdQtd e tdTotal sejam as variáveis das suas colunas:
        tdQtd.textContent = data.novaQtd; 
        tdTotal.textContent = `${data.novoTotal.toFixed(2)} Kwz`;
        
        // Importante: Atualizar o objeto local 'item' para o próximo clique
        item.quantidade = data.novaQtd;
        console.log(`Uma unidade de ${item.nome} removida.`);
      } 
      else {
        alert("Erro ao remover: " + (data.mensagem || "Erro desconhecido"));
      }
    })
    .catch(err => console.error("Erro na requisição de exclusão:", err));
  }
});

          // Montagem final da linha
          tdAcoes.appendChild(btnExcluir);
          linhaDaTabela.appendChild(tdNome);
          linhaDaTabela.appendChild(tdPreco);
          linhaDaTabela.appendChild(tdQtd);
          linhaDaTabela.appendChild(tdTotal);
          linhaDaTabela.appendChild(tdAcoes);

          // Adicionamos a linha completa ao corpo da tabela
          tbody.appendChild(linhaDaTabela);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao injetar dados na tabela:', error);
    });
}