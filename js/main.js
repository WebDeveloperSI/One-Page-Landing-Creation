/* AETHER — interactions */
(function () {
  // Starfield
  const field = document.getElementById("starfield");
  if (field) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 70; i++) {
      const s = document.createElement("span");
      s.className = "star";
      const size = Math.random() * 1.6 + 0.6;
      s.style.top = Math.random() * 100 + "%";
      s.style.left = Math.random() * 100 + "%";
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      s.style.animationDelay = (Math.random() * 4) + "s";
      frag.appendChild(s);
    }
    field.appendChild(frag);
  }

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in"));
  }

  // Cursor glow (fine pointer only)
  const glow = document.getElementById("cursorGlow");
  if (glow && !window.matchMedia("(pointer: coarse)").matches) {
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } else if (glow) {
    glow.style.display = "none";
  }
})();
