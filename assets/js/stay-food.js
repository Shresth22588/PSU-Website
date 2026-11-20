/* PSU – Stay section effects + Ahara (food therapy) interactions */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- STAY: fireflies, video play/pause, 3D tilt ---------- */
  var stay = $('.w-stay');
  if (stay) {
    var fx = $('.st-fx', stay), vid = $('.st-vid', stay);
    if (fx && !rm) {
      for (var i = 0; i < 18; i++) {
        var f = document.createElement('i');
        f.style.cssText = 'left:' + (Math.random() * 100).toFixed(1) + '%;--s:' + (5 + Math.random() * 9).toFixed(1) +
          'px;--d:' + (11 + Math.random() * 12).toFixed(1) + 's;--dl:-' + (Math.random() * 20).toFixed(1) +
          's;--x:' + ((Math.random() * 80) - 40).toFixed(0) + 'px';
        fx.appendChild(f);
      }
    }
    if (vid) {
      vid.muted = true;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          var p;
          if (en[0].isIntersecting) { p = vid.play(); if (p && p.catch) p.catch(function () {}); }
          else vid.pause();
        }, { threshold: 0.05 }).observe(stay);
      }
      if (rm) vid.pause();
    }
    if (fine && !rm) {
      $$('.st-c', stay).forEach(function (c) {
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          c.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
          c.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg');
        });
        c.addEventListener('pointerleave', function () {
          c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg');
        });
      });
    }
  }

  /* ---------- AHARA: six rasas ---------- */
  var card = $('#fd-card'), sw = $('#fd-sw'), stage = $('#fd-stage');
  if (!card || !sw || !stage) return;

  var D = {
    madhura: { n: 'Madhura', e: 'Sweet', c: '#e0a63a', l: 'Grounding and nourishing, the taste of strength and comfort.',
      f: ['Rice', 'Ghee', 'Dates', 'Milk', 'Sweet potato'], b: 'Traditionally calms <b>Vata &amp; Pitta</b>. Best taken in moderation by Kapha.' },
    amla: { n: 'Amla', e: 'Sour', c: '#2f9b74', l: 'Awakens appetite and brings brightness to a heavy meal.',
      f: ['Amla', 'Lemon', 'Curd', 'Tamarind', 'Pomegranate'], b: 'Traditionally calms <b>Vata</b>. Pitta does well with less of it.' },
    lavana: { n: 'Lavana', e: 'Salty', c: '#3b8fc2', l: 'Brings depth and flavour, and supports digestion in small amounts.',
      f: ['Rock salt', 'Seaweed', 'Pickled ginger', 'Olives'], b: 'Traditionally calms <b>Vata</b>. Keep it light for Pitta and Kapha.' },
    katu: { n: 'Katu', e: 'Pungent', c: '#d9573a', l: 'Kindles agni, the digestive fire, and clears a sluggish feeling.',
      f: ['Ginger', 'Black pepper', 'Mustard', 'Garlic', 'Cumin'], b: 'Traditionally calms <b>Kapha</b>. Pitta and Vata prefer it mild.' },
    tikta: { n: 'Tikta', e: 'Bitter', c: '#14634b', l: 'Cleansing and cooling, the taste that keeps balance in check.',
      f: ['Neem', 'Bitter gourd', 'Fenugreek', 'Turmeric', 'Leafy greens'], b: 'Traditionally calms <b>Pitta &amp; Kapha</b>. Vata does well with less.' },
    kashaya: { n: 'Kashaya', e: 'Astringent', c: '#8f4fb5', l: 'Toning and drying, it brings a clean, settled finish to a meal.',
      f: ['Lentils', 'Chickpeas', 'Green banana', 'Pomegranate', 'Green tea'], b: 'Traditionally calms <b>Pitta &amp; Kapha</b>. Vata prefers it in small amounts.' }
  };
  var foodSec = document.getElementById('food');
  function drv() { return !!(window.PSU_audioDriving && window.PSU_audioDriving()); }
  var keys = Object.keys(D), btns = $$('.fd-n button', stage), cur = 0, tm = null, hold = false, inView = false, T = 4200;

  function show(i, user) {
    cur = (i + keys.length) % keys.length;
    var d = D[keys[cur]];
    btns.forEach(function (b) { b.classList.toggle('on', b.dataset.k === keys[cur]); b.setAttribute('aria-pressed', b.dataset.k === keys[cur]); });
    $$('.fd-im', stage).forEach(function (im) { im.classList.toggle('on', im.dataset.k === keys[cur]); });
    card.style.setProperty('--rc', d.c);
    stage.style.setProperty('--rc', d.c);
    sw.innerHTML = '<div class="fd-top"><h3>' + d.n + '</h3><span class="fd-en">' + d.e + '</span></div>' +
      '<p class="fd-line">' + d.l + '</p>' +
      '<div class="fd-foods">' + d.f.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
      '<p class="fd-bal">' + d.b + '</p>';
    card.classList.remove('run'); void card.offsetWidth;
    if (foodSec) foodSec.setAttribute('data-cur', cur);
    if (!rm && !hold && !drv()) { card.style.setProperty('--t', T + 'ms'); card.classList.add('run'); }
    if (user) restart();
  }
  function restart() {
    clearTimeout(tm);
    if (rm || hold || !inView) return;
    tm = setTimeout(function () { if (!drv()) show(cur + 1); restart(); }, T);
  }

  btns.forEach(function (b, i) {
    b.addEventListener('click', function () { show(i, true); });
  });
  /* keep nodes on a circle that matches the stage size */
  function fit() {
    var w = stage.clientWidth, r = Math.round(w * (w < 420 ? 0.385 : 0.435));
    var nd = Math.max(54, Math.min(84, Math.round(w * (w < 420 ? 0.18 : 0.155))));
    stage.style.setProperty('--R', (-r) + 'px');
    stage.style.setProperty('--nd', nd + 'px');
    stage.style.setProperty('--nf', (nd * 0.133).toFixed(1) + 'px');
  }
  fit(); addEventListener('resize', fit);

  /* hooks used by section-audio.js: the voice drives the taste cycle */
  var eq = document.createElement('span'); eq.className = 'th-eq'; eq.setAttribute('aria-hidden', 'true'); eq.innerHTML = '<s></s><s></s><s></s>'; card.appendChild(eq);
  window.PSU_rasa = {
    count: keys.length,
    cur: function () { return cur; },
    show: function (i) { show(i); },
    next: function () { show(cur + 1); },
    bar: function (ms) { if (rm) return; card.classList.remove('run'); void card.offsetWidth; card.style.setProperty('--t', ms + 'ms'); card.classList.add('run'); }
  };

  show(0);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting;
      if (inView) restart(); else clearTimeout(tm);
    }, { threshold: 0.25 }).observe($('.w-food .fd') || stage);
  } else { inView = true; restart(); }
})();

/* ---------- JOURNEY: auto-playing expanding panels ---------- */
(function () {
  var row = document.getElementById('jy');
  if (!row) return;
  var ps = [].slice.call(row.querySelectorAll('.jy-p')), cur = 0, tm = null, inView = false, T = 6000;
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  function go(i) {
    cur = (i + ps.length) % ps.length;
    ps.forEach(function (p, k) { p.classList.toggle('on', k === cur); p.setAttribute('aria-expanded', k === cur); });
    row.classList.remove('run'); void row.offsetWidth;
    if (!rm && inView) { row.style.setProperty('--t', T + 'ms'); row.classList.add('run'); }
  }
  function loop() { clearTimeout(tm); if (rm || !inView) return; tm = setTimeout(function () { go(cur + 1); loop(); }, T); }
  ps.forEach(function (p, k) {
    p.addEventListener('click', function (e) { if (e.target.closest('a')) return; go(k); loop(); });
    p.addEventListener('focus', function () { go(k); loop(); });
    p.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches && cur !== k) { go(k); loop(); } });
  });
  go(0);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting;
      if (inView) { go(cur); loop(); } else { clearTimeout(tm); row.classList.remove('run'); }
    }, { threshold: 0.35 }).observe(row);
  } else { inView = true; loop(); }
})();
