    document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    const navbar = document.querySelector(".navbar");
    const indicator = document.querySelector(".nav-indicator");
    const links = nav.querySelectorAll("a");

    function updateIndicator(el) {
        const linkRect = el.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();

        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;

        indicator.style.backgroundColor = '#ffffff';
    }

    const activeLink = nav.querySelector("a.active") || links[0];
    updateIndicator(activeLink);

    links.forEach(link => {
        link.addEventListener("click", (e) => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        updateIndicator(link);
        });
    });

    window.addEventListener("resize", () => {
        const active = nav.querySelector("a.active");
        if (active) {
        updateIndicator(active);
        }
    });
    });
