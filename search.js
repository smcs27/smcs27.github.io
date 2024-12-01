document.addEventListener('DOMContentLoaded', () => {
    let pages = [];

    fetch('/resources/pages/pages.json')
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
                function(a, b) { return cleanTitle(a.title).indexOf(query) - cleanTitle(b.title).indexOf(query)}
            );

        console.log(matches);

        if (matches.length > 0) {
            matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'result-item';
                listItem.innerHTML = `
                    <a href="${match.url}" class="searchlink">${match.title}</a>
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

    // lowercase, remove spaces, dashes
    let cleanTitle = (title) => title.toLowerCase().replace(/[\s-]/g, "");
});