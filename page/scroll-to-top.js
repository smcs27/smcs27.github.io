document.addEventListener("DOMContentLoaded", () => {
    const scrollTopButton = document.getElementById("scrolltop");

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    };
});
