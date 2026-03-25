// injetaDadosTabela.js

export default async function injetaDadosTabela() {
  const tbody = document.querySelector('tbody');
  
  if (!tbody) {
    console.error("Erro: Tag <tbody> não encontrada no HTML.");
    return;
  }

  try {
    // 1. PRIMEIRO: Descobrimos quem é o usuário atual
    const resSessao = await fetch('verificar_sessao.php', { credentials: 'include' });
    const sessao = await resSessao.json();
    
    // Se logado, usa o username, senão usa 'visitante'
    const usuarioAtivo = sessao.logado ? sessao.username : 'visitante';

    // 2. AGORA: Buscamos os itens DESTE usuário específico
    const response = await fetch(`listar_carrinho.php?usuario=${encodeURIComponent(usuarioAtivo)}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do servidor');
    
    const itensDoCarrinho = await response.json();

    // Limpamos a tabela
    tbody.innerHTML = '';

    if (itensDoCarrinho && Array.isArray(itensDoCarrinho)) {
      itensDoCarrinho.forEach((item) => {
        const linhaDaTabela = document.createElement('tr');

        // Células
        const tdNome = document.createElement('td');
        const tdPreco = document.createElement('td');
        const tdQtd = document.createElement('td');
        const tdTotal = document.createElement('td');
        const tdAcoes = document.createElement('td');
        const btnExcluir = document.createElement('button');

        tdNome.textContent = item.nome;
        tdPreco.textContent = `${Number(item.preco).toFixed(2)} Kwz`;
        tdQtd.textContent = item.quantidade;
        
        const valorTotal = item.preco * item.quantidade;
        tdTotal.textContent = `${valorTotal.toFixed(2)} Kwz`;

        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'exclui';

        // EVENTO DE CLIQUE PARA REMOVER
        btnExcluir.addEventListener('click', () => {
          if (confirm(`Deseja remover uma unidade de ${item.nome}?`)) {
            fetch('remover_carrinho.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: item.id }),
              credentials: 'include' // IMPORTANTE: Para o PHP saber de quem remover
            })
            .then(res => res.json())
            .then(data => {
              if (data.status === 'removido') {
                linhaDaTabela.remove();
              } else if (data.status === 'atualizado') {
                tdQtd.textContent = data.novaQtd; 
                tdTotal.textContent = `${data.novoTotal.toFixed(2)} Kwz`;
                item.quantidade = data.novaQtd;
              } else {
                alert("Erro ao remover: " + (data.mensagem || "Erro"));
              }
            });
          }
        });

        tdAcoes.appendChild(btnExcluir);
        linhaDaTabela.appendChild(tdNome);
        linhaDaTabela.appendChild(tdPreco);
        linhaDaTabela.appendChild(tdQtd);
        linhaDaTabela.appendChild(tdTotal);
        linhaDaTabela.appendChild(tdAcoes);
        tbody.appendChild(linhaDaTabela);
      });
    }
  } catch (error) {
    console.error('Erro ao injetar dados na tabela:', error);
  }
}