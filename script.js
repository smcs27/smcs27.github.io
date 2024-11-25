document.addEventListener('DOMContentLoaded', () => {
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

    if (!searchInput || !resultsContainer) {
        console.error('Required DOM elements are missing.');
        return;
    }

    function search() {
        const query = searchInput.value.trim();

        resultsContainer.innerHTML = '';

        if (!query) {
            resultsContainer.innerHTML = '<h3>No results found.</h3>';
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
            matches.slice(0, Math.min(matches.length, 3)).forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'result-item';
                listItem.innerHTML = `
                    <a href="${match.url}">${match.title}</a>
                    <p>${match.description}</p>
                    <h1/>
                `;
                resultsContainer.appendChild(listItem);
            });
        } else {
            resultsContainer.innerHTML = '<h3 id="blank">No results found.</h3>';
        }
    }

    document.getElementById('search-button').addEventListener('click', (e) => {
        e.preventDefault();
        search();
    });

    // lowercase, remove spaces, dashes
    let cleanTitle = (title) => title.toLowerCase().replace(/[\s-]/g, "");
});