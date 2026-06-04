// Custom smooth scroll with cubic easing for a cinematic feel.
export const smoothScrollTo = (target, { duration = 1200, offset = 0 } = {}) => {
  const element =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!element) return;

  const startY = window.pageYOffset;
  const rect = element.getBoundingClientRect();
  const targetY = rect.top + startY + offset;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  let cancelled = false;
  const onInterrupt = () => (cancelled = true);
  // Cancel on user wheel/touch/keydown
  window.addEventListener("wheel", onInterrupt, { passive: true, once: true });
  window.addEventListener("touchstart", onInterrupt, { passive: true, once: true });
  window.addEventListener("keydown", onInterrupt, { once: true });

  const step = () => {
    if (cancelled) return;
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const y = startY + distance * easeInOutCubic(progress);
    window.scrollTo(0, y);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
