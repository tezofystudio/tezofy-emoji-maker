/* =========================================================================
   Tezofy Emoji Maker — extras.js (v4)
   UI layer: 3D tilt, parallax starfield, scroll reveal, ripple,
   smart mobile nav, lazy image loading.  কোনো core ফিচার ছোঁয়া হয় না —
   সবই শুধু UI/অভিজ্ঞতার স্তর, এবং কিছু না চললেও সাইট আগের মতোই কাজ করবে।
   ========================================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch  = window.matchMedia && matchMedia('(hover: none), (pointer: coarse)').matches;
  var $  = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  /* ---------------------------------------------------------------- 1.
     Sticky header — scroll হলে ছোট ও গভীর ছায়া
  ------------------------------------------------------------------ */
  var topbar = $('.topbar');
  var lastY = window.scrollY || 0;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (topbar) topbar.classList.toggle('scrolled', y > 10);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------- 2.
     Mobile nav — ট্যাপ করা ট্যাব নিজে থেকে মাঝখানে সরে আসে
  ------------------------------------------------------------------ */
  var tabsBox = $('.tabs');
  function centerTab(el) {
    if (!tabsBox || !el) return;
    var r = el.getBoundingClientRect(), b = tabsBox.getBoundingClientRect();
    if (tabsBox.scrollWidth <= tabsBox.clientWidth + 4) return;   // স্ক্রল লাগে না
    if (r.left >= b.left - 2 && r.right <= b.right + 2) return;   // আগেই পুরো দেখা যাচ্ছে
    tabsBox.scrollTo({
      left: tabsBox.scrollLeft + (r.left - b.left) - (b.width - r.width) / 2,
      behavior: reduce ? 'auto' : 'smooth'
    });
  }
  if (tabsBox) {
    tabsBox.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.tab');
      if (t) setTimeout(function () { centerTab(t); }, 30);
    });
    window.addEventListener('resize', function () {
      var a = tabsBox.querySelector('.tab.active');
      centerTab(a);
    }, { passive: true });
    setTimeout(function () { centerTab(tabsBox.querySelector('.tab.active')); }, 120);
  }

  /* ---------------------------------------------------------------- 3.
     3D tilt — কার্ড/স্ট্যাট/প্যাক কার্ডে পয়েন্টার-অনুসরণ
     (dynamically re-rendered কার্ডেও কাজ করে — event delegation)
  ------------------------------------------------------------------ */
  var tiltSel = '.fcard, .pcard, .stat';
  var cur = null, rafId = 0, pendingEv = null;

  function applyTilt() {
    rafId = 0;
    if (!cur || !pendingEv) return;
    var e = pendingEv;
    var r = cur.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    var py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    cur.style.setProperty('--ry', ((px - 0.5) * 15).toFixed(2) + 'deg');
    cur.style.setProperty('--rx', ((0.5 - py) * 13).toFixed(2) + 'deg');
    cur.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    cur.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  }
  function clearTilt() {
    if (cur) {
      cur.classList.remove('tilt');
      cur.style.removeProperty('--rx'); cur.style.removeProperty('--ry');
    }
    cur = null; pendingEv = null;
  }
  if (!touch && !reduce) {
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var card = e.target && e.target.closest ? e.target.closest(tiltSel) : null;
      if (card !== cur) {
        if (cur) cur.classList.remove('tilt');
        cur = card;
        if (card) card.classList.add('tilt');
      }
      if (!cur) return;
      pendingEv = e;
      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    }, { passive: true });
    document.addEventListener('pointerleave', clearTilt);
    window.addEventListener('blur', clearTilt);
    document.addEventListener('scroll', function () { if (cur && !pendingEv) clearTilt(); }, { passive: true });
  }

  /* ---------------------------------------------------------------- 4.
     হিরো — পয়েন্টারের সাথে floaties-এর 3D নড়াচড়া
  ------------------------------------------------------------------ */
  var hero = $('.hero'), floaties = $('.hero-floaties');
  if (hero && floaties && !touch && !reduce) {
    floaties.classList.add('nudge');
    var heroRaf = 0, hx = 0, hy = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      hy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (heroRaf) return;
      heroRaf = requestAnimationFrame(function () {
        heroRaf = 0;
        floaties.style.setProperty('--px', hx.toFixed(3));
        floaties.style.setProperty('--py', hy.toFixed(3));
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', function () {
      floaties.style.setProperty('--px', '0');
      floaties.style.setProperty('--py', '0');
    });
  }

  /* ---------------------------------------------------------------- 5.
     Scroll reveal — কার্ডগুলো ধীরে ধীরে "উঠে আসে"
     নিরাপত্তা: কোনো কারণে observer না চললে ৩ সেকেন্ড পরে সব দেখানো হবে
  ------------------------------------------------------------------ */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;

  function registerReveal() {
    if (reduce) return;
    $$('.fcard, .stat, .pcard, .cgroup').forEach(function (el) {
      if (el.dataset.rv) return;
      el.dataset.rv = '1';
      el.classList.add('reveal');
      if (io) io.observe(el); else el.classList.add('in');
    });
  }
  if (!reduce) {
    registerReveal();
    setTimeout(registerReveal, 400);
    setTimeout(registerReveal, 1400);
    setTimeout(function () {                                   // safety net
      $$('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 2600);
    /* ভাষা বদলালে / ফিল্টার করলে কার্ডগুলো আবার তৈরি হয় → আবার রেজিস্টার */
    var mo = new MutationObserver(function () {
      clearTimeout(registerReveal._t);
      registerReveal._t = setTimeout(registerReveal, 120);
    });
    ['#featureGrid', '#packGrid', '#mineGrid'].forEach(function (s) {
      var g = $(s); if (g) mo.observe(g, { childList: true });
    });
  }

  /* ---------------------------------------------------------------- 6.
     বাটনে রিপল (3D প্রেস-ফিল)
  ------------------------------------------------------------------ */
  document.addEventListener('pointerdown', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.btn') : null;
    if (!btn || reduce) return;
    var r = btn.getBoundingClientRect();
    var sp = document.createElement('span');
    sp.className = 'ripple';
    sp.style.left = (e.clientX - r.left) + 'px';
    sp.style.top  = (e.clientY - r.top)  + 'px';
    btn.appendChild(sp);
    setTimeout(function () { sp.remove(); }, 620);
  }, { passive: true });

  /* ---------------------------------------------------------------- 7.
     ব্যাকগ্রাউন্ড: 3D পার্টিকেল/তারা ফিল্ড (canvas)
  ------------------------------------------------------------------ */
  (function bgFx() {
    if (reduce) return;
    var c = document.createElement('canvas');
    c.id = 'bgFx';
    c.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(c, document.body.firstChild);
    var x = c.getContext('2d');
    if (!x) return;

    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    var EMS = ['😄', '⭐', '✨', '❤️', '🎬', '🤖', '💖', '🌟'];
    var parts = [], running = true;

    function resize() {
      W = c.width  = Math.floor(innerWidth  * dpr);
      H = c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      var small = innerWidth < 700;
      var n = small ? 16 : (innerWidth < 1100 ? 30 : 44);
      parts = [];
      for (var i = 0; i < n; i++) {
        var isEmoji = i % 5 === 0;
        parts.push({
          e: isEmoji,
          g: EMS[(Math.random() * EMS.length) | 0],
          x: Math.random() * W,
          y: Math.random() * H,
          z: 0.25 + Math.random() * 0.75,                 // depth
          s: (isEmoji ? 16 + Math.random() * 16 : 1 + Math.random() * 2.2) * dpr,
          a: isEmoji ? 0.10 + Math.random() * 0.12 : 0.18 + Math.random() * 0.4,
          vy: (0.06 + Math.random() * 0.22) * dpr,
          vx: (Math.random() - 0.5) * 0.12 * dpr,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.004
        });
      }
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function frame() {
      if (!running) return;
      x.clearRect(0, 0, W, H);
      var sc = (window.scrollY || 0) * dpr * 0.06;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.x += p.vx; p.rot += p.vr;
        if (p.y < -40) { p.y = H + 30; p.x = Math.random() * W; }
        if (p.x < -40) p.x = W + 30; else if (p.x > W + 40) p.x = -30;
        var yy = p.y + sc * p.z * 0.35;
        yy = ((yy % (H + 80)) + H + 80) % (H + 80) - 40;
        x.globalAlpha = p.a * (0.45 + p.z * 0.55);
        if (p.e) {
          x.save();
          x.translate(p.x, yy);
          x.rotate(Math.sin(p.rot) * 0.35);
          x.font = Math.round(p.s) + 'px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillText(p.g, 0, 0);
          x.restore();
        } else {
          x.beginPath();
          x.arc(p.x, yy, p.s, 0, 6.2832);
          x.fillStyle = p.z > 0.7 ? '#ffe9f3' : (p.z > 0.45 ? '#c9b8ff' : '#7ff0e0');
          x.fill();
        }
      }
      x.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { running = false; }
      else if (!running) { running = true; requestAnimationFrame(frame); }
    });
  })();

  /* ---------------------------------------------------------------- 8.
     পারফরম্যান্স: প্যাক/সংগ্রহের ছবিগুলো lazy + async
  ------------------------------------------------------------------ */
  function lazyImgs(root) {
    (root || document).querySelectorAll('img:not([loading])').forEach(function (im) {
      im.loading = 'lazy';
      im.decoding = 'async';
    });
  }
  lazyImgs();
  try {
    var imo = new MutationObserver(function () { lazyImgs(); });
    ['#packGrid', '#mineGrid'].forEach(function (s) {
      var g = $(s); if (g) imo.observe(g, { childList: true, subtree: true });
    });
  } catch (e) { /* পুরোনো ব্রাউজার — সমস্যা নেই */ }

  /* ---------------------------------------------------------------- 9.
     iOS/Android: ফিক্সড উচ্চতা সমস্যা (মোবাইল ব্রাউজার বার) মেটানো
  ------------------------------------------------------------------ */
  function vhFix() {
    document.documentElement.style.setProperty('--vh', (innerHeight * 0.01) + 'px');
  }
  vhFix();
  window.addEventListener('resize', vhFix, { passive: true });
  window.addEventListener('orientationchange', function () { setTimeout(vhFix, 250); });

  /* ---------------------------------------------------------------- 10.
     ছোট বাগফিক্স: 2D/3D/5D সুইচে শুরুতেই ভুল বাটন হাইলাইট থাকত
     (স্টেট ছিল 3D, কিন্তু "2D" হাইলাইট দেখাত)। এখন স্টেটই আসল।
  ------------------------------------------------------------------ */
  try {
    var st = (typeof state !== 'undefined') ? state : null;
    var sBtn = document.querySelector('.style-btn[data-style="' + (st && st.style) + '"]');
    if (st && st.style && sBtn) {
      $$('.style-btn').forEach(function (b) { b.classList.toggle('active', b === sBtn); });
    }
  } catch (e) { /* কিছু না — আগের মতোই চলবে */ }
})();
