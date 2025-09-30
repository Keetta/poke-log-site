    document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const navbar = document.querySelector(".navbar");
    const indicator = document.querySelector(".nav-indicator");
    const links = nav.querySelectorAll("a");

    function updateIndicator(el) {
        if (!el) return; // proteção caso elemento não exista

        const linkRect = el.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();

        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;

        indicator.style.backgroundColor = '#ffffff';
    }

    // Exponha para o escopo global para uso externo
    window.updateIndicator = updateIndicator;

    // Atualiza a barra para o link ativo (ou o primeiro, como fallback)
    const activeLink = nav.querySelector("a.active") || links[0];

    // Use requestAnimationFrame para garantir que o layout está pronto antes de posicionar a barra
    requestAnimationFrame(() => {
        updateIndicator(activeLink);
    });

    // Adiciona eventos de clique para os links
    links.forEach(link => {
        link.addEventListener("click", (e) => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        updateIndicator(link);
        });
    });

    // Atualiza a barra ao redimensionar a janela (pois o layout muda)
    window.addEventListener("resize", () => {
        const active = nav.querySelector("a.active");
        if (active) {
        updateIndicator(active);
        }
    });
    });
