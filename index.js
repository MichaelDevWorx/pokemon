const pokemonForm = document.querySelector(".pokemonForm");
const innerCard = document.querySelector(".innerCard");
const pokeInput = document.querySelector(".pokeInput");
const outerCard = document.querySelector(".outerCard")
const randomForm = document.querySelector(".randomForm")
const body = document.body;

body.onload = loadRandomPoke();

async function loadRandomPoke() {

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

pokemonForm.addEventListener("submit", async event => {

    //stops it from the default behavior of refreshing the page;
    event.preventDefault();
    
    const pokeName = pokeInput.value.toLowerCase(); //store pokemon name
    

    if (pokeName === "steve") {
        
        const theCard = document.querySelector(".innerCard");
        theCard.innerHTML = ""
        const nameDisplay = document.createElement("h1");
        const picDisplay = document.createElement("img")
        const magicDisplay = document.createElement("p")
        nameDisplay.textContent = pokeName;
        picDisplay.src = "steve.png";
        magicDisplay.textContent = "Hobbies: Loves S'n some Ds. 🩷"
        innerCard.appendChild(nameDisplay);
        innerCard.appendChild(magicDisplay)
        innerCard.appendChild(picDisplay);
        

    }
    else if (pokeName) {
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

});

randomForm.addEventListener("submit", async event => {

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

});

async function getPokeData(pokeName) {
    
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}/`;
    const response = await fetch(apiUrl);

    if (!response.ok){
        throw new Error("Please check your spelling!");
        
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

function displayError(message) {
    
    //create a spot for the error message
    const errorDisplay = document.createElement("p"); 
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    innerCard.textContent = "";
    innerCard.style.display = "flex";
    innerCard.appendChild(errorDisplay);

};

function steveDetected() {
    const nameDisplay = document.createElement("h1");
    const moveDisplay = document.createElement("p");
    const spriteDisplay = document.createElement("img");

    nameDisplay.textContent = "Steve Boots";
    // baseExpDisplay.textContent = baseExperience
    spriteDisplay.src = "steve.png";
    moveDisplay.textContent = `Special move: Rubbin' wieners`;

    innerCard.appendChild(nameDisplay);
    // innerCard.appendChild(baseExpDisplay);
    //
    innerCard.appendChild(moveDisplay);
    innerCard.appendChild(spriteDisplay);
}