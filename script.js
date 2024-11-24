document.addEventListener('DOMContentLoaded', () => {
    const pages = [
        { title: "Template", url: "/page/template.html", description: "Template for the wiki pages." },
        { title: "Goongate", url: "/page/goongate.html", description: "What AI art generator is this?" },
        { title: "Fight Time", url: "/page/fight-time.html", description: "Phrase popularized by student in freshman year." },
        { title: "Diddy Park", url: "/page/diddy-park.html", description: "Park near the McDonalds, consisting of a playground and Skate Park." },
    ];

    const searchInput = document.getElementById('searchinput');
    const resultsContainer = document.getElementById('results');

    if (!searchInput || !resultsContainer) {
        console.error('Required DOM elements are missing.');
        return;
    }

    function search() {
        const query = searchInput.value.trim();

        resultsContainer.innerHTML = '';

        if (!query) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        const matches = pages.filter(page =>
            page.title.toLowerCase().replace(/\s/g, "").replace(/-/g, "")
                .includes(query.toLowerCase().replace(/\s/g, "").replace(/-/g, "")) ||
            page.description.toLowerCase().replace(/\s/g, "").replace(/-/g, "")
                .includes(query.toLowerCase().replace(/\s/g, "").replace(/-/g, ""))
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
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }

    document.getElementById('search-button').addEventListener('click', (e) => {
        e.preventDefault();
        search();
    });
});