const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

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


// ===== GALERÍA HORIZONTAL DE TESTIMONIOS =====
const testimonialsViewport = document.querySelector(".testimonials-viewport");
const testimonialsTrack = document.querySelector(".testimonials-track");
const testimonialSlides = [...document.querySelectorAll(".testimonial-slide")];
const galleryPrev = document.querySelector(".gallery-arrow--prev");
const galleryNext = document.querySelector(".gallery-arrow--next");

if (testimonialsViewport && testimonialsTrack && testimonialSlides.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoplayId = null;

  const getStep = () => {
    const firstSlide = testimonialSlides[0];
    if (!firstSlide) return testimonialsViewport.clientWidth * 0.8;

    const styles = getComputedStyle(testimonialsTrack);
    const gap = parseFloat(styles.gap || styles.columnGap || "0");
    return firstSlide.getBoundingClientRect().width + gap;
  };

  const goNext = () => {
    const maxScroll = testimonialsViewport.scrollWidth - testimonialsViewport.clientWidth;
    const step = getStep();

    if (testimonialsViewport.scrollLeft >= maxScroll - step * 0.55) {
      testimonialsViewport.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      testimonialsViewport.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    const step = getStep();

    if (testimonialsViewport.scrollLeft <= step * 0.25) {
      testimonialsViewport.scrollTo({
        left: testimonialsViewport.scrollWidth,
        behavior: "smooth"
      });
    } else {
      testimonialsViewport.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const startAutoplay = () => {
    if (prefersReducedMotion || autoplayId) return;
    autoplayId = setInterval(goNext, 3600);
  };

  galleryNext?.addEventListener("click", () => {
    stopAutoplay();
    goNext();
    startAutoplay();
  });

  galleryPrev?.addEventListener("click", () => {
    stopAutoplay();
    goPrev();
    startAutoplay();
  });

  testimonialsViewport.addEventListener("pointerdown", stopAutoplay);
  testimonialsViewport.addEventListener("pointerup", startAutoplay);
  testimonialsViewport.addEventListener("pointercancel", startAutoplay);

  document.querySelector(".testimonials-gallery")?.addEventListener("mouseenter", stopAutoplay);
  document.querySelector(".testimonials-gallery")?.addEventListener("mouseleave", startAutoplay);
  document.querySelector(".testimonials-gallery")?.addEventListener("focusin", stopAutoplay);
  document.querySelector(".testimonials-gallery")?.addEventListener("focusout", startAutoplay);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
}
