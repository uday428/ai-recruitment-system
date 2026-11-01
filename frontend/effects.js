// Optional visual-only enhancements. Does not touch app.js logic or any API calls.
(function () {
  // Count-up animation for dashboard numbers
  function countUp(el) {
    const text = el.textContent.trim();
    const m = text.match(/^(\d+)(%?)$/);
    if (!m || el.dataset.anim === '1') return;
    const end = parseInt(m[1], 10), suffix = m[2];
    if (end === 0) return;
    el.dataset.anim = '1';
    const start = performance.now(), dur = 900;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(() => { el.dataset.anim = '0'; }, 0);
    })(start);
  }
  const obs = new MutationObserver(muts => {
    muts.forEach(mu => {
      const el = mu.target.nodeType === 3 ? mu.target.parentElement : mu.target;
      if (el && el.matches && el.matches('.stat strong')) countUp(el);
    });
  });
  document.querySelectorAll('.stat strong').forEach(el =>
    obs.observe(el, { childList: true, characterData: true, subtree: true }));

  // Soft cursor-follow glow on the login brand panel
  const panel = document.querySelector('.brand-panel');
  if (panel) {
    panel.addEventListener('mousemove', e => {
      const r = panel.getBoundingClientRect();
      panel.style.backgroundImage =
        `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(255,255,255,.14), transparent 60%), linear-gradient(140deg,#0e0b2b,#2a1b86 55%,#4b2fd0)`;
    });
  }
})();