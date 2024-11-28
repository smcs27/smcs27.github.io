const CURRENT_URL = window.location.href;
const CURRENT_PAGE = CURRENT_URL.split("/")[CURRENT_URL.split("/").length - 1];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchinput');
    const resultsContainer = document.getElementById('dropdownresults');
    const dropdown = document.getElementById('dropdownresults');

    function showDropdown() {
        dropdown.classList.remove('hidden');
    }

    function hideDropdown() {
        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 200);
    }

    dropdown.addEventListener('blur', () => {
        hideDropdown();
        console.log(dropdown);
    });

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
                !CURRENT_PAGE.includes(cleanTitle(page.title)) && cleanTitle(page.title).includes(cleanTitle(query))
            ).sort(
                function(a, b) { return cleanTitle(a.title).indexOf(query) - cleanTitle(b.title).indexOf(query)}
            );

        if (matches.length > 0) {
            matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'result-item';
                listItem.innerHTML = `
                    <a href="${match.url}" id="dropdownlink">${match.title}</a>
                    <p id="dropdowndesc">${match.description}</p>
                `;
                resultsContainer.appendChild(listItem);
            });
            showDropdown();
        } else {
            hideDropdown();
        }
    }

    searchInput.addEventListener('input', () => {
        searchWiki();
    });

    // lowercase, remove spaces, dashes
    let cleanTitle = (title) => title.toLowerCase().replace(/[\s-]/g, "");
});