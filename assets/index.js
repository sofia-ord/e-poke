const form = document.getElementById("form")
const inputNumber = document.getElementById("input-number")
const cardContainer = document.getElementById("container")

const getPokemonData = (pokemon)=>{
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.home.front_default,
        type: pokemon.types[0].type.name,
        height: pokemon.height / 10,
        weight: pokemon.weight / 10
    }
}

//crear la card

const createPokemonTemplate = (pokemon)=>{
    const {
        id,
        name,
        image,
        type,
        height,
        weight
    } = getPokemonData(pokemon);
    return `
    <div class="card-container">
<img src="${image}" alt="">
<h2 class="name">${name}</h2>
<h3 class="number-id">${id}</h3>
<div class="description-container">
    <p class="poke-description">Tipo principal: <span class="type">${type}</span></p>
    <p class="poke-description">Medida: <span class="height">${height} cm</span></p>
    <p class="poke-description">Peso: <span class="weight">${weight} kg</span></p>
</div>

</div>
    `
}

//renderizar la card

const renderPokemonCard = (pokemon)=>{
    cardContainer.innerHTML = createPokemonTemplate(pokemon);
}

//input no este vacio

const isEmptyInput = () =>{
    return inputNumber.value.trim() === "" ;
}

//buscar el pokemon
const searchPokemon = async (e)=> {
    e.preventDefault()

    if(isEmptyInput(inputNumber)){
       cardContainer.innerHTML = '<div class="error-card"><img src="/assets/img/ash-pikachu.jpg" alt="ash-pikachu"><h2 class="error-msg">Por favor ingrese un numero</h2></div>'
    return;
    }

    const fetchedPokemon = await requestPokemon(inputNumber.value)


    if(fetchedPokemon){
        renderPokemonCard(fetchedPokemon)
        form.reset()
     return;
    } else {
        cardContainer.innerHTML= `<div class="error-card"><img src="/assets/img/ash-pikachu.jpg" alt="error"><h2 class="error-msg"> "Not Found" No existe un pokemon con ese id</h2></div>`
        form.reset()
        return;  
    }
    }

const init = ()=>{
    form.addEventListener("submit", searchPokemon)
}

init()