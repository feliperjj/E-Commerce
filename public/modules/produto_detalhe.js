import { adicionarAoCarrinho } from './pokemon.js';

export default async function initProduto(usuarioLogado) {
    const produtoConteudo = document.getElementById('produto-conteudo');
    if (!produtoConteudo) return;

    // Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get('id');

    if (!idProduto) {
        produtoConteudo.innerHTML = '<div style="text-align:center; padding: 100px; color: #fff;"><h2>Produto não encontrado (ID não fornecido).</h2><a href="index.html" class="voltar-link">← Voltar para o catálogo</a></div>';
        return;
    }

    try {
        const response = await fetch(`./api/api_produtos.php?id=${encodeURIComponent(idProduto)}`);
        if (!response.ok) throw new Error('Erro na API');
        
        const produtos = await response.json();
        
        if (!produtos || produtos.length === 0) {
            produtoConteudo.innerHTML = '<div style="text-align:center; padding: 100px; color: #fff;"><h2>Produto não encontrado.</h2><a href="index.html" class="voltar-link">← Voltar para o catálogo</a></div>';
            return;
        }

        const produto = produtos[0];
        const precoFormatado = Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        produtoConteudo.innerHTML = `
            <div class="produto-detalhe-container">
                <div class="produto-imagem">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                <div class="produto-info">
                    <h1>${produto.nome}</h1>
                    <div class="categoria">Categoria: ${produto.categoria}</div>
                    <div class="preco">${precoFormatado}</div>
                    <div class="estoque">Estoque disponível: ${produto.quantidade} unidades</div>
                    
                    <div class="acoes-produto">
                        <button class="btn-comprar-agora" id="btnComprarAgora">Comprar Agora</button>
                        <button class="btn-add-carrinho" id="btnAddCarrinho" title="Adicionar ao Carrinho">🛒</button>
                    </div>
                    
                    <a href="index.html" class="voltar-link">← Voltar para o catálogo</a>
                </div>
            </div>
        `;

        document.getElementById('btnComprarAgora').addEventListener('click', async () => {
            const sucesso = await adicionarAoCarrinho(produto, usuarioLogado);
            if (sucesso) {
                window.location.href = 'carrinho.html';
            }
        });

        document.getElementById('btnAddCarrinho').addEventListener('click', async () => {
            const sucesso = await adicionarAoCarrinho(produto, usuarioLogado);
            if (sucesso) {
                alert(`${produto.nome} adicionado ao carrinho com sucesso!`);
            }
        });

    } catch (error) {
        console.error(error);
        produtoConteudo.innerHTML = '<div style="text-align:center; padding: 100px; color: red;"><h2>Erro ao carregar o produto.</h2><a href="index.html" class="voltar-link">← Voltar para o catálogo</a></div>';
    }
}
