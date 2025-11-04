window.initFilters = function () {
    const filterToggle = document.getElementById('filterToggle');
    const pokedexFilter = document.querySelector('.pokedex-filter');
    const filterGenBtn = document.getElementById('filterGen');
    const filterGenPopup = document.getElementById('filterGenPopup');
    const filterIcons = document.querySelectorAll('.filter-icon');

    const filterAZ = document.getElementById('filterAZ');
    const filterZA = document.getElementById('filterZA');

    filterToggle.addEventListener('click', () => {
        pokedexFilter.classList.toggle('expanded');
        filterGenPopup.classList.remove('active');
    });

    filterGenBtn.addEventListener('click', () => {
        filterGenPopup.classList.toggle('active');
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

    document.addEventListener('click', (e) => {
        if (!pokedexFilter.contains(e.target) && !filterGenPopup.contains(e.target)) {
        filterGenPopup.classList.remove('active');
        pokedexFilter.classList.remove('expanded');
        }
    });

    filterIcons.forEach(btn => {
        // Ignores A-Z button
        if (btn.id === 'filterAZ' || btn.id === 'filterZA') return;

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
