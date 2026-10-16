
// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// ===== CURRENT YEAR IN FOOTER =====
const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== REVEAL SECTIONS ON SCROLL =====
const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
} else {
    sections.forEach(function (section) {
        section.classList.add("section-visible");
    });
}
