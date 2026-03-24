// pokemon.js

// O 'export' permite que o paginacao.js importe esta função
export function adicionarAoCarrinho(produto) {
 if (!produto) return; 

  console.log("Tentando adicionar ao carrinho:", produto.nome);

  // Criamos o objeto com os dados que o PHP espera
  const dadosParaEnvio = {
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1,
    total: produto.preco
  };

  // Fazemos a requisição para o Back-end
  // IMPORTANTE: Verifique se o nome do arquivo na sua pasta é exatamente este
  fetch('adicionar_carrinho.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosParaEnvio)
  })
  .then(async (response) => {
    // Se o servidor responder com erro (404, 500), pegamos o texto do erro
    if (!response.ok) {
      const textoErro = await response.text();
      throw new Error(textoErro);
    }
    return response.json();
  })
  .then((data) => {
    if (data.sucesso) {
      alert(`${produto.nome} adicionado ao carrinho com sucesso!`);
    } else {
      console.error("Erro retornado pelo PHP:", data.erro);
      alert("Erro ao adicionar: " + data.erro);
    }
  })
  .catch((error) => {
    // Esse catch pega o erro de "Unexpected token <" e mostra o que o PHP enviou de verdade
    console.error('Erro na requisição:', error);
    alert("Erro de comunicação com o servidor. Verifique o console.");
  });
}

// Se você tiver outras funções de inicialização aqui, pode mantê-las
console.log("Módulo pokemon.js carregado com sucesso.");