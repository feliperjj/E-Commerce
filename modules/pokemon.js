// pokemon.js

// O 'export' agora recebe o produto E o usuarioLogado
export function adicionarAoCarrinho(produto, usuarioLogado = 'visitante') {
  if (!produto) return; 

  console.log(`Tentando adicionar ao carrinho: ${produto.nome} para o usuário: ${usuarioLogado}`);

  // Criamos o objeto com os dados que o PHP espera
  const dadosParaEnvio = {
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1,
    total: produto.preco,
    usuario: usuarioLogado // <--- Enviamos o nome do usuário no corpo do JSON também
  };

  // Fazemos a requisição para o Back-end
  fetch('adicionar_carrinho.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosParaEnvio),
    credentials: 'include' // <--- Mantém o envio do PHPSESSID
  })
  .then(async (response) => {
    if (!response.ok) {
      const textoErro = await response.text();
      throw new Error(textoErro);
    }
    return response.json();
  })
  .then((data) => {
    if (data.sucesso) {
      // O PHP agora deve retornar o nome de quem comprou para confirmarmos
      console.log("Resposta do servidor:", data);
      alert(`${produto.nome} adicionado ao carrinho com sucesso!`);
    } else {
      console.error("Erro retornado pelo PHP:", data.erro);
      alert("Erro ao adicionar: " + data.erro);
    }
  })
  .catch((error) => {
    console.error('Erro na requisição:', error);
    alert("Erro de comunicação com o servidor. Verifique o console.");
  });
}

console.log("Módulo pokemon.js carregado com sucesso.");