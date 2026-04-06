import initAuth from './auth.js';

export default async function initPerfil() {
    // 1. CARREGA O HEADER E VERIFICA O USUÁRIO
    const usuarioLogado = await initAuth();

    // 2. BARREIRA DE SEGURANÇA (Expulsa quem não está logado)
    if (usuarioLogado === 'visitante') {
        alert('Você precisa estar logado para ver a Área do Cliente.');
        window.location.href = 'index.html';
        return; // Interrompe o resto do script
    }

    // --- REFERÊNCIAS DO HTML ---
    const btnDados = document.getElementById('btn-dados');
    const btnHistorico = document.getElementById('btn-historico');
    const abaDados = document.getElementById('aba-dados');
    const abaHistorico = document.getElementById('aba-historico');
    const formPerfil = document.getElementById('form-perfil');
    const tbodyHistorico = document.getElementById('tabela-historico');

    if (!btnDados || !btnHistorico) return; // Prevenção de erros se o HTML não carregar

    // --- LÓGICA DE TROCA DE ABAS ---
    btnDados.addEventListener('click', () => {
        abaDados.classList.add('ativo');
        abaHistorico.classList.remove('ativo');
        btnDados.classList.add('aba-ativa');
        btnHistorico.classList.remove('aba-ativa');
    });

    btnHistorico.addEventListener('click', () => {
        abaHistorico.classList.add('ativo');
        abaDados.classList.remove('ativo');
        btnHistorico.classList.add('aba-ativa');
        btnDados.classList.remove('aba-ativa');
    });

    // --- CARREGAMENTO INICIAL DOS DADOS ---
    try {
        const response = await fetch('./api/api_perfil.php', { credentials: 'include' });
        const data = await response.json();

        if (data.sucesso) {
            document.getElementById('perfil-username').value = data.usuario.username;
            document.getElementById('perfil-email').value = data.usuario.email;

            if (data.pedidos && data.pedidos.length > 0) {
                data.pedidos.forEach(pedido => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${pedido.data_compra}</td>
                        <td>${pedido.nome_produto}</td>
                        <td>${pedido.quantidade}</td>
                        <td>${Number(pedido.total).toFixed(2)} Kwz</td>
                    `;
                    tbodyHistorico.appendChild(tr);
                });
            } else {
                tbodyHistorico.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhuma compra encontrada no seu histórico.</td></tr>';
            }
        } else {
            alert('Erro ao carregar dados. Faça login novamente.');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
    }

    // --- LÓGICA DE ATUALIZAÇÃO (SUBMIT DO FORM) ---
    formPerfil.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const emailAtualizado = document.getElementById('perfil-email').value;
        const senhaNova = document.getElementById('perfil-senha').value;
        const msg = document.getElementById('msg-perfil');

        try {
            const res = await fetch('./api/atualizar_perfil.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailAtualizado, senha: senhaNova }),
                credentials: 'include'
            });

            const dataAtualizacao = await res.json();
            
            if (dataAtualizacao.sucesso) {
                msg.style.color = 'green';
                msg.textContent = dataAtualizacao.mensagem;
                document.getElementById('perfil-senha').value = ''; 
            } else {
                msg.style.color = 'red';
                msg.textContent = dataAtualizacao.erro;
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        }
    });
}

// Inicializa o módulo quando o DOM da página de perfil estiver pronto
document.addEventListener('DOMContentLoaded', initPerfil);