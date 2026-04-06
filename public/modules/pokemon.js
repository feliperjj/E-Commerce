// pokemon.js

export function obterOuCriarIdVisitante() {
  let visitorId = localStorage.getItem('ecommerce_visitor_id');
  if (!visitorId) {
    visitorId = 'visitante_' + crypto.randomUUID();
    localStorage.setItem('ecommerce_visitor_id', visitorId);
  }
  return visitorId;
}

export function adicionarAoCarrinho(produto, usuarioLogado) {
  if (!produto) return; 

  if (!usuarioLogado || usuarioLogado === 'visitante') {
    usuarioLogado = obterOuCriarIdVisitante();
  }

  const dadosParaEnvio = {
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1,
    total: produto.preco,
    usuario: usuarioLogado
  };

  fetch('./api/adicionar_carrinho.php', {
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
      // UX: Substitua esse alert futuro por um Toast Notification para ficar mais elegante
      alert(`${produto.nome} adicionado ao carrinho com sucesso!`);
    } else {
      alert("Erro ao adicionar: " + data.erro);
    }
  })
  .catch((error) => {
    alert("Erro de comunicação com o servidor.");
  });
}