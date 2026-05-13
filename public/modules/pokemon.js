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

  // Retornamos a Promise para podermos aguardar (await) em outros arquivos
  return fetch('/backend/adicionar_carrinho.php', {
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
      // Retorna sucesso em vez de dar alert (quem chamar decide se dá alert ou não)
      return true;
    } else {
      alert("Erro ao adicionar: " + data.erro);
      return false;
    }
  })
  .catch((error) => {
    alert("Erro de comunicação com o servidor.");
    return false;
  });
}