document.addEventListener('DOMContentLoaded', () => {
    /*
    * Theme toggler
     */
    const themeToggle = document.querySelector(".themetoggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateForTheme();

    }

    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        updateForTheme();
    });

    function updateForTheme() {
        const imageForGH = document.getElementById('imggh');
        const imageForMusic = document.getElementById('imgmusic');

        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
        }

        console.log(theme);
        if (theme === "dark") {
            imageForGH.src = "./resources/img/gh_logo_white.png";
            imageForMusic.src = "./resources/img/disc_white.png";
        } else {
            imageForGH.src = "./resources/img/gh_logo.png";
            imageForMusic.src = "./resources/img/disc_black.png";
        }

        localStorage.setItem("theme", theme);
    }

    /*
    * Search
     */
    let pages = [];

    fetch('./resources/pages/pages.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load pages");
            }
            return response.json();
        })
        .then(json => {
            pages = json;
        })
        .catch(error => {
            console.error("Error loading pages:", error);
        })

    const searchInput = document.getElementById('searchinput');
    const resultsContainer = document.getElementById('resultbox');
    const searchButton = document.getElementById('search-button');

    const NO_RESULTS_FOUND = '<h4 id="blankwarning">No results found.</h4>'

    if (!searchInput || !resultsContainer) {
        console.error('Required DOM elements are missing.');
        return;
    }

    function searchWiki() {
        const query = searchInput.value.trim();

        resultsContainer.innerHTML = '';

        if (!query) {
            return;
        }

        const matches = pages
            .filter(page =>
                cleanTitle(page.title).includes(cleanTitle(query))
            ).sort(
                function(a, b) { return a.title.indexOf(query) - b.title.indexOf(query)}
            );

        console.log(matches);

        if (matches.length > 0) {
            matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'result-item';
                listItem.innerHTML = `
                    <a href="${match.url}">${match.title}</a>
                    <p>${match.description}</p>
                `;
                resultsContainer.appendChild(listItem);
            });
        } else {
            resultsContainer.innerHTML = NO_RESULTS_FOUND;
        }
    }

    searchInput.addEventListener('input', () => {
        searchWiki();
    });

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchWiki();
    });

    // lowercase, remove spaces, dashes
    let cleanTitle = (title) => title.toLowerCase().replace(/[\s-]/g, "");
});