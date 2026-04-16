const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const mobileLinks = [...document.querySelectorAll(".mobile-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.classList.toggle("hidden");
    menuToggle.textContent = isExpanded ? "menu" : "close";
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "menu";
    }
  });
});

const setActiveNav = () => {
  const currentSection = [...sections].reverse().find((section) => {
    const top = section.getBoundingClientRect().top;
    return top <= 160;
  });

  const activeId = currentSection?.id;
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);
