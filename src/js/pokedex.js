    // pokedex.js

    window.initPokedex = function() {
    const pokeContainer = document.querySelector("#pokeContainer");
    const pokemonCount = 1025;
    let allPokemons = [];

    const typeIds = {
        normal: 1,
        fighting: 2,
        flying: 3,
        poison: 4,
        ground: 5,
        rock: 6,
        bug: 7,
        ghost: 8,
        steel: 9,
        fire: 10,
        water: 11,
        grass: 12,
        electric: 13,
        psychic: 14,
        ice: 15,
        dragon: 16,
        dark: 17,
        fairy: 18
    };

        const fetchPokemons = async () => {
        pokeContainer.innerHTML = '';

        for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
        }
    };

    const getPokemons = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();

        allPokemons.push(data);
        createPokemonCard(data);
    };

        const createPokemonCard = (poke) => {
        const card = document.createElement('div');
        card.classList.add('card', 'pokemon');

        const name = poke.name[0].toUpperCase() + poke.name.slice(1);
        const id = poke.id.toString().padStart(3, '0');

        const pokeTypes = poke.types.map(type => type.type.name);

        let pokeImg = poke.sprites.versions['generation-v']?.['black-white']?.animated?.front_default;

        if (!pokeImg) {
            pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${poke.id}.gif`;
        }

        const fallbackImg = poke.sprites.front_default;

        const typeImages = pokeTypes.map(type => {
            const typeId = typeIds[type];
            return `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${typeId}.png" alt="${type}" title="${type}">`;
        }).join('');

        card.innerHTML = `
        <div class="imgContainer">
            <img src="${pokeImg}" alt="${name}" onerror="this.onerror=null; this.src='${fallbackImg}'">
        </div>
        <div class="pokemon-info">
            <span class="number">N°${id}</span>
            <span class="name">${name}</span>
            <div class="type">
                ${typeImages}
            </div>
        </div>
        `;

        pokeContainer.appendChild(card);
    };

    const renderPokemons = (pokemons) => {
        pokeContainer.innerHTML = '';
        pokemons.forEach(poke => createPokemonCard(poke));
    };

    const sortPokemonsAZ = () => {
        const sorted = [...allPokemons].sort((a, b) => a.name.localeCompare(b.name));
        renderPokemons(sorted);
    };

    const sortPokemonsZA = () => {
        const sorted = [...allPokemons].sort((a, b) => b.name.localeCompare(a.name));
        renderPokemons(sorted);
    };

    const resetPokedex = () => {
        renderPokemons(allPokemons);
    };

    window.sortPokemonsZA = sortPokemonsZA;
    window.sortPokemonsAZ = sortPokemonsAZ;
    window.resetPokedex = resetPokedex;

    fetchPokemons();
    };

