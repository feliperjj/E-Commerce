export default function initRegistrar() {
    const formRegistro = document.querySelector('[data-modal="container1"] form');

    // Função auxiliar pura para validar e-mail usando Regex (Expressão Regular)
    const emailValido = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    if (formRegistro) {
        formRegistro.addEventListener('submit', async (event) => {
            event.preventDefault(); // Segura a página

            const formData = new FormData(formRegistro);
            const dados = Object.fromEntries(formData);

            // 1ª Barreira: Validação de Front-end
            // Assumindo que o atributo 'name' do input de email no HTML seja "email"
            if (!emailValido(dados.email)) {
                alert("Por favor, insira um endereço de e-mail válido.");
                return; // O 'return' encerra a execução aqui. O fetch não acontece.
            }

            // Opcional: Validação de tamanho de senha
            if (dados.senha && dados.senha.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

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
                alert("Ocorreu um erro ao comunicar com o servidor.");
            }
        });
    }
}