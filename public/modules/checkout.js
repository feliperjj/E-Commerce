export default function initCheckout() {
    const formCheckout = document.getElementById('formCheckout');
    if (!formCheckout) return;

    formCheckout.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btnPagar');
        const textoOriginal = btn.innerHTML;

        try {
            // --- INÍCIO DA SIMULAÇÃO (MOCK) ---
            btn.disabled = true;
            btn.style.cursor = 'wait';
            
            // Passo 1: Conectando...
            btn.style.background = '#f39c12'; // Laranja
            btn.innerHTML = '⏳ Conectando ao banco...';
            
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Passo 2: Processando...
            btn.style.background = '#e67e22'; 
            btn.innerHTML = '💳 Processando cartão...';

            await new Promise(resolve => setTimeout(resolve, 2000)); 
            // --- FIM DA SIMULAÇÃO ---

            // Confirmação final na API
            const res = await fetch('/backend/finalizar_compra.php', { credentials: 'include' });
            const result = await res.json();
            
            if (result.sucesso) {
                // Passo 3: Sucesso!
                btn.style.background = '#27ae60'; // Verde
                btn.innerHTML = '✅ Pagamento Aprovado!';
                
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                }, 1000);
            } else {
                // Em caso de erro
                btn.disabled = false;
                btn.style.cursor = 'pointer';
                btn.style.background = '#e74c3c'; // Vermelho
                btn.innerHTML = '❌ Pedido Recusado';
                alert("Erro ao finalizar: " + result.erro);
                
                setTimeout(() => {
                    btn.style.background = '#27ae60';
                    btn.innerHTML = textoOriginal;
                }, 3000);
            }
        } catch (e) {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.background = '#e74c3c';
            btn.innerHTML = '⚠️ Erro de Conexão';
            alert("Erro na comunicação com o servidor.");
            
            setTimeout(() => {
                btn.style.background = '#27ae60';
                btn.innerHTML = textoOriginal;
            }, 3000);
        }
    });
}
