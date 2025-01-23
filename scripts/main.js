// Função responsável por controlar a abertura do menu mobile

/* Um evento de click está presente no botão menu mobile e quando acionado a função open menu é chamada. */
window.openMenu = function openMenu() {

  //seleciona o navbar/menu no DOM
  const nav = document.querySelector('nav');
  //alterna a classe do elemento nav para que com o estado 'active', que controla a visibilidade do menu
  nav.classList.toggle('active');
};