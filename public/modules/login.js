// login.js

export default function initLogin() {
    // Seleciona o formulário dentro do modal de login
    const formLogin = document.querySelector('[data-modal="container"] form');

    if (formLogin) {
        formLogin.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const formData = new FormData(formLogin);
            const dados = Object.fromEntries(formData);

            // Pegamos o UUID anónimo para mandar para o PHP (Desafio Ouro)
            const visitorId = localStorage.getItem('ecommerce_visitor_id');
            if (visitorId) {
                dados.visitorId = visitorId;
            }

            try {
                // AJUSTE DE CAMINHO: 
                // Se o seu index.html está na pasta /public e o PHP na /backend, 
                // o caminho deve ser '../backend/processar_login.php'
                const response = await fetch('../backend/processar_login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados),
                    credentials: 'include' // Essencial para manter a sessão ativa
                });

                // Verifica se a resposta é um JSON válido antes de converter
                const textoResposta = await response.text();
                let data;
                try {
                    data = JSON.parse(textoResposta);
                } catch (e) {
                    console.error("O servidor não retornou um JSON válido:", textoResposta);
                    alert("Erro interno no servidor. Verifique o console.");
                    return;
                }

                if (data.sucesso) {
                    // Limpamos o UUID antigo já que os itens foram migrados no PHP
                    localStorage.removeItem('ecommerce_visitor_id');
                    
                    alert("Login efetuado com sucesso!");
                    
                    // FORÇAR RECARREGAMENTO:
                    // Usamos o href para a index.html. Ao carregar a página do zero, 
                    // o seu script de Header vai rodar o verificar_sessao.php e ver que você logou.
                    window.location.href = 'index.html'; 
                } else {
                    alert("Erro: " + (data.erro || "Credenciais inválidas."));
                }
            } catch (error) {
                console.error("Erro no login:", error);
                alert("Erro de comunicação com o servidor.");
            }
        });
    }
}