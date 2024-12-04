document.addEventListener('DOMContentLoaded', () => {
    const CURRENT_URL = window.location.href;
    const CURRENT_PAGE = CURRENT_URL
        .split("/")[CURRENT_URL.split("/").length - 1];

    const randomButton = document.getElementById('random');

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

    function goToRandomPage() {
        const pageLinks = pages.map(page => page.url);
        const currentIndex = pageLinks.indexOf("/page/" + CURRENT_PAGE);
        pageLinks.splice(currentIndex, 1);

        const randomURL = pageLinks[Math.floor(Math.random() * pageLinks.length)];
        const endOfRandomURL = randomURL.split('/')[randomURL.split('/').length - 1];

        window.location.href = endOfRandomURL;
    }

    randomButton.addEventListener('click', () => {
        goToRandomPage();
    });
});