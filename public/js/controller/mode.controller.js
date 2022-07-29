export function modeController() {
    let btnSwitcher = document.querySelector("#mode-toggler");
    let body = document.body;
    let btnIcon = btnSwitcher.children[0];


    //Switch btn icon depending if app is on light or dark mode
    btnSwitcher.addEventListener("click", function () {
        if (btnIcon.classList.contains("bxs-moon")) {
            btnIcon.classList.replace("bxs-moon", "bxs-sun");
            localStorage.setItem("mode", "dark");
            body.classList.add("dark");
        } else {
            btnIcon.classList.replace("bxs-sun", "bxs-moon");
            localStorage.removeItem("mode");
            body.classList.remove("dark");
        }

    });


    //Check if dark mode is set
    let checkStyle = function () {
        let isModeSet = localStorage.getItem("mode");

        if (isModeSet === "dark") {
            body.classList.add("dark");
            btnIcon.classList.replace("bxs-moon", "bxs-sun");
        }

        if (isModeSet === null) {
            body.classList.remove("dark");
        }
    };

    checkStyle();
}