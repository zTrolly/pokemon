// API endpoint --------------------------------------------
const URL = 'https://pokeapi.co/api/v2/pokemon/';

// Get Elements --------------------------------------------
const Input = getElement('.search-input'),
      Button = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

var pokeName, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por guardar os dados recebidos da API
    card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

// Função responsavel por montar o HTML exibido na pagina
function createCard(){
  type = pokemon.types.map(item => item.type.name).toString();
  if (type =="electric"){
    card = `
    <div class="card card-electric">
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">${pokemon.name}</h1>
          <h2 class="number">Nº${pokemon.id}</h2>
          <h3 class="type">Type:${type}</h3>
          <h3 class="weight">Weight:${pokemon.weight/10}kg</h3>
          <h3 class="height">Height:${pokemon.height/10}m</h3>
      </div>
    </div>`
    return card
  }
  
  card = `
    <div class="card">
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">${pokemon.name}</h1>
          <h2 class="number">Nº${pokemon.id}</h2>
          <h3 class="type">Type:${type}</h3>
          <h3 class="weight">Weight:${pokemon.weight/10}kg</h3>
          <h3 class="height">Height:${pokemon.height/10}m</h3>
      </div>
    </div>`
  return card;
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(URL, pokeName);
  setTimeout(function () {
    //Exibe uma mensagem caso o pokemon pesquisado não exista
    if(pokemon.detail) {
      erroMessage.style.display = 'block';
      container.style.display = 'none';
    }else{
      erroMessage.style.display = 'none';
      container.style.display = 'flex';
      container.innerHTML = createCard();
    }
  }, 2000);
}

// Add Events --------------------------------------------
Button.addEventListener('click', event => {
  event.preventDefault();
  pokeName = Input.value.toLowerCase();
  startApp(pokeName);
  container.classList.add('fade');


});