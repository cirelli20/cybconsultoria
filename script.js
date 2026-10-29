const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

// El logo siempre devuelve al inicio, incluso si el enlace #inicio ya está activo.
document.querySelector(".brand")?.addEventListener("click", event => {
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const plansToggle = document.querySelector(".plans-toggle");
const extraPlans = document.querySelector("#planes-extra");

plansToggle?.addEventListener("click", () => {
  const isHidden = extraPlans?.hasAttribute("hidden");

  if (isHidden) {
    extraPlans.removeAttribute("hidden");
    plansToggle.textContent = "Ver menos planes";
    plansToggle.setAttribute("aria-expanded", "true");

    extraPlans.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("is-visible");
    });
  } else {
    extraPlans?.setAttribute("hidden", "");
    plansToggle.textContent = "Ver más planes";
    plansToggle.setAttribute("aria-expanded", "false");
  }
});


