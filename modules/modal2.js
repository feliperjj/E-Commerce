export default function initModal1() {
  const botaoAbrir = document.querySelector('[data-modal="abrir1"]');
  const botaoFechar = document.querySelector('[data-modal="fechar1"]');
  const containerModal = document.querySelector('[data-modal="container1"]');
  
  function toggleModal(event) {
    event.preventDefault();
    containerModal.classList.toggle('ativo');
  }
  function cliqueForaModal(event) {
    if(event.target === this) {
      toggleModal(event);
    }
  }

  if(botaoAbrir && botaoFechar && containerModal) {
    
  
    botaoAbrir.addEventListener('click', toggleModal);
    botaoFechar.addEventListener('click', toggleModal);
    containerModal.addEventListener('click', cliqueForaModal);
  }
}
