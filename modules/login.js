// modules/login.js
export default function initLogin() {
    const formLogin = document.querySelector('.modal-container form');
    
    if (!formLogin) return;

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formLogin);
        const dados = Object.fromEntries(formData);

        try {
            const response = await fetch('processar_login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if (data.sucesso) {
                window.location.href = 'index.html';
            } else {
                alert("Erro: " + data.erro);
            }
        } catch (error) {
            console.error("Erro no login:", error);
        }
    });
}