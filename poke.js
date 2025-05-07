const allPokeURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const pokeInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeID = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const imgContainer = document.getElementById("pokemon-img");
const pokeType = document.getElementById("types");
const pokeHP = document.getElementById("hp");
const pokeAttack = document.getElementById("attack");
const pokeSpecialAttack = document.getElementById("special-attack");
const pokeDefense = document.getElementById("defense");
const pokeSpecialDefense = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");



let pokemonInList = false;

const checkPokemonExist = (pokemon) => {
    fetch(allPokeURL)
        .then((response) => response.json())
        .then((data) => {
            
            for(let i = 0; i < parseFloat(data.count) - 1; i++){
                
                if(pokemon === data.results[i].name){
                    pokemonInList = true;
                }
            }

            if(!pokemonInList){
                alert("Pokémon not found")
            } else{
                getPokeData(pokemon);
            }
        });
}

const getPokeData = (pokemon) => {
    fetch(`${allPokeURL}/${pokemon}`)
        .then((answer) => answer.json())
        .then((pokeData) => {
            //console.log(pokeData);
            fillPokemonContainer(pokeData);
            fillStatsContainer(pokeData);
        })
}

const fillPokemonContainer = (data) => {
    pokeType.innerHTML = "";

    pokeName.textContent = `${data["name"].toUpperCase()}`
    pokeID.textContent = `#${data["id"]}`
    pokeHeight.textContent = `Height: ${data["height"]}`
    pokeWeight.textContent = `Weight: ${data["weight"]}`
    imgContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data["name"]}"/>`;

    data.types.forEach((type) => pokeType.innerHTML += `<a src="${type.type.url}" target="_blank">${type.type.name.toUpperCase()}</a>`);
}


const fillStatsContainer = (data) => {
    pokeHP.textContent = `${data.stats["0"].base_stat}`
    pokeAttack.textContent = `${data.stats["1"].base_stat}`
    pokeSpecialAttack.textContent = `${data.stats["3"].base_stat}`
    pokeDefense.textContent = `${data.stats["2"].base_stat}`
    pokeSpecialDefense.textContent = `${data.stats["4"].base_stat}`
    pokeSpeed.textContent = `${data.stats["5"].base_stat}`
}

searchBtn.addEventListener("click",()=>{
    const desiredPokemon = pokeInput.value.toLowerCase(); 

    checkPokemonExist(desiredPokemon);

});