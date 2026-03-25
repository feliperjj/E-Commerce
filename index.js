// index.js
import initAuth from './modules/auth.js';
import initModal from './modules/modal.js';
import initPagin from './modules/paginacao.js';
import initLogin from './modules/login.js';
import { adicionarAoCarrinho } from './modules/pokemon.js';
import initRegistrar from './modules/registrar.js'
// index.js
// index.js
async function iniciarApp() {
    // 1. CAPTURA o retorno do auth (Felipe ou visitante)
    const usuarioLogado = await initAuth(); 

    initModal();
    initLogin();
    initRegistrar();
    
    // 2. PASSA o nome para a paginação saber quem está comprando
    initPagin(usuarioLogado); 
}

iniciarApp();