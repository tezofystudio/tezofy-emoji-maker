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
/* =========================================================================
   Tezofy Emoji Maker — extras.js  PART-2
   STUDIO APP SHELL  (ফোন-অ্যাপ স্টাইল এডিটিং UI)
   ------------------------------------------------------------------------
   builder / image / lab / css — এই ৪টি স্টুডিওর বিদ্যমান এলিমেন্টগুলোই
   নতুন অ্যাপ-ফ্রেমে সাজানো হয়: মাঝখানে প্রিভিউ, উপরে টুল টাইল, নিচে
   অ্যাকশন ডক, টুল চাপলে 3D পপআপ শিট (bottom-sheet)।
   ✅ app.js-এর কোনো কোড/হ্যান্ডলার ভাঙে না — শুধু DOM নোড নতুন জায়গায় যায়।
   ========================================================================= */
(function () {
  'use strict';

  /* ---- ছোট হেল্পার ---- */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function lang() { return (typeof LANG !== 'undefined' && LANG === 'en') ? 'en' : 'bn'; }
  function L(bn, en) { return lang() === 'bn' ? bn : en; }

  /* h4/লেবেল থেকে শিরোনাম চেরা: প্রথম ইমোজি → আইকন, বাকিটা → নাম */
  function splitIcon(text) {
    var t = (text || '').replace(/\s+/g, ' ').trim();
    if (!t) return { icon: '🔧', label: '' };
    var seg = Array.from(t)[0] || '🔧';
    try {
      if (window.Intl && Intl.Segmenter) {
        var it = new Intl.Segmenter(lang() === 'bn' ? 'bn' : 'en', { granularity: 'grapheme' }).segment(t)[Symbol.iterator]().next();
        if (!it.done && it.value && it.value.segment) seg = it.value.segment;
      } else if (Array.from(t)[1] && /[\uFE0F\u200D\u20E3]/.test(Array.from(t)[1])) {
        seg = t.slice(0, 2);
      }
    } catch (e) { /* fallback */ }
    var code = seg.codePointAt(0) || 0;
    if (code < 0x2000) return { icon: '🔧', label: t };     // ইমোজি নয় → জেনেরিক আইকন
    var rest = t.slice(seg.length).trim();
    return { icon: seg, label: rest || seg };
  }

  /* ==================== ১. কোন ট্যাবে কী হবে ==================== */
  var PANELS = ['builder', 'image', 'lab', 'css'];
  var built = {};                 // id → {frame, items:[], ...}
  var currentTab = 'home';
  var openSheet = null;

  /* ==================== ২. শিট (পপআপ) তৈরি ==================== */
  function makeSheet(item, frame) {
    var wrap = el('div', 'sheetwrap' + (item.short ? ' short' : ''));
    wrap.innerHTML =
      '<div class="sheet-backdrop"></div>' +
      '<div class="sheet" role="dialog" aria-modal="true">' +
        '<div class="sheet-grab"></div>' +
        '<div class="sheet-head"><span class="sh-ico"></span><h4></h4>' +
        '<button class="sheet-x" type="button" aria-label="বন্ধ">✕</button></div>' +
        '<div class="sheet-body"></div>' +
      '</div>';
    var body = $('.sheet-body', wrap);

    if (item.node) {
      item.node.classList.remove('reveal');
      item.node.classList.add('in');
      if (item.node.classList.contains('cgroup')) item.node.dataset.rv = '1';
      body.appendChild(item.node);
    }
    if (item.extra) body.appendChild(item.extra);

    frame.appendChild(wrap);
    item.wrap = wrap;
    item.body = body;
    item.h4 = $('.sheet-head h4', wrap);      /* শিটের শিরোনাম এখানে বসে */

    var sheetEl = $('.sheet', wrap);
    $('.sheet-x', wrap).addEventListener('click', function () { closeSheet(); });
    $('.sheet-backdrop', wrap).addEventListener('click', function () { closeSheet(); });

    /* ড্র্যাগ করে নিচে নামালে বন্ধ */
    var grab = $('.sheet-grab', wrap), startY = 0, dy = 0, active = false;
    grab.addEventListener('pointerdown', function (e) {
      active = true; startY = e.clientY; dy = 0;
      sheetEl.classList.add('dragging'); grab.setPointerCapture(e.pointerId);
    });
    grab.addEventListener('pointermove', function (e) {
      if (!active) return;
      dy = Math.max(0, e.clientY - startY);
      sheetEl.style.transform = 'translateY(' + dy + 'px)';
    });
    function endDrag() {
      if (!active) return;
      active = false; sheetEl.classList.remove('dragging');
      sheetEl.style.transform = '';
      if (dy > Math.min(150, sheetEl.offsetHeight * 0.32)) closeSheet();
    }
    grab.addEventListener('pointerup', endDrag);
    grab.addEventListener('pointercancel', endDrag);
    return item;
  }

  function makeToolButton(item, frame, toolbar) {
    var b = el('button', 'tbtn');
    b.type = 'button';
    b.innerHTML = '<span class="ti"></span><span class="tl"></span>';
    b.addEventListener('click', function () {
      if (openSheet === item) { closeSheet(); return; }
      openSheetFor(item, frame);
      try { b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {}
    });
    toolbar.appendChild(b);
    item.btn = b;
    refreshTitle(item);
    return item;
  }

  function refreshTitle(item) {
    var icon = item.icon, label = item.label;
    if (item.titleNode) {
      var sp = splitIcon(item.titleNode.textContent || '');
      icon = sp.icon; label = sp.label;
    } else if (item.labels) {
      label = L(item.labels.bn, item.labels.en);
    }
    if (!item.btn) return;
    $('.ti', item.btn).textContent = icon;
    $('.tl', item.btn).textContent = label;
    if (item.h4) item.h4.textContent = label;
    var ico = $('.sh-ico', item.wrap);
    if (ico) ico.textContent = icon;
  }

  /* ==================== ৩. শিট খোলা/বন্ধ ==================== */
  function openSheetFor(item, frame) {
    if (openSheet && openSheet !== item) closeSheet();
    item.wrap.classList.add('open');
    frame.classList.add('sheet-open');
    if (item.btn) item.btn.classList.add('on');
    openSheet = item;
    if (item.onOpen) try { item.onOpen(); } catch (e) {}
  }
  function closeSheet() {
    if (!openSheet) return;
    openSheet.wrap.classList.remove('open');
    if (openSheet.btn) openSheet.btn.classList.remove('on');
    var f = openSheet.frame;
    if (f) f.classList.remove('sheet-open');
    openSheet = null;
    requestAnimationFrame(layoutAll);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });

  /* ==================== ৪. ফ্রেম + টুলবার + স্টেজ + ডক ==================== */
  function newFrame(panel) {
    var frame = el('div', 'app-frame');
    var toolbar = el('div', 'app-toolbar');
    var stage = el('div', 'app-stage');
    stage.innerHTML = '<div class="floor"></div><div class="halo"></div><div class="stage-inner"></div>';
    var dock = el('div', 'app-dock');
    frame.appendChild(toolbar);
    frame.appendChild(stage);
    frame.appendChild(dock);
    panel.appendChild(frame);
    return {
      panel: panel, frame: frame, toolbar: toolbar, dock: dock,
      stage: stage, inner: $('.stage-inner', stage), items: [], barRow: null
    };
  }

  function moveToStage(host, node) {
    if (!node) return;
    node.classList.remove('reveal');
    host.inner.appendChild(node);
  }

  function fillDock(host, row) {
    host.barRow = row;
    host.dock.appendChild(row);
    row.classList.remove('row', 'wrap');
    row.classList.add('dock-row');
  }

  /* ---------- ℹ️ সহায়িকা শিট (প্রতিটি ট্যাবে) ---------- */
  var HELP = {
    builder: {
      bn: '🎲 র‍্যান্ডম → রঙ ও সব আকৃতি একসাথে বদলায়। 💾 সেভ → "আমার সংগ্রহ"-তে জমা থাকে। 🎬 অ্যানিমেট → ইমোজিটা নিয়ে সোজা অ্যানিমেশন ল্যাবে যায়। উপরের 2D/3D/5D সুইচ দিয়ে প্রিভিউর স্টাইল বদলান, তারপর PNজি ডাউনলোড।',
      en: '🎲 Random changes color + all shapes at once. 💾 Save stores it in "My Collection". 🎬 Animate sends your emoji straight to the Animation Lab. Use the 2D/3D/5D switch above the preview, then download PNG.'
    },
    image: {
      bn: 'ছবি টেনে আনুন বা ক্লিক করে বাছুন — সব প্রসেসিং আপনার ব্রাউজারেই হয়, কোথাও আপলোড হয় না। টেক্সট মোডে বাংলা লেখাও যাবে। 3D/5D দিলে ডেপথ-এক্সট্রুশন হয়।',
      en: 'Drop an image or tap to choose — everything is processed in your browser, nothing is uploaded. Text mode supports Bengali too. Pick 3D/5D for depth extrusion.'
    },
    lab: {
      bn: 'উপরের টুল থেকে অ্যানিমেশন বাছুন, তারপর নিচের ডক থেকে GIF / WebM / PNG নামান। ডিসকর্ড-টুইচ সাইজ বেছে নিলে লিমিট নিজে মেনে নেবে। লেয়ার এডিটরে ইমোজি সাজিয়ে স্ক্রিনে টেনে বসাতে পারবেন।',
      en: 'Pick an animation from the toolbar, then use the dock to export GIF / WebM / PNG. Platform presets respect size limits automatically. The Layer Editor lets you stack emojis and drag them on screen.'
    },
    css: {
      bn: 'ইমোজি বাছুন, অ্যানিমেশন ও ইফেক্ট দিন — নিচের ডকে "HTML ফাইল" চাপলে কপি-পেস্ট করার মতো রেডি কোড পাবেন। ব্যাজ মেকার দিয়ে সাইট বা রিডমির জন্য সুন্দর ব্যাজ বানান।',
      en: 'Pick an emoji, add animation and effects — press "HTML file" in the dock for ready-to-paste code. Use the Badge maker to build a nice badge for your site or README.'
    }
  };
  function addInfoTool(host, panel) {
    var node = el('div', 'info-sheet');
    var head = $(':scope > .pack-head', panel);
    if (head) {
      var h2 = $('h2', head), desc = $('p', head);
      if (h2) node.appendChild(h2);
      if (desc) node.appendChild(desc);
    }
    var txt = HELP[host.panel.id.replace('tab-', '')];
    if (txt) node.appendChild(el('p', 'hint', L(txt.bn, txt.en)));
    if (!node.childNodes.length) return;
    var it = { node: node, icon: 'ℹ️', labels: { bn: 'সহায়িকা', en: 'Help' }, frame: host.frame };
    makeSheet(it, host.frame);
    makeToolButton(it, host.frame, host.toolbar);
    host.items.push(it);
  }

  /* ==================== ৫. ট্যাব-ভিত্তিক সাজসজ্জা ==================== */

  /* ---------- 🎨 বিল্ডার (কন্ট্রোল কলাম ডাইনামিক → পুনরায় বিতরণ হয়) ---------- */
  function buildBuilder(host) {
    var panel = host.panel, pcol = $('.preview-col', panel);

    /* AI স্টুডিও বক্স → শিট */
    var studio = $('#tab-builder > .studio');
    if (studio) {
      var stItem = { node: studio, icon: '🧠', labels: { bn: 'AI স্টুডিও', en: 'AI Studio' }, frame: host.frame };
      makeSheet(stItem, host.frame);
      makeToolButton(stItem, host.frame, host.toolbar);
      host.items.push(stItem);
    }

    /* স্টেজ: 2D/3D/5D সুইচ + প্রিভিউ */
    moveToStage(host, $('.style-switch', pcol));
    moveToStage(host, $('.preview-box', pcol));

    /* অ্যাকশন রো → ডক, ভেতরের সাইজ-সিলেক্ট → শিট */
    var row = $('.row.wrap', pcol);
    if (row) {
      $$('.mini', row).forEach(function (mini) {
        var it = { node: mini, icon: '📐', labels: { bn: 'সাইজ', en: 'Size' }, frame: host.frame };
        makeSheet(it, host.frame);
        makeToolButton(it, host.frame, host.toolbar);
        host.items.push(it);
      });
      fillDock(host, row);
    }

    /* ডাইনামিক কন্ট্রোল গ্রুপগুলো → এক-একটি টুল শিট */
    var box = $('#builderControls');
    host.dynamicBox = box;
    distributeBuilder(host);
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { distributeBuilder(host); return; }
      }
    });
    mo.observe(box, { childList: true });
    addInfoTool(host, panel);
  }

  function distributeBuilder(host) {
    var groups = $$('#builderControls > .cgroup');
    if (!groups.length) return;
    /* সংখ্যা বদলালে নতুন করে টুল বানাই */
    if (host.items.filter(function (i) { return i.dynamic; }).length !== groups.length) {
      host.items.filter(function (i) { return i.dynamic; }).forEach(function (i) {
        if (i.btn) i.btn.remove();
        if (i.wrap) i.wrap.remove();
      });
      host.items = host.items.filter(function (i) { return !i.dynamic; });
      groups.forEach(function (g) {
        var h4 = $('h4', g) || g;
        var it = { node: g, titleNode: h4, dynamic: true, frame: host.frame };
        host.items.push(it);
        makeSheet(it, host.frame);
        makeToolButton(it, host.frame, host.toolbar);
      });
    } else {
      var k = 0;
      host.items.forEach(function (it) {
        if (!it.dynamic) return;
        var g = groups[k++];
        it.node = g;
        it.titleNode = $('h4', g) || g;
        it.body.appendChild(g);
        g.classList.remove('reveal');
        refreshTitle(it);
      });
    }
    layoutAll();
  }

  /* ---------- 🧪 ইমোজি স্টুডিও (ছবি → ইমোজি) ---------- */
  function buildImage(host) {
    var panel = host.panel, pcol = $('.preview-col', panel);

    moveToStage(host, $('#dropZone'));
    moveToStage(host, $('#imgPreviewWrap'));
    var base = $(':scope > .cgroup', pcol);
    if (base) {
      var it = { node: base, icon: '🙃', labels: { bn: 'বেস ইমোজি', en: 'Base emoji' }, frame: host.frame };
      makeSheet(it, host.frame);
      makeToolButton(it, host.frame, host.toolbar);
      host.items.push(it);
    }
    /* কন্ট্রোল কলামের সব গ্রুপ → টুল শিট */
    $$('.controls-col > .cgroup', panel).forEach(function (g) {
      var item = { node: g, titleNode: $('h4', g) || g, frame: host.frame };
      makeSheet(item, host.frame);
      makeToolButton(item, host.frame, host.toolbar);
      host.items.push(item);
      mirrorHidden(g, item);            // #textGroup লুকানো থাকলে বাটনও লুকায়
    });

    /* অ্যাকশন রো → ডক (+ শুরুর হিন্ট) */
    var row = $('#imgActions');
    if (row) {
      var hint = el('span', 'dock-hint', L('📷 আগে ছবি বা বেস ইমোজি বাছো', '📷 Pick an image or base emoji first'));
      host.dock.appendChild(hint);
      host.dockHint = hint;
      fillDock(host, row);
      syncImgDock(host);
      var mo = new MutationObserver(function () { syncImgDock(host); });
      mo.observe(row, { attributes: true, attributeFilter: ['hidden'] });
      var wrapEl = $('#imgPreviewWrap');
      if (wrapEl) {
        var mo2 = new MutationObserver(function () { syncImgStage(host); });
        mo2.observe(wrapEl, { attributes: true, attributeFilter: ['hidden'] });
        syncImgStage(host);
      }
    }
    addInfoTool(host, panel);
    layoutAll();
  }
  function syncImgDock(host) {
    var row = host.barRow, hidden = !row || row.hasAttribute('hidden');
    host.dock.dataset.empty = hidden ? '1' : '0';
    if (host.dockHint) host.dockHint.style.display = hidden ? 'flex' : 'none';
  }
  function syncImgStage(host) {
    var wrapEl = $('#imgPreviewWrap'), dz = $('#dropZone');
    if (!wrapEl || !dz) return;
    var has = !wrapEl.hasAttribute('hidden');
    dz.style.display = has ? 'none' : '';
  }
  function mirrorHidden(node, item) {
    function upd() {
      var h = node.hasAttribute('hidden') || node.style.display === 'none';
      if (item.btn) item.btn.hidden = h;
    }
    upd();
    new MutationObserver(upd).observe(node, { attributes: true, attributeFilter: ['hidden', 'style'] });
  }

  /* ---------- 🎬 অ্যানিমেশন ল্যাব ---------- */
  function buildLab(host) {
    var panel = host.panel, pcol = $('.preview-col', panel);
    moveToStage(host, $('.lab-stage', panel));

    var rows = $$(':scope > .row.wrap', pcol);
    if (rows[0]) fillDock(host, rows[0]);
    var extras = el('div');
    if (rows[1]) extras.appendChild(rows[1]);
    var hint = $(':scope > p.hint', pcol);
    if (hint) extras.appendChild(hint);
    if (extras.childNodes.length) {
      var it2 = { node: extras, icon: '⚙️', labels: { bn: 'প্ল্যাটফর্ম ও সেটিংস', en: 'Platform & settings' }, frame: host.frame };
      makeSheet(it2, host.frame);
      makeToolButton(it2, host.frame, host.toolbar);
      host.items.push(it2);
    }
    $$('.controls-col > .cgroup', panel).forEach(function (g) {
      var item = { node: g, titleNode: $('h4', g) || g, frame: host.frame };
      if (g.id === 'layerEditorBox') item.short = true;     // ক্যানভাস দেখা যাবে
      makeSheet(item, host.frame);
      makeToolButton(item, host.frame, host.toolbar);
      host.items.push(item);
      var obs = new MutationObserver(function () { refreshTitle(item); });
      obs.observe(g, { childList: true });                  // renderLayerPanel আবার লেখে
      refreshTitle(item);
    });
    addInfoTool(host, panel);
    layoutAll();
  }

  /* ---------- ⚡ CSS স্টুডিও ---------- */
  function buildCss(host) {
    var panel = host.panel, pcol = $('.preview-col', panel);

    /* স্টেজ = কালার-চেকার প্লাস্টিক বোর্ড */
    var cs = $('#csStage');
    if (cs) {
      cs.classList.add('checker');
      moveToStage(host, cs);
    }
    /* ইমোজি বাছাই গ্রুপ (আপলোড বাটনহীন অংশসহ) → টুল শিট */
    var picker = $(':scope > .cgroup', pcol);
    if (picker) {
      var it = { node: picker, titleNode: $('h4', picker) || picker, frame: host.frame };
      makeSheet(it, host.frame);
      makeToolButton(it, host.frame, host.toolbar);
      host.items.push(it);
    }
    /* কন্ট্রোল কলামের সব গ্রুপ */
    $$('.controls-col > .cgroup', panel).forEach(function (g) {
      var item = { node: g, titleNode: $('h4', g) || g, frame: host.frame };
      makeSheet(item, host.frame);
      makeToolButton(item, host.frame, host.toolbar);
      host.items.push(item);
    });
    /* ব্যাজ জেনারেটর → টুল শিট */
    var badge = $('#tab-css > .badge-box');
    if (badge) {
      var ib = { node: badge, titleNode: $('h4', badge) || badge, frame: host.frame };
      makeSheet(ib, host.frame);
      makeToolButton(ib, host.frame, host.toolbar);
      host.items.push(ib);
    }
    var row = $(':scope > .row.wrap', pcol);
    if (row) fillDock(host, row);

    /* #csStage-এর ভেতরটা csUpdate() আবার আঁকে → স্কেল ঠিক রাখি */
    if (cs) {
      var mo = new MutationObserver(function () { requestAnimationFrame(fitCss); });
      mo.observe(cs, { childList: true, subtree: true });
      requestAnimationFrame(fitCss);
    }
    addInfoTool(host, panel);
    layoutAll();
  }

  /* স্টেজে ফিট না হলে ek-wrap ছোট করি */
  function fitCss() {
    var st = $('#csStage'), w = $('#csStage .ek-wrap');
    if (!st || !w) return;
    var r = st.getBoundingClientRect();
    if (r.height < 40) return;
    w.style.transform = 'scale(1)';
    var n = w.getBoundingClientRect();
    var s = Math.min(1, (r.height - 34) / Math.max(1, n.height), (r.width - 30) / Math.max(1, n.width));
    w.style.transform = 'scale(' + Math.max(0.42, Math.min(1, s)).toFixed(3) + ')';
  }

  /* ==================== ৬. বিল্ড + লেআউট ==================== */
  function build(id) {
    if (built[id]) return built[id];
    var panel = document.getElementById('tab-' + id);
    if (!panel) return null;
    var host = newFrame(panel);
    built[id] = host;
    try {
      if (id === 'builder') buildBuilder(host);
      else if (id === 'image') buildImage(host);
      else if (id === 'lab') buildLab(host);
      else if (id === 'css') buildCss(host);
    } catch (e) {
      if (window.console && console.warn) console.warn('studio-shell:', id, e);
    }
    return host;
  }

  function setAppMode(name) {
    currentTab = name;
    var isApp = PANELS.indexOf(name) !== -1;
    document.body.classList.toggle('app-mode', isApp);
    if (isApp) { build(name); closeSheet(); }
    layoutAll();
  }

  function layout() {
    var body = document.body;
    if (!body.classList.contains('app-mode')) return;
    var tb = $('.topbar');
    var h = 0;
    if (tb) {
      var cs = getComputedStyle(tb);
      h = tb.offsetHeight;
      if (cs.position === 'sticky') h += 2;
    }
    var vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    var frameH = Math.max(340, vh - h - 2);
    document.documentElement.style.setProperty('--frameH', frameH + 'px');
  }
  var rafId = 0;
  function layoutAll() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () { rafId = 0; layout(); fitCss(); });
  }
  /* টপবারের উচ্চতা বদলালে (ভাষা বদল, ট্যাব র‍্যাপ, ফন্ট লোড) সাথে সাথে ফ্রেম মাপ ঠিক হয় */
  function watchTopbar() {
    var tb = document.querySelector('.topbar');
    if (!tb || !window.ResizeObserver) return;
    var last = tb.offsetHeight;
    new ResizeObserver(function () {
      var h = tb.offsetHeight;
      if (Math.abs(h - last) > 1) { last = h; layoutAll(); }
    }).observe(tb);
  }
  watchTopbar();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutAll);
  window.addEventListener('load', function () { layoutAll(); setTimeout(layoutAll, 250); });
  window.addEventListener('resize', layoutAll, { passive: true });
  window.addEventListener('orientationchange', function () { setTimeout(layoutAll, 250); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', layoutAll);

  /* ==================== ৭. app.js-এর সাথে সংযোগ ==================== */
  if (typeof window.goTab === 'function') {
    var _goTab = window.goTab;
    window.goTab = function (name) {
      var r = _goTab.apply(this, arguments);
      try { setAppMode(name); } catch (e) {}
      return r;
    };
  }
  if (typeof window.applyLang === 'function') {
    var _applyLang = window.applyLang;
    window.applyLang = function () {
      var r = _applyLang.apply(this, arguments);
      try {
        Object.keys(built).forEach(function (id) {
          built[id].items.forEach(function (it) { refreshTitle(it); });
        });
        var idx = $('#imgActions');
        var host = built.image;
        if (host && host.dockHint) host.dockHint.textContent = L('📷 আগে ছবি বা বেস ইমোজি বাছো', '📷 Pick an image or base emoji first');
      } catch (e) {}
      layoutAll();
      return r;
    };
  }

  /* শুরুতে হোমে আছি — শেলগুলো আগেভাগে বানিয়ে রাখি যাতে ট্যাপে দেরি না লাগে */
  function boot() {
    try {
      PANELS.forEach(build);
      setAppMode((document.querySelector('.panel.active') || {}).id ?
        document.querySelector('.panel.active').id.replace('tab-', '') : 'home');
    } catch (e) { if (window.console) console.warn('studio-shell boot:', e); }
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(boot, 60);
  else window.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 60); });
})();
