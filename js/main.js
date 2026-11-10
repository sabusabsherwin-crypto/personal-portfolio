// ===== EDIT YOUR FIRST NAME HERE (one place only) =====
const FIRST_NAME = "Sabusab";
// =======================================================

document.documentElement.classList.add("js");

// Apply name everywhere: logo is uppercase, text is normal case
document.querySelectorAll("[data-name]").forEach(el => {
  el.textContent = el.closest(".logo") ? FIRST_NAME.toUpperCase() : FIRST_NAME;
});
document.title = `${FIRST_NAME.toUpperCase()} | Aspiring IT Professional`;
document.getElementById("year").textContent = new Date().getFullYear();

// Loader
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("is-done"), 500);
});

// Back to top
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("is-visible", scrollY > 600), { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0 }));

// Hero mouse-follow (desktop, motion allowed)
const visual = document.getElementById("heroVisual");
const orb = visual.querySelector(".orb");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && matchMedia("(hover:hover)").matches) {
  let raf;
  document.getElementById("home").addEventListener("mousemove", e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = visual.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const x = Math.max(-1, Math.min(1, dx < 0 ? dx / cx : dx / (innerWidth - cx)));
      const y = Math.max(-1, Math.min(1, dy < 0 ? dy / cy : dy / (innerHeight - cy)));
      orb.style.setProperty("--mx", x.toFixed(2));
      orb.style.setProperty("--my", y.toFixed(2));
      orb.style.setProperty("--lx", x.toFixed(2));
      orb.style.setProperty("--ly", y.toFixed(2));
    });
  });
}
