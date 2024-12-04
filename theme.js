document.addEventListener('DOMContentLoaded', () => {
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
        const imageForPR = document.getElementById('imgpr');
        const imageForBug = document.getElementById('imgbug');
        const imageForMusic = document.getElementById('imgmusic');
        const imageForTheme = document.getElementById('imgtheme')

        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
        }

        if (theme === "dark") {
            imageForGH.src = "/resources/img/logos/gh_logo_white.png";
            imageForPR.src = "/resources/img/logos/add_page.png";
            imageForBug.src = "/resources/img/logos/bug_light.png";
            imageForMusic.src = "/resources/img/logos/disc_white.png";
            imageForTheme.src = "/resources/img/logos/moon.png"
        } else {
            imageForGH.src = "/resources/img/logos/gh_logo_light.png";
            imageForPR.src = "/resources/img/logos/add_page_dark.png";
            imageForBug.src = "/resources/img/logos/bug_dark.png";
            imageForMusic.src = "/resources/img/logos/disc_black.png";
            imageForTheme.src = "/resources/img/logos/sun.png"
        }

        localStorage.setItem("theme", theme);
    }
});