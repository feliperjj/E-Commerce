export default function initRegistrar() {
    const formRegistro = document.querySelector('[data-modal="container1"] form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', async (event) => {
            // Segura a página para não dar tela branca
            event.preventDefault();

            const formData = new FormData(formRegistro);
            const dados = Object.fromEntries(formData);

            try {
                const response = await fetch('registro.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados),
                    credentials: 'include'
                });

                const data = await response.json();

                if (data.sucesso) {
                    alert("Usuário registrado com sucesso!");
                    window.location.href = 'index.html'; 
                } else {
                    alert("Erro: " + data.erro);
                }
            } catch (error) {
                console.error("Erro no registro:", error);
            }
        });
    }
}