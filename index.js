// index.js
import initAuth from './modules/auth.js';
import initModal from './modules/modal.js';
import initPagin from './modules/paginacao.js';
import initLogin from './modules/login.js';
import { adicionarAoCarrinho } from './modules/pokemon.js';
import initRegistrar from './modules/registrar.js'
async function iniciarApp() {
    // 1. O Auth desenha o header (Olá, Felipe ou Login)
    await initAuth(); 
    
    // 2. O Modal ativa os cliques de abrir/fechar janelas
    initModal(); 
    
    // 3. O Login ativa a escuta do formulário para não dar tela branca
    initLogin(); 
    initRegistrar();
    // 4. A PAGINAÇÃO carrega os Pokémons E ativa os botões de compra lá dentro
    initPagin(); 
}

iniciarApp();