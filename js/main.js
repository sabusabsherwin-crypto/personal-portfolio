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
  setTimeout(() => document.documentElement.classList.add("ready"), 350);
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

// Hero heading: split into words for the reveal animation
const h1 = document.querySelector("[data-split]");
if (h1) {
  const text = h1.textContent.trim();
  h1.setAttribute("aria-label", text);
  h1.innerHTML = text.split(/\s+/).map((w, i) =>
    `<span class="w" aria-hidden="true"><span style="transition-delay:${(0.25 + i * 0.08).toFixed(2)}s">${w}</span></span>`
  ).join(" ");
}

// Skills filter
const filterBtns = document.querySelectorAll(".filters button");
filterBtns.forEach(b => b.addEventListener("click", () => {
  filterBtns.forEach(x => x.classList.toggle("is-on", x === b));
  const f = b.dataset.filter;
  document.querySelectorAll(".chips li").forEach(li =>
    li.classList.toggle("is-hidden", f !== "all" && !li.querySelector(".tag--" + f)));
  document.querySelectorAll(".skills .card").forEach(c =>
    c.classList.toggle("is-hidden", !c.querySelector(".chips li:not(.is-hidden)")));
}));

// Copy email
const copyBtn = document.getElementById("copyEmail");
const mailLink = document.querySelector('.contact a[href^="mailto:"]');
if (copyBtn && mailLink) {
  copyBtn.addEventListener("click", async () => {
    const mail = mailLink.getAttribute("href").replace("mailto:", "");
    try { await navigator.clipboard.writeText(mail); copyBtn.textContent = "Copied!"; }
    catch { copyBtn.textContent = mail; }
    setTimeout(() => (copyBtn.textContent = "Copy email"), 2200);
  });
}
