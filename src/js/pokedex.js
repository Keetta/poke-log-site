    // pokedex.js

    window.initPokedex = function() {
    const pokeContainer = document.querySelector("#pokeContainer");
    const pokemonCount = 151;
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

    const generationRanges = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 493],
        5: [494, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 905],
        9: [906, 1025]
    };

        const fetchPokemons = async () => {
        pokeContainer.innerHTML = '';

        setActivePokemon(1);

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

        card.addEventListener('click', () => setActivePokemon(poke.id));

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

    const filterByGen = (genNumber) => {
        const [start, end] = generationRanges[genNumber];
        const filtered = allPokemons.filter(poke => poke.id >= start && poke.id <= end);
        renderPokemons(filtered);
    };

    const sortPokemonsByNumberDesc = () => {
        const sorted = [...allPokemons].sort((a, b) => b.id - a.id);
        renderPokemons(sorted);
    };

    const filterByType = (typeName) => {
        const filtered = allPokemons.filter(poke =>
            poke.types.some(t => t.type.name === typeName)
        );
        renderPokemons(filtered);
    };

    const resetPokedex = () => {
        renderPokemons(allPokemons);
    };

    const setActivePokemon = async (id) => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

        const [pokemonResp, speciesResp] = await Promise.all([
            fetch(pokemonUrl),
            fetch(speciesUrl)
        ]);

        const pokemonData = await pokemonResp.json();
        const speciesData = await speciesResp.json();

        const category = speciesData.genera.find(gen => gen.language.name === "en")?.genus || "Unknown";

        // Pokédex Entry
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text.replace(/\f/g, ' ') || "No description available.";

        const abilities = pokemonData.abilities.map(a => a.ability.name).join(', ');

        const height = pokemonData.height / 10;
        const weight = pokemonData.weight / 10;

        // Evolutions
        const evoUrl = speciesData.evolution_chain.url;
        const evoResp = await fetch(evoUrl);
        const evoData = await evoResp.json();

        const evolutionNames = [];
        let current = evoData.chain;
        do {
            evolutionNames.push(current.species.name);
            current = current.evolves_to[0];
        } while (current);

        renderActivePokemon({
            name: pokemonData.name,
            id: pokemonData.id,
            types: pokemonData.types.map(t => t.type.name),
            sprite: pokemonData.sprites.other['official-artwork'].front_default,
            category,
            description,
            abilities,
            height,
            weight,
            evolution: evolutionNames
        });
    };

    const renderActivePokemon = (poke) => {
        const activeCard = document.querySelector('.activePokemon');
        if (!activeCard) return;

        const activeImg = activeCard.querySelector('.activeImgContainer img');
        activeImg.src = poke.sprite;
        activeImg.alt = poke.name;

        const typeContainer = activeCard.querySelector('.type');
        typeContainer.innerHTML = poke.types.map(type => {
            const typeId = typeIds[type];
            return `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${typeId}.png" alt="${type}" title="${type}">`;
        }).join('');

        activeCard.querySelector('.name').textContent = poke.name[0].toUpperCase() + poke.name.slice(1);
        activeCard.querySelector('.number').textContent = `N°${poke.id.toString().padStart(3, '0')}`;

        activeCard.querySelector('.pokedexDescription').textContent = poke.description;

        let extraInfo = activeCard.querySelector('.extraInfo');
        if (!extraInfo) {
            extraInfo = document.createElement('div');
            extraInfo.classList.add('extraInfo');
            activeCard.querySelector('.activePokemon-info').appendChild(extraInfo);
        }

        extraInfo.innerHTML = `
        <p class="category">${poke.category}</p>
        <div class="abilitiesContainer">
            <p>Abilities:</p>
            <div class="abilities">${poke.abilities}</div>
        </div>

        <div class="infoContainer">
            <p class="height">Height: ${poke.height} m</p>
            <p class="weight">Weight: ${poke.weight} kg</p>
            <p class="evolutions">Evolution Line: ${poke.evolution.join(' → ')}</p>
        </div>
        `;
    }; /* Estiliza os bglh lá malandro */



    window.sortPokemonsZA = sortPokemonsZA;
    window.sortPokemonsAZ = sortPokemonsAZ;
    window.sortPokemonsByNumberDesc = sortPokemonsByNumberDesc;
    window.filterByGen = filterByGen;
    window.filterByType = filterByType;
    window.resetPokedex = resetPokedex;

    fetchPokemons();
    };

