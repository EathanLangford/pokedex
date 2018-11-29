const renderPokemon = (pokemon) => {
    const list = document.querySelector('#pokemon-list')
    console.log(pokemon)
    // use plural to represent the collection (before .forEach) and singular is passed through
    pokemon.forEach((poke, index) => {
        const panel = `
            <div>
                <a href="poke-info.html?${index + 1}">
                    <p>${poke.name.toUpperCase()}</p>
                </a>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', panel)
    })
}

const url = 'https://pokeapi.co/api/v2/pokemon/';
fetch(url)
    // to be able to use the data that is sent back, convert to a json representation of it
    .then((response) => response.json())
    // to see the whole data do the below
    // if there is only one parameter, it can be written as .then(json => console.log(json)) -> no parenthesis
    // .then((json) => console.log(json))
    .then(json => {
        // gets you the json array, takes the results and cuts it from index 0 to 151
        const actualPokemon = json.results.slice(0, 151);
        // finds a specific object and the pulling out there name
        // console.log(actualPokemon[5].name);
        renderPokemon(actualPokemon);
    })
    // opportunity to step in and do something, control what the user sees if an error occurs
    .catch((error) => console.error(error))


