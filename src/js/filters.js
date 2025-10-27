window.initFilters = function () {
    const filterToggle = document.getElementById('filterToggle');
    const pokedexFilter = document.querySelector('.pokedex-filter');
    const filterGenBtn = document.getElementById('filterGen');
    const filterGenPopup = document.getElementById('filterGenPopup');
    const filterIcons = document.querySelectorAll('.filter-icon');

    filterToggle.addEventListener('click', () => {
        pokedexFilter.classList.toggle('expanded');
        filterGenPopup.classList.remove('active');
    });

    filterGenBtn.addEventListener('click', () => {
        filterGenPopup.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!pokedexFilter.contains(e.target) && !filterGenPopup.contains(e.target)) {
        filterGenPopup.classList.remove('active');
        pokedexFilter.classList.remove('expanded');
        }
    });

    filterIcons.forEach(btn => {
        btn.addEventListener('click', () => {

            if (btn.classList.contains('active-filter')) {
                btn.classList.remove('active-filter')
                return;
            }
            filterIcons.forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
        })
    })
}
