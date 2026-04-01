// pokemon.js

// 1. Exportamos a função UUID para que outros módulos (como a paginação) possam usá-la
export function obterOuCriarIdVisitante() {
  let visitorId = localStorage.getItem('ecommerce_visitor_id');
  if (!visitorId) {
    visitorId = 'visitante_' + crypto.randomUUID();
    localStorage.setItem('ecommerce_visitor_id', visitorId);
  }
  return visitorId;
}

// 2. A função principal ajustada
export function adicionarAoCarrinho(produto, usuarioLogado) {
  if (!produto) return; 

  // Trava de Arquitetura: Se vier vazio ou com a string antiga 'visitante', usamos o UUID
  if (!usuarioLogado || usuarioLogado === 'visitante') {
    usuarioLogado = obterOuCriarIdVisitante();
  }

  console.log(`Tentando adicionar ao carrinho: ${produto.nome} para o usuário/visitante: ${usuarioLogado}`);

  // Criamos o objeto com os dados que o PHP espera
  const dadosParaEnvio = {
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1,
    total: produto.preco,
    usuario: usuarioLogado
  };

  // Fazemos a requisição para o Back-end
  fetch('adicionar_carrinho.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosParaEnvio),
    credentials: 'include' 
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