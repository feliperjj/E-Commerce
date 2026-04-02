// index.js
import initAuth from './modules/auth.js';
import initModal from './modules/modal.js';
import initPagin from './modules/paginacao.js';
import initLogin from './modules/login.js';
import { adicionarAoCarrinho } from './modules/pokemon.js';
import initRegistrar from './modules/registrar.js';
import initPerfil from './modules/perfil.js'; // <-- 1. Adicionamos o import do Perfil aqui!

async function iniciarApp() {
    // 1. CAPTURA o retorno do auth (feliperjj ou visitante)
    const usuarioLogado = await initAuth(); 

    // 2. MÓDULOS GLOBAIS (Rodam em todas as páginas, pois estão no Header)
    initModal();
    initLogin();
    initRegistrar();
    
    // 3. ROTEAMENTO DE PÁGINAS (Verifica onde o usuário está navegando)
    const paginaAtual = window.location.pathname;

    if (paginaAtual.includes('perfil.html')) {
        
        // Se a URL tiver 'perfil.html', carrega a Área do Cliente
        initPerfil(usuarioLogado); 
        
    } else if (paginaAtual.includes('carrinho.html')) {
        
        // Espaço reservado: Se você tiver um JS só pro carrinho no futuro, entra aqui!
        
    } else {
        
        // Se for a Home (index.html ou raiz /), carrega o catálogo de Pokémons
        initPagin(usuarioLogado); 
        
    }
}

iniciarApp();