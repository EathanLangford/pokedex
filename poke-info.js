const renderAbilities = (poke) => {
    const panel = document.querySelector('#poke-info');
    const ul = `<ul id="abilities"><b>Abilities:</b></ul>`;
    panel.insertAdjacentHTML('beforeend', ul);
    const ulElement = document.querySelector('#abilities');
    poke.abilities.forEach(ability => {
      ulElement.insertAdjacentHTML('beforeend', `<li>${ability.ability.name}</li>`);
    });
}

const renderMoves = (poke) => {
    const panel = document.querySelector('#poke-info');
    const ul = `<ul id="moves"><b>Moves:</b></ul>`;
    panel.insertAdjacentHTML('beforeend', ul);
    const ulElement = document.querySelector('#moves');
    poke.moves.forEach(move => {
      ulElement.insertAdjacentHTML('beforeend', `<li>${move.move.name}</li>`);
    });
}


const renderPokemon = (poke) => {
    const panel = document.querySelector('#poke-info');
    console.log(poke)
    const pokeInfo = `
        <h1>${poke.name.toUpperCase()} #${poke.id}</h1>
        <img src ="${poke.sprites.front_default}"/>
        <p>Weight: ${poke.weight} | Height: ${poke.height}</p>
    `;
    panel.insertAdjacentHTML('beforeend', pokeInfo);
    renderAbilities(poke);
    renderMoves(poke);
}

const getId = () => {
    // will produce ?number
    const queryParams = window.location.search;
    // need to remove ? -> can access a string similaraly to arrays with index number
    const id = queryParams.substr(1);
    return id;
}

const fetchInfo = () => {
    const id = getId()
    // must use back ticks to use interpoltion in a url
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(url)
        .then(resp => resp.json())
        .then(json => renderPokemon(json))
        .catch(error => console.error(error))
}

fetchInfo();

// BIANCA'S LONG WAY OF DISPLAYING ABILITIES AND MOVES

// const renderAbilities = (poke) => {
//     const abilityList = document.querySelector('#abilities')
//     poke.abilities.forEach((ab) => {
//         const eachAbility = `
//                 <li>${ab.ability.name}</li>
//         `
//         abilityList.insertAdjacentHTML('beforeend', eachAbility);
//     })
// }

// const fetchAbilities = () => {
//     const id = getId()
//     const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
//     fetch(url)
//         .then(resp => resp.json())
//         .then(json => renderAbilities(json))
//         .catch(error => console.error(error))
// }

// const renderMoves = (poke) => {
//     const moveList = document.querySelector('#moves')
//     poke.moves.forEach((mo) => {
//         const eachMove = `
//                 <li>${mo.move.name}</li>
//         `
//         moveList.insertAdjacentHTML('beforeend', eachMove);
//     })
// }

// const fetchMoves = () => {
//     const id = getId()
//     const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
//     fetch(url)
//         .then(resp => resp.json())
//         .then(json => renderMoves(json))
//         .catch(error => console.error(error))
// }

// fetchAbilities();
// fetchMoves();