/*
* A bit different from the search.js presented on the home screen, as this one
* appears in a pop-up dropdown list below the search bar and is required to
* filter out the current page from the outputs.
 */

const CURRENT_URL = window.location.href;
const CURRENT_PAGE = CURRENT_URL
    .split("/")[CURRENT_URL.split("/").length - 1]
    .split(".")[0];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchinput');
    const resultsContainer = document.getElementById('dropdownresults');
    const dropdown = document.getElementById('dropdownresults');

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
        console.error('Required DOM elements are missing; search will not function properly.');
        return;
    }

    // lowercase, remove spaces & dashes
    let cleanTitle = (title) => title.toLowerCase().replace(/[\s-]/g, "");

    function searchWiki() {
        const query = searchInput.value.trim();

        resultsContainer.innerHTML = '';

        if (!query) {
            hideDropdown(false);
            return;
        }

        const matches = pages
            .filter(page =>
                !(cleanTitle(CURRENT_PAGE) === cleanTitle(page.title)) && cleanTitle(page.title).includes(cleanTitle(query))
            ).sort(
                function(a, b) { return cleanTitle(a.title).indexOf(query) - cleanTitle(b.title).indexOf(query)}
            );

        if (matches.length > 0) {
            matches.forEach(match => {
                const listItem = document.createElement('li');
                listItem.className = 'result-item';
                listItem.innerHTML = `
                    <a href="${match.url}" id="dropdownlink" class="searchlink">${match.title}</a>
                    <p id="dropdowndesc">${match.description}</p>
                `;
                resultsContainer.appendChild(listItem);
            });
            showDropdown();
        } else {
            hideDropdown(false);
        }
    }

    function showDropdown() {
        dropdown.classList.remove('hidden');
    }

    function hideDropdown(doDelay) {
        if (!doDelay) {
            dropdown.classList.add('hidden');
            return;
        }

        setTimeout(() => {
            dropdown.classList.add('hidden');
        }, 200);
    }

    searchInput.addEventListener('input', () => {
        searchWiki();
    });

    searchInput.addEventListener('focus', () => {
        searchWiki();
    });

    searchInput.addEventListener('blur', () => {
        hideDropdown(true);
    });
});