/**PARTE 1 - Adiciona as sugestões no localStorage */

// Seleciona o elemento do formulário e do botão de envio no DOM.
const suggestionForm = document.querySelector('form');
const submitButton = document.querySelector('#submit-button');

// Adiciona um eventListener para evento de click no botão submit do formulário.
submitButton.addEventListener('click', () => {

  // Armazena em variáveis os respectivos dados da sugestão fornecidos pelo usuário nos inputs do formulário
  const userName = suggestionForm.querySelector('#nome').value.trim();
  //trim() é utilizado para remover os espaços em branco no início e no final de uma string
  const userEmail = suggestionForm.querySelector('#email').value.trim();
  const userSuggestion = suggestionForm.querySelector('#sugestao').value.trim();
  //Seleciona o radio que foi marcado no input.
  const userCreditsOrNot = suggestionForm.querySelector('input[name="credito"]:checked').value;

  /* Tratamento de erros/exceções no formulário */
  // Verifica se qualquer um dos campos não foi preenchido e retorna uma mensagem de erro.
  if (!userName || !userEmail || !userSuggestion || !userCreditsOrNot) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Se o campo de nome for preenchido com um número, uma mensagem de erro é exibida.
  if (!isNaN(userName)){
    alert("Introduza um nome válido.");
    return;
  }

  // Garante que o campo de e-mail tenha formato de um email real.
  if ( !userEmail.includes('@') ) {
    alert("Insira um endereço de email válido.");
    return;
  }

  // Após passar por todos os tratamentos de erros, os dados da sugestão são colocados em um objeto.
  const suggestionData = {
    userName,
    userEmail,
    userSuggestion,
    credits: userCreditsOrNot,
  };

  // Armazena na variável um array com as sugestões já salvas no localStorage, e no caso de não haver nenhuma, um array vazio.
  const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
  // Adiciona a nova sugestão (e seus dados) ao array de sugestões.
  suggestions.push(suggestionData);
  // Armazena as sugestões em forma de JSON no localStorage 
  localStorage.setItem('suggestions', JSON.stringify(suggestions));

  // Alerta de sucesso no envio da sugestõo.
  alert('Sua sugestão foi submetida com sucesso!');
  // Limpa/reseta os campos do formulário após já ter salvo as informações informadas.
  suggestionForm.reset();
  // Invoca a função para exibir as sugestões criadas.
  showSuggestions();
});

/* PARTE 2 - Exibir as sugestões */
// Função responsável por exibir as sugestões salvas no localStorage na tela
function showSuggestions() {
  // Carrega um array com as sugestões já salvas.
  const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];

  // Seleciona o container que armazenará as sugestões no site e o item responsável por exibir uma mensagem enquanto não há sugestões.
  const suggestionsContainer = document.querySelector('#user-suggestions');
  const noSuggestionsMessage = document.querySelector('.no-suggestions');

  // Percorre o array de sugestões e para cada sugestão:
  suggestions.forEach( suggestion => {
    // Remove a mensagem inicial.
    noSuggestionsMessage.remove();

    // Cria um elemento de sugestão e adiciona uma classe à ele.
    const suggestionCard = document.createElement('div');
    suggestionCard.classList.add('suggestion-card');

    // Cria o elemento title que mostrará o nome do usuário.
    const name = document.createElement('h3');

    // Condição: se o usuário deseja ser creditado pela sugestão, o seu nome é adicionado ao elemento e exibido no site.
    if(suggestion.credits == "sim") {
      name.textContent = `${suggestion.userName}`;
      suggestionCard.appendChild(name);

    // Caso contrário, é exibido como usuário anónimo.
    } else {
      name.textContent = `Usuário Anónimo`;
      suggestionCard.appendChild(name);
    }

    // Cria o elemento que exibe o email e o adiciona ao elemento de sugestão.
    const email = document.createElement('p');
    email.textContent = `${suggestion.userEmail}`;
    suggestionCard.appendChild(email);

    // Cria o elemento que exibe a sugestão, adiciona o seu texto e insere ao elemento de sugestão.
    const suggestionText = document.createElement('p');
    suggestionText.textContent = `${suggestion.userSuggestion}`;
    suggestionCard.appendChild(suggestionText);

    // Adiciona a sugestão ao container de sugestões.
    suggestionsContainer.appendChild(suggestionCard);
  });
}

// Invoca a função para exibir as sugestões quando ocorrer o evento que consiste no conteúdo da página ser totalmente carregado.
document.addEventListener('DOMContentLoaded', showSuggestions);