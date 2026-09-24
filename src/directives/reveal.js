/**
 * v-reveal fades an element up as it scrolls into view.
 *
 * Usage:
 *   <div v-reveal>            fade up when 12% visible
 *   <div v-reveal="120">      ...after a 120ms delay (for staggering grids)
 *
 * Elements reveal once and are then unobserved. If the browser lacks
 * IntersectionObserver, or the user prefers reduced motion, content is shown
 * immediately rather than being left invisible.
 */
const SHOWN = "reveal-visible";

export default {
  mounted(el, binding) {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal", SHOWN);
      return;
    }

    el.classList.add("reveal");
    if (binding.value) {
      el.style.setProperty("--reveal-delay", `${binding.value}ms`);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(SHOWN);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    el._revealObserver = observer;
  },

  unmounted(el) {
    el._revealObserver?.disconnect();
    delete el._revealObserver;
  },
};
