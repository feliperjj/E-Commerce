export default function initModal() {
  function setupModal(btnAbrir, btnFechar, container) {
    // Fail-fast: se um dos elementos não existir na página, cancela a execução para evitar erros no console
    if (!btnAbrir || !btnFechar || !container) return;

    const toggle = (event) => {
      event.preventDefault();
      container.classList.toggle('ativo');
    };

    const cliqueFora = (event) => {
      if (event.target === container) toggle(event);
    };

    btnAbrir.addEventListener('click', toggle);
    btnFechar.addEventListener('click', toggle);
    container.addEventListener('click', cliqueFora);
  }

  // Dicionário de modais: Muito mais limpo e escalável
  const modais = [
    { abrir: '[data-modal="abrir"]', fechar: '[data-modal="fechar"]', container: '[data-modal="container"]' }, // Modal de Login
    { abrir: '[data-modal="abrir1"]', fechar: '[data-modal="fechar1"]', container: '[data-modal="container1"]' } // Modal de Registro
  ];

  // O loop forEach aplica a lógica automaticamente para quantos modais existirem no array
  modais.forEach(seletor => {
    const btnAbrir = document.querySelector(seletor.abrir);
    const btnFechar = document.querySelector(seletor.fechar);
    const container = document.querySelector(seletor.container);
    
    setupModal(btnAbrir, btnFechar, container);
  });
}