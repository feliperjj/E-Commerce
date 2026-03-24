export default function initModal() {
  // Configuração para o Modal de Login
  const btnAbrirLogin = document.querySelector('[data-modal="abrir"]');
  const btnFecharLogin = document.querySelector('[data-modal="fechar"]');
  const containerLogin = document.querySelector('[data-modal="container"]');

  // Configuração para o Modal de Registro
  const btnAbrirRegistro = document.querySelector('[data-modal="abrir1"]');
  const btnFecharRegistro = document.querySelector('[data-modal="fechar1"]');
  const containerRegistro = document.querySelector('[data-modal="container1"]');

  function setupModal(btnAbrir, btnFechar, container) {
    if (btnAbrir && btnFechar && container) {
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
  }

  // Ativa os dois modais de forma independente
  setupModal(btnAbrirLogin, btnFecharLogin, containerLogin);
  setupModal(btnAbrirRegistro, btnFecharRegistro, containerRegistro);
}