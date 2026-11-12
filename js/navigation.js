const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
const navAnchors = links.querySelectorAll("a");

// Sticky nav: transparent -> dark on scroll
const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 30);
onScroll();
addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const isOpen = () => links.classList.contains("is-open");
const setMenu = open => {
  links.classList.toggle("is-open", open);
  nav.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
toggle.addEventListener("click", () => setMenu(!isOpen()));
navAnchors.forEach(a => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", e => { if (e.key === "Escape" && isOpen()) { setMenu(false); toggle.focus(); } });
document.addEventListener("click", e => { if (isOpen() && !nav.contains(e.target)) setMenu(false); });
matchMedia("(min-width:761px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

// Active section tracking
const sections = document.querySelectorAll("[data-section]");
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));
