//PARTE 1 - adicionar/remover roteiros dos favoritos utilizando o botão favorito

/*Função responsável por atualizar o estado da classe do botão de favorito utilizando como parâmetro o próprio elemento botão onde o evento ocorreu, e a variável boolean que define se o botão foi favoritado.*/
function updateFavButtonState(button, isFavorited) {
  // Se o botão foi favoritado, a classe 'favorited' é adicionada à ele, caso contrário, a classe é removida.
  if (isFavorited) {
    button.classList.add('favorited');
  } else {
    button.classList.remove('favorited');
  }
}

// Função responsável por carregar os favoritos existentes no localStorage e convertê-los de JSON para array
function loadFavorites() {
  // || [] determina que se ainda não houver um array de favoritos, um array vazio é criado.
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Função responsável por salvar os favoritos no localStorage convertendo o array em JSON
function saveFavorites(favorites) {
  //.setItem() primeiro define o identificador que terá no localStorage e, em seguida, transforma o array em string para ser armazenado
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// 1. Seleciona todos os botões de favoritar roteiro no DOM
const favoriteButtons = document.querySelectorAll('.favorite-button');

// 2. Percorre cada item dos botões favoritos
favoriteButtons.forEach(favButton => {

  // 3. Para cada botão define um addEventListener com evento de click
  favButton.addEventListener('click', () => {
    // 4. Seleciona as propriedades do botão que serão utilizadas. No caso, o nome do roteiro e o link para sua página.
    const nomeRoteiro = favButton.getAttribute('roteiro-name');
    const urlRoteiro = favButton.getAttribute('roteiro-url');

    // 5. Variável responsável por armazenar os favoritos carregados do localStorage utilizando a função loadFavorites().
    let favorites = loadFavorites();

    // 6. Inicializa o estado inicial (default) do botão sempre como não-favoritado.
    let isAlreadyFavorited = false;

    // 7. Laço que percorre o array de favoritos
    for (let i = 0; i < favorites.length; i++) {
      // 8. Se o roteiro já encontra-se nos favoritos é removido.
      if (favorites[i].name === nomeRoteiro) {
        // .splice() é utilizado para remover um item do array.
        favorites.splice(i, 1);
        // O primeiro parâmetro indica a posição do item; segundo parâmetro especifica o número de items que serão removidos a partir daquela posição.
        isAlreadyFavorited = true;
        break;
      }
    }

    // 8. Condição que define que se o botão ainda não pertence aos favoritos, um objeto com seus dados/propiedades é criado.
    if (!isAlreadyFavorited) {
      const favoriteData = {
        name: nomeRoteiro,
        url: urlRoteiro
      };
      // 9. Em seguida, esse objeto é inserido no array de favoritos e passa a fazer parte dele.
      favorites.push(favoriteData);
    }

    // 10. Utiliza-se o operador de negação ! para garantir a dinâmica de troca de favorito reflita também no css utilizando a classe. Se é favorito e foi clicado, deixa de ser favorito, e se não é, passa a ser (recebe/perde a classe favorited).
    updateFavButtonState(favButton, !isAlreadyFavorited);

    // 11. Salva as alterações realizadas nos favoritos no localStorage
    saveFavorites(favorites);
  })

  // 12. Verifica se o botão já é favoritado ao carregar a página, e atualiza o estado do botão de acordo
  const nomeRoteiro = favButton.getAttribute('roteiro-name');
  const favorites = loadFavorites();
  let isAlreadyFavorited = false;

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].name === nomeRoteiro) {
      isAlreadyFavorited = true;
      break;
    }
  }

  updateFavButtonState(favButton, isAlreadyFavorited);
});

// PARTE 2 - Capturar favoritos do localStorage e exibi-los

// 1. Seleciona pelo identificador único o elemento container dos favoritos
const favoritesList = document.querySelector('#favorites-list');

// 2. Se o elemento existir
if (favoritesList) {

  // 3. Cria um elemento com uma mensagem que será exibida quando não houver favoritos no container
  const noFavoritesMessage = document.querySelector('.no-fav');
  // 4. Carrega em uma var constante os favoritos já existentes no localStorage.
  const favorites = loadFavorites();
  
  // 5. Percorre cada elemento do array de favoritos
  favorites.forEach( favorite => {

    // 6. Remove a mensagem do container assim que o primeiro favorito é carregado.
    noFavoritesMessage.remove();

    // 7. Cria um elemento de lista (que será um favorito) e adiciona uma classe à ele.
    const listItem = document.createElement('li');
    listItem.classList.add('favorites-list-item');

    // 8. Cria o elemento que será o link para a página de roteiro do favorito.
    const favoriteLink = document.createElement('a');
    // 9. Adiciona ao elemento <a> (link): a URL do favorito à propriedade href, ao contéudo o nome do favorito, e a classe de link.
    favoriteLink.href = favorite.url;
    favoriteLink.textContent = favorite.name;
    favoriteLink.classList.add('favoritos-item-link');

    // 10. Adiciona o elemento link <a> ao elemento lista <li>.
    listItem.appendChild(favoriteLink);

    // 11. Adiciona o novo item à lista de favoritos.
    favoritesList.appendChild(listItem);
  });
}