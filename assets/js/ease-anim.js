(function () {
  var el = document.querySelector(".ease");
  if (!el) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  el.classList.add("is-armed");

  function play() { el.classList.add("is-play"); }
  function replay() {
    el.classList.remove("is-play");
    void el.offsetWidth;               // restart CSS animations
    requestAnimationFrame(play);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { play(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
  } else {
    play();
  }
  el.addEventListener("click", function () {
    if (el.classList.contains("is-play")) replay();
  });

  /* soft 3D tilt that follows the pointer (mouse/pen only) */
  if (window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var host = el.closest(".about__left") || el;
    host.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", Math.max(-.6, Math.min(.6, x)).toFixed(3));
      el.style.setProperty("--py", Math.max(-.6, Math.min(.6, y)).toFixed(3));
    });
    host.addEventListener("pointerleave", function () {
      el.style.setProperty("--px", 0);
      el.style.setProperty("--py", 0);
    });
  }
})();
