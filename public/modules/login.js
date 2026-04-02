// login.js

export default function initLogin() {
    // Seleciona o formulário dentro do modal de login
    const formLogin = document.querySelector('[data-modal="container"] form');

    if (formLogin) {
        formLogin.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o ecrã branco

            const formData = new FormData(formLogin);
            const dados = Object.fromEntries(formData);

            // A MÁGICA COMEÇA AQUI: Pegamos o UUID anónimo para mandar para o PHP
            const visitorId = localStorage.getItem('ecommerce_visitor_id');
            if (visitorId) {
                dados.visitorId = visitorId;
            }

            try {
                const response = await fetch('../backend/processar_login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados),
                    credentials: 'include' // Essencial para criar a sessão no PHP
                });

                const data = await response.json();

                if (data.sucesso) {
                    // Opcional, mas recomendado: Limpamos o UUID antigo já que agora ele tem conta
                    localStorage.removeItem('ecommerce_visitor_id');
                    
                    alert("Login efetuado com sucesso!");
                    window.location.href = 'index.html'; // ou perfil.html, como preferir
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