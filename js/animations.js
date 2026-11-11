// Scroll reveal
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target);
        setTimeout(() => (e.target.style.transitionDelay = ""), 900); }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
} else {
  items.forEach(el => el.classList.add("is-visible"));
}

// Background fades as you scroll (keeps text readable)
const rootStyle = document.documentElement.style;
let ticking = false;
const fadeBg = () => { rootStyle.setProperty("--bgo", Math.max(0.2, 1 - scrollY / (innerHeight * 1.2)).toFixed(2)); ticking = false; };
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(fadeBg); } }, { passive: true });
fadeBg();

// 3D tilt + glow on project cards
const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!noMotion && matchMedia("(hover:hover)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((x - 0.5) * 8).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
      el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    });
    el.addEventListener("mouseleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
  });
}
