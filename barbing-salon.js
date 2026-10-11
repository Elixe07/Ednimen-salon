
const bars = document.querySelector(".bars");
const navbars = document.querySelector(".navbars");

if (bars && navbars) {
    function toggleMenu(isOpen) {
        bars.classList.toggle("active", isOpen);
        navbars.classList.toggle("active", isOpen);

        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    // Open or close the mobile menu
    bars.addEventListener("click", (e) => {
        e.stopPropagation();

        const isOpen = !navbars.classList.contains("active");
        toggleMenu(isOpen);
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", (e) => {
        if (
            navbars.classList.contains("active") &&
            !navbars.contains(e.target) &&
            !bars.contains(e.target)
        ) {
            toggleMenu(false);
        }
    });

    // Navigate to the selected section
    navbars.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const section = document.querySelector(href);

            if (!section) {
                console.error("Navigation section not found:", href);
                return;
            }

            e.preventDefault();

            toggleMenu(false);
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            setTimeout(() => {
                const header = document.querySelector(".header");
                const headerHeight = header ? header.offsetHeight : 0;

                const sectionPosition =
                    section.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: Math.max(0, sectionPosition - headerHeight),
                    behavior: "smooth"
                });

                history.replaceState(null, "", href);
            }, 50);
        });
    });
}

