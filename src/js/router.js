// router.js

// Define Routes
const routes = {
    "#/": "home",
    "#/Pokedex": "pokedex",
    "#/Regions": "regions"
};

// Load Home's Page
function loadHome() {
    document.title = "Pokelog | HOME"
    const template = document.getElementById("home-template");
    const clone = template.content.cloneNode(true);
    const main = document.getElementById("main-page");
    document.body.style.background = "#1a1a1a url('/src/assets/scene/home-pageBG.png') center / cover no-repeat";
    main.innerHTML = "";
    main.appendChild(clone);
}

// Load Pokedex's Page
function loadPokedex() {
    document.title = "Pokelog | POKEDEX"
    const template = document.getElementById("pokedex-template");
    const clone = template.content.cloneNode(true);
    const main = document.getElementById("main-page");
    document.body.style.background = "#1a1a1a url('/src/assets/scene/pokedex-pageBG.png') center / cover no-repeat";
    main.innerHTML = "";
    main.appendChild(clone);
}

// Load Regions's Page
function loadRegions() {
    document.title = "Pokelog | REGIONS"
    const template = document.getElementById("regions-template");
    const clone = template.content.cloneNode(true);
    const main = document.getElementById("main-page");
    main.innerHTML = "";
    main.appendChild(clone);
}

function load404() {
    document.getElementById("main-page").innerHTML = `
        <div class="card not-found-page">
            <h2>Page not found</h2>
            <p>FUCK! Looks like the page doesn't exist.</p>
        </div>
    `;
}

const handleLocation = () => {
    const hash = window.location.hash || "#/";
    const page = routes[hash] || "404";

    if (page === "home") loadHome();
    else if (page === "pokedex") loadPokedex();
    else if (page === "regions") loadRegions();
    else load404();

    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === hash) {
            link.classList.add("active");
        }
    });
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    const hash = event.currentTarget.getAttribute("href");
    window.location.hash = hash;
    handleLocation();
};

// Initialize SPA
window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);
window.route = route;
