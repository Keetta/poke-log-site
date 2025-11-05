window.initFilters = function () {
    const filterToggle = document.getElementById('filterToggle');
    const pokedexFilter = document.querySelector('.pokedex-filter');
    const filterGenBtn = document.getElementById('filterGen');
    const filterGenPopup = document.getElementById('filterGenPopup');
    const filterTypeBtn = document.getElementById('filterType');
    const filterTypePopup = document.getElementById('filterTypePopup');
    const filterIcons = document.querySelectorAll('.filter-icon');

    const filterAZ = document.getElementById('filterAZ');
    const filterZA = document.getElementById('filterZA');
    const filterDesc = document.getElementById('filterDesc');

    const typeOptions = document.querySelectorAll('.type-option');
    const genOptions = document.querySelectorAll('.gen-option');

    filterToggle.addEventListener('click', () => {
        pokedexFilter.classList.toggle('expanded');
        filterGenPopup.classList.remove('active');
    });

    filterGenBtn.addEventListener('click', () => {
        filterGenPopup.classList.toggle('active');
    });

    filterTypeBtn.addEventListener('click', () => {
        filterTypePopup.classList.toggle('active');
    });

    filterAZ.addEventListener('click', () => {
        if (filterAZ.classList.contains('active-filter')) {
            filterAZ.classList.remove('active-filter');

            if (typeof window.resetPokedex === 'function') {
                window.resetPokedex();
            }
            return;
        }

        filterIcons.forEach(b => b.classList.remove('active-filter'));
        filterAZ.classList.add('active-filter');

        if (typeof window.sortPokemonsAZ === 'function') {
            window.sortPokemonsAZ();
        }
    });

    filterZA.addEventListener('click', () => {
        if (filterZA.classList.contains('active-filter')) {
            filterZA.classList.remove('active-filter');
            if (typeof window.resetPokedex === 'function') window.resetPokedex();
            return;
        }

        filterIcons.forEach(b => b.classList.remove('active-filter'));
        filterZA.classList.add('active-filter');

        if (typeof window.sortPokemonsZA === 'function') window.sortPokemonsZA();
    });

    filterDesc.addEventListener('click', () => {
        if (filterDesc.classList.contains('active-filter')) {
            filterDesc.classList.remove('active-filter');
            if (typeof window.resetPokedex === 'function') window.resetPokedex();
            return;
        }

        filterIcons.forEach(b => b.classList.remove('active-filter'));
        filterDesc.classList.add('active-filter');

        if (typeof window.sortPokemonsByNumberDesc === 'function')
            window.sortPokemonsByNumberDesc();
    });

    typeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedType = opt.dataset.type;

            filterTypePopup.classList.remove('active');

            if (!selectedType) {
                filterIcons.forEach(b => b.classList.remove('active-filter'));
                if (typeof window.resetPokedex === 'function') {
                    window.resetPokedex();
                }
                return;
            }

            filterIcons.forEach(b => b.classList.remove('active-filter'));
            filterTypeBtn.classList.add('active-filter');

            if (typeof window.filterByType === 'function') {
                window.filterByType(selectedType);
            }
        });
    });

    genOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedGen = opt.dataset.gen;
            filterGenPopup.classList.remove('active');

            if (!selectedGen) {
                filterIcons.forEach(b => b.classList.remove('active-filter'));
                if (typeof window.resetPokedex === 'function') {
                    window.resetPokedex();
                }
                return;
            }

            filterIcons.forEach(b => b.classList.remove('active-filter'));
            filterGenBtn.classList.add('active-filter');

            if (typeof window.filterByGen === 'function') {
                window.filterByGen(parseInt(selectedGen));
            }
        });
    });

    document.addEventListener('click', (e) => {
        const clickedInsideGen = filterGenPopup.contains(e.target);
        const clickedOnGenBtn = filterGenBtn.contains(e.target);
        const clickedInsideType = filterTypePopup.contains(e.target);
        const clickedOnTypeBtn = filterTypeBtn.contains(e.target);

        if (!clickedInsideGen && !clickedOnGenBtn) {
            filterGenPopup.classList.remove('active');
        }

        if (!clickedInsideType && !clickedOnTypeBtn) {
            filterTypePopup.classList.remove('active');
        }
    });


    filterIcons.forEach(btn => {
        // Ignores A-Z button
        if (btn.id === 'filterAZ' || btn.id === 'filterZA' || btn.id === 'filterDesc') return;

        btn.addEventListener('click', () => {
            if (btn.classList.contains('active-filter')) {
                btn.classList.remove('active-filter');
                return;
            }

            filterIcons.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
        });
    });
}
