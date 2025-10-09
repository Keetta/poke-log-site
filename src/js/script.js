    // script.js

    document.addEventListener("DOMContentLoaded", () => {
        const nav = document.querySelector("nav");
        const navbar = document.querySelector(".navbar");
        const indicator = document.querySelector(".nav-indicator");
        const links = nav.querySelectorAll("a");

        function updateIndicator(el) {
            if (!el) return; // protection in case the element doesn't exist

            const linkRect = el.getBoundingClientRect();
            const navbarRect = navbar.getBoundingClientRect();

            const left = linkRect.left - navbarRect.left;
            const width = linkRect.width;

            indicator.style.left = `${left}px`;
            indicator.style.width = `${width}px`;

            indicator.style.backgroundColor = '#ffffff';
        }

        // Expose to global scope for external use
        window.updateIndicator = updateIndicator;

        // Update the bar to the active link (or the first one as fallback)
        const activeLink = nav.querySelector("a.active") || links[0];

        // Use requestAnimationFrame to ensure layout is ready before positioning the bar
        requestAnimationFrame(() => {
            updateIndicator(activeLink);
        });

        // Add click events to the links
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
                updateIndicator(link);
            });
        });

        // Update the bar on window resize (as layout may change)
        window.addEventListener("resize", () => {
            const active = nav.querySelector("a.active");
            if (active) {
                updateIndicator(active);
            }
        });
    });
