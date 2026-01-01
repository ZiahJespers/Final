// Interactive background spotlight that follows the cursor
// Updates CSS variables used in assets/styles.css (body::before)
// Important: some stylesheets define the variables on <body>, others on :root.
// To keep it robust, we update BOTH.

(function () {
  const root = document.documentElement;
  let raf = 0;
  let x = window.innerWidth * 0.5;
  let y = window.innerHeight * 0.35;

  function apply() {
    raf = 0;
    // Update on :root
    root.style.setProperty('--cursor-x', `${x}px`);
    root.style.setProperty('--cursor-y', `${y}px`);

    // Update on body (in case variables are declared there)
    if (document.body) {
      document.body.style.setProperty('--cursor-x', `${x}px`);
      document.body.style.setProperty('--cursor-y', `${y}px`);
    }
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(apply);
  }

  function setFromEvent(e) {
    if (e.touches && e.touches.length) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    schedule();
  }

  window.addEventListener('mousemove', setFromEvent, { passive: true });
  window.addEventListener('touchmove', setFromEvent, { passive: true });

  // Set initial position so the glow is visible before moving the mouse
  apply();
})();
