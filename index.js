const pokemonForm = document.querySelector(".pokemonForm");
const innerCard = document.querySelector(".innerCard");
const pokeInput = document.querySelector(".pokeInput");

async function getPokemon() {

    //stops it from the default behavior of refreshing the page;
    event.preventDefault(); 
    
    const pokeName = pokeInput.value; //store pokemon name

    if (pokeName) {
        try {
            const pokeData = await getPokeData(pokeName);
            displayPokeInfo(pokeData);            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Enter a Pokemon name!")
    }

};

async function getRandom() {

    event.preventDefault();

    let randomPokeNum = (Math.floor(Math.random() * 1025));
    randomPokeNum = randomPokeNum.toString();
   
    if (randomPokeNum) {
        try {
            const pokeData = await getPokeData(randomPokeNum);
            displayPokeInfo(pokeData);            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Enter a Pokemon name!")
    }

};

async function getPokeData(pokeName) {
    
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}/`;
    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Could not fetch weather data.");
        
    }
    
    return await response.json(); //return object in json-like format 
    console.log(response);

}

function displayPokeInfo(data) {

    // console.log(data);

    let randomMove = Math.floor(Math.random() * data.moves.length);

    if (data.held_items.length > 0) {
              
        let randomItem = Math.floor(Math.random() * data.held_items.length);
        let item = data.held_items[randomItem].item.name;
        console.log(item);
        const itemDisplay = document.createElement("p");
        innerCard.appendChild(itemDisplay);
        itemDisplay.textConent = `Item: ${item}`
        

    }
  

       
    const pokemonName = data.name;
    const baseExperience = data.base_experience;
    const sprite = data.sprites.other.home.front_default;
    const moves = data.moves[randomMove].move.name;
    //

    console.log(moves)

    innerCard.textContent = "";
    innerCard.style.display = "flex";

    const nameDisplay = document.createElement("h1");
    const moveDisplay = document.createElement("p");
    const spriteDisplay = document.createElement("img");
    //
    

    nameDisplay.textContent = pokemonName;
    // baseExpDisplay.textContent = baseExperience
    spriteDisplay.src = sprite;
    moveDisplay.textContent = `Special move: ${moves}`;
    //

    innerCard.appendChild(nameDisplay);
    // innerCard.appendChild(baseExpDisplay);
    //
    innerCard.appendChild(moveDisplay);
    innerCard.appendChild(spriteDisplay);
    

}

function addItem(item) {
    

}

function displayError(message) {
    
    //create a spot for the error message
    const errorDisplay = document.createElement("p"); 
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    innerCard.textContent = "";
    innerCard.style.display = "flex";
    innerCard.appendChild(errorDisplay);

};