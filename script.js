const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
revealItems.forEach((item) => revealObserver.observe(item));

// Animate the name on entry, then keep its gradient gently moving.
const heroTitle = document.querySelector(".hero h1");
if (heroTitle) {
  heroTitle.setAttribute("aria-label", "Alvin Steve Saji");
  heroTitle.classList.add("name-animated");
}

// Add a gentle parallax drift to the scenic hero image while scrolling.
const heroImage = document.querySelector(".hero-image");
let ticking = false;
window.addEventListener("scroll", () => {
  if (!heroImage || ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = Math.min(window.scrollY * 0.16, 90);
    heroImage.style.transform = `translateY(${y}px) scale(1.025)`;
    ticking = false;
  });
}, { passive: true });

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

// Project carousel controls: smoothly focus the next/previous project.
const projectGrid = document.querySelector(".project-grid");
const projectCards = [...document.querySelectorAll(".project-card")];
let activeProject = 0;
function focusProject(direction) {
  if (window.matchMedia("(max-width: 760px)").matches) {
    activeProject = (activeProject + direction + projectCards.length) % projectCards.length;
    projectCards[activeProject].scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    projectGrid.animate([{opacity: .65, transform: "translateY(5px)"}, {opacity: 1, transform: "translateY(0)"}], {duration: 300, easing: "ease-out"});
    activeProject = (activeProject + direction + projectCards.length) % projectCards.length;
    projectCards.forEach((card, index) => card.style.outline = index === activeProject ? "2px solid #b9d1ff" : "none");
    setTimeout(() => projectCards.forEach(card => card.style.outline = "none"), 800);
  }
}
document.getElementById("prevProject")?.addEventListener("click", () => focusProject(-1));
document.getElementById("nextProject")?.addEventListener("click", () => focusProject(1));

document.getElementById("year").textContent = new Date().getFullYear();

// Active navigation section state
const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));
