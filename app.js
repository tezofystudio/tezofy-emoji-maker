/* ============ Tezofy Emoji Maker — app.js (full bilingual edition) ============ */
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- i18n ---------- */
let LANG = 'bn';
const I18N = {
  bn: {
    logo:'Tezofy <b>Emoji Maker</b>', tab_home:'🏠 হোম', tab_builder:'🎨 বিল্ডার + AI স্টুডিও', tab_image:'📸 ছবি → ইমোজি',
    tab_lab:'🎬 অ্যানিমেশন ল্যাব', tab_css:'⚡ CSS স্টুডিও', tab_packs:'🤖 AI প্যাক', tab_mine:'💾 আমার সংগ্রহ', tab_image:'🧪 ইমোজি স্টুডিও',
    hero_t:'নিজের মতো ইমোজি বানাও,<br><span class="grad-text">২ডি • ৩ডি • ৫ডি</span> স্টাইলে!',
    hero_s:'MyEmojiMaker, Emotiyou আর MakeEmoji-এর সব ফিচার এক জায়গায় — ৮৩ অ্যানিমেশন, লেয়ার এডিটর, ⚡ CSS কোড স্টুডিও, 2D·3D·5D ফটো স্টুডিও আর ৮৭টি ইমোজি প্যাক। কোনো সাইন-আপ লাগবে না!',
    hero_c1:'🎨 বানানো শুরু করি', hero_c2:'🎬 অ্যানিমেশন ল্যাব', hero_c3:'🤖 AI প্যাক',
    st1:'ইমোজি প্যাকে', st2:'অ্যানিমেশন ইফেক্ট', st3:'ডাইমেনশন স্টাইল', st4:'কম্বিনেশন',
    studio_t:'🧠 AI স্টুডিও — প্রম্পট লিখে ইমোজি বানাও', studio_p:'যেমন: রাগী লাল মুখ, চশমা পরা, পার্টি হ্যাট, ভালোবাসার চোখ...', studio_b:'✨ বানাও',
    size_l:'সাইজ', b_rand:'🎲 র্যান্ডম', b_save:'💾 সেভ', b_dl:'⬇️ PNG', b_lab:'🎬 অ্যানিমেট',
    dz_t:'ছবি টেনে আনো বা ক্লিক করে বাছো', dz_s:'PNG / JPG / WebP — সব কিছু ব্রাউজারেই প্রসেস হয়',
    base_t:'🙃 অথবা বেস ইমোজি বেছে নাও', i_clear:'🗑️ মুছুন',
    i_shape:'🖼️ ক্রপ আকৃতি', i_none:'⬜ কোনোটি নয়', i_circ:'⚪ সার্কেল', i_round:'🟦 রাউন্ডেড',
    i_bg:'✂️ ব্যাকগ্রাউন্ড রিমুভার', i_off:'অফ', i_on:'হালকা ব্যাকগ্রাউন্ড মুছুন', i_tol:'টলারেন্স',
    i_fx:'✨ কালার ইফেক্ট', f_none:'🙂 নরমাল', f_neon:'🌈 নিয়ন গ্লো', f_gray:'⬛ গ্রেরস্কেল', f_sepia:'🟫 সেপিয়া', f_inv:'🔄 ইনভার্ট', f_vivid:'🎨 ভাইব্রিড',
    i_size:'📐 আউটপুট সাইজ', i_zoom:'🔍 জুম', i_cover:'🖼️ কাভার', f_warm:'🌅 ওয়ার্ম', f_cool:'🧊 কুল',
    st_t:'🧪 ইমোজি স্টুডিও — 2D/3D/5D কনভার্টার', st_s:'ছবি আপলোড করো বা টেক্সট লেখো — ব্যাকগ্রাউন্ড রিমুভ, জুম, ক্রপ, কালার FX আর 2D·3D·5D ডেপথ ইফেক্টে কনভার্ট করো।',
    st_mode:'🎯 সোর্স মোড', st_mimg:'📷 ছবি', st_mtxt:'✏️ টেক্সট',
    st_text:'✏️ টেক্সট ইমোজি — ইফেক্ট ইঞ্জিন', st_textph:'যেমন: WOW, জয়, LOVE...',
    st_fill:'ফিল রং', st_out:'আউটলাইন', st_outw:'আউটলাইন পুরুত্ব', st_font:'ফন্ট',
    st_f0:'🅱️ বোল্ড ব্ল্যাক', st_f1:'🎈 কমিক', st_f2:'🇧🇩 বাংলা', st_f3:'📜 সেরিফ', st_f4:'💻 মোনো',
    st_grad:'🌗 গ্র্যাডিয়েন্ট ফিল', st_rainbow:'🌈 রংধনু অক্ষর',
    l_gif:'🎞️ GIF ডাউনলোড', l_webm:'🎥 WebM', l_png:'⬇️ PNG', l_plat:'প্ল্যাটফর্ম', p_none:'সাধারণ',
    l_hint:'💡 সোর্স পাঠাও: বিল্ডার/ছবি ট্যাবের "অ্যানিমেট" বাটন, বা AI প্যাকের 🎬 বাটন চেপে।',
    l_anim:'🎞️ অ্যানিমেশন (৮৩টি)', l_ctrl:'🎛️ কন্ট্রোল', l_speed:'গতি', s_slow:'ধীর', s_norm:'নরমাল', s_fast:'দ্রুত',
    l_dir:'দিক', l_size:'সাইজ', l_qual:'কোয়ালিটি', q_low:'কম', q_med:'মাঝারি', q_high:'উচ্চ',
    l_color:'কালার', l_scene:'সিন/ব্যাকগ্রাউন্ড', sc_tr:'স্বচ্ছ', sc_dark:'গাঢ়', sc_grad:'গ্রেডিয়েন্ট', sc_space:'মহাকাশ', sc_synth:'সিন্থওয়েভ', sc_cust:'কাস্টম ছবি', sc_up:'ব্যাকগ্রাউন্ড আপলোড',
    l_stk:'🏷️ স্টিকার', l_src:'🖼️ বর্তমান সোর্স', l_nosrc:'কোনো সোর্স নেই — ডিফল্ট হাসিমুখ ব্যবহার হচ্ছে।',
    pk_t:'🤖 ইমোজি প্যাক', pk_s:'৮৭টি ইমোজি — এআই-জেনারেটেড + তেজোফি 3ডি, সবগুলো ট্রান্সপারেন্ট পিএনজি। সার্চ, ফিল্টার, কোড কপি, ZIP ও গিফট প্যাক।',
    pk_search:'🔍 ইমোজি খোঁজো...', pk_all:'🌟 সব', pk_study:'📚 পড়াশোনা', pk_bengali:'🎭 মজার বাঙালি', pk_beggar:'🥣 মজার ভিক্ষুক', pk_tezofy:'🌟 তেজোফি 3ডি', pk_zip:'📦 ZIP ডাউনলোড', pk_gift:'🎁 গিফট প্যাক (JSON)',
    mn_t:'💾 আমার সংগ্রহ', mn_s:'বিল্ডারে "সেভ" করা ইমোজি এখানে জমা থাকে (তোমার ব্রাউজারেই)।',
    mn_e:'এখনো কিছু সেভ করোনি! বিল্ডারে গিয়ে 🎲 র্যান্ডম চেপে 💾 সেভ করো।',
    foot:'😄 Tezofy Emoji Maker — ভালোবাসা দিয়ে বানানো 🇧🇩 | সব প্রসেসিং ব্রাউজারে, কোনো সার্ভার নেই',
    ph_none:'✅ সাধারণ মোড — কোনো লিমিট নেই', ph_discord:'Discord: ১২৮-২৫৬px, GIF ≤ ২৬KB', ph_slack:'Slack: ১২৮px, ছোট ফাইল ভালো', ph_twitch:'Twitch: ১১px, ≤ ২৫KB', ph_teams:'Teams: ১৯২px',
    cs_t:'⚡ CSS স্টুডিও', cs_s:'ইমোজি বেছে নাও, অ্যানিমেশন আর ইফেক্ট দাও, তারপর রেডি-টু-ইউজ HTML/CSS কোড কপি করো — গ্লো, শাইন, স্পার্কল, হোভার 3ডি সব সহ!',
    cs_src:'🎭 ইমোজি বেছে নাও', cs_up:'📤 নিজের ছবি আপলোড', cs_upname:'আপলোড করা ছবি', cs_anim:'🎬 CSS অ্যানিমেশন', cs_ctl:'🎚️ কন্ট্রোল',
    cs_size:'সাইজ', cs_dur:'সময়কাল', cs_fx:'✨ ইফেক্ট', cs_glow:'🌟 গ্লো', cs_glowc:'গ্লো রং', cs_blur:'ব্লার',
    cs_shine:'✨ শাইন সুইপ', cs_spark:'⭐ স্পার্কল তারা', cs_hover:'🖱️ হোভার 3ডি টিল্ট', cs_pop:'👆 ক্লিক পপ',
    cs_code:'💻 এমবেড কোড', cs_copy:'📋 কোড কপি করো', cs_dlhtml:'⬇️ HTML ফাইল', cs_tolab:'🎬 GIF ল্যাবে নাও',
    bg_t:'🏷️ ব্যাজ জেনারেটর', bg_s:'ইমোজি + টেক্সট দিয়ে সুন্দর অ্যানিমেটেড ব্যাজ বানাও — ওয়েবসাইট বা রিডমিতে বসানোর জন্য এমবেড কোড সহ।',
    bg_ph:'ব্যাজের টেক্সট লেখো...', bg_default:'Tezofy Emoji Maker', bg_glass:'🧊 গ্লাস', bg_grad:'🌈 গ্র্যাডিয়েন্ট', bg_dark:'🌑 ডার্ক', bg_ok:'✅ সবুজ', bg_dlhtml:'⬇️ HTML ফাইল',
    i_st:'🧊 স্টাইল (2D/3D/5D)', i_stnone:'🙂 নরমাল', i_depth:'ডেপথ',
    toast_save:'💾 সংগ্রহে সেভ হলো!', toast_warn:'⚠️ ছবির ফাইল দাও!', toast_rec:'🎬 রেকর্ড হচ্ছে...', toast_vid:'🎥 ভিডিও ডাউনলোড হলো!',
    toast_gif:'🎞️ GIF ডাউনলোড হলো!', toast_big:'⚠️ ফাইল প্ল্যাটফর্ম লিমিটের চেয়ে বড়!', toast_zip:'📦 ZIP তৈরি হচ্ছে...', toast_gift:'🎁 গিফট প্যাক তৈরি হচ্ছে...', toast_copy:'📋 কোড কপি হয়েছে!', toast_done:'✨ হয়ে গেছে!'
  },
  en: {
    logo:'Tezofy <b>Emoji Maker</b>', tab_home:'🏠 Home', tab_builder:'🎨 Builder + AI Studio', tab_image:'📸 Image → Emoji',
    tab_lab:'🎬 Animation Lab', tab_css:'⚡ CSS Studio', tab_packs:'🤖 AI Packs', tab_mine:'💾 My Collection', tab_image:'🧪 Emoji Studio',
    hero_t:'Make emojis your way,<br><span class="grad-text">2D • 3D • 5D</span> styles!',
    hero_s:'All features of MyEmojiMaker, Emotiyou & MakeEmoji in one place — 83 animations, layer editor, ⚡ CSS code studio, 2D·3D·5D photo studio and 87 emoji pack emojis. No signup needed!',
    hero_c1:'🎨 Start Creating', hero_c2:'🎬 Animation Lab', hero_c3:'🤖 AI Packs',
    st1:'pack emojis', st2:'animation effects', st3:'dimension styles', st4:'combinations',
    studio_t:'🧠 AI Studio — type a prompt, get an emoji', studio_p:'e.g. angry red face, glasses, party hat, love eyes...', studio_b:'✨ Make it',
    size_l:'Size', b_rand:'🎲 Random', b_save:'💾 Save', b_dl:'⬇️ PNG', b_lab:'🎬 Animate',
    dz_t:'Drag & drop or click to choose an image', dz_s:'PNG / JPG / WebP — everything is processed in your browser',
    base_t:'🙃 Or pick a base emoji', i_clear:'🗑️ Clear',
    i_shape:'🖼️ Crop shape', i_none:'⬜ None', i_circ:' Circle', i_round:' Rounded',
    i_bg:'✂️ Background remover', i_off:'Off', i_on:'Remove light background', i_tol:'Tolerance',
    i_fx:'✨ Color effect', f_none:'🙂 Normal', f_neon:'🌈 Neon glow', f_gray:'⬛ Grayscale', f_sepia:'🟫 Sepia', f_inv:'🔄 Invert', f_vivid:'🎨 Vivid',
    i_size:'📐 Output size', i_zoom:'🔍 Zoom', i_cover:'🖼️ Cover', f_warm:'🌅 Warm', f_cool:'🧊 Cool',
    st_t:'🧪 Emoji Studio — 2D/3D/5D Converter', st_s:'Upload an image or type text — convert with background removal, zoom, crop, color FX and 2D·3D·5D depth effects.',
    st_mode:'🎯 Source mode', st_mimg:'📷 Image', st_mtxt:'✏️ Text',
    st_text:'✏️ Text emoji — effect engine', st_textph:'e.g. WOW, JOY, LOVE...',
    st_fill:'Fill color', st_out:'Outline', st_outw:'Outline width', st_font:'Font',
    st_f0:'🅱️ Bold black', st_f1:'🎈 Comic', st_f2:'🇧 Bengali', st_f3:'📜 Serif', st_f4:'💻 Mono',
    st_grad:'🌗 Gradient fill', st_rainbow:'🌈 Rainbow letters',
    l_gif:'🎞️ Download GIF', l_webm:'🎥 WebM', l_png:'⬇️ PNG', l_plat:'Platform', p_none:'General',
    l_hint:'💡 Send a source: press "Animate" in Builder/Image tab, or 🎬 in AI Packs.',
    l_anim:'🎞️ Animations (83)', l_ctrl:'🎛️ Controls', l_speed:'Speed', s_slow:'Slow', s_norm:'Normal', s_fast:'Fast',
    l_dir:'Direction', l_size:'Size', l_qual:'Quality', q_low:'Low', q_med:'Medium', q_high:'High',
    l_color:'Color', l_scene:'Scene/Background', sc_tr:'Transparent', sc_dark:'Dark', sc_grad:'Gradient', sc_space:'Space', sc_synth:'Synthwave', sc_cust:'Custom image', sc_up:'Upload background',
    l_stk:'🏷️ Stickers', l_src:'🖼️ Current source', l_nosrc:'No source — using default smiley.',
    pk_t:'🤖 Emoji Packs', pk_s:'87 emojis — AI-generated + Tezofy 3D, all transparent PNGs. Search, filter, copy code, ZIP & gift pack.',
    pk_search:'🔍 Search emojis...', pk_all:'🌟 All', pk_study:'📚 Study', pk_bengali:'🎭 Fun Bengali', pk_beggar:'🥣 Fun Beggar', pk_tezofy:'🌟 Tezofy 3D', pk_zip:'📦 Download ZIP', pk_gift:'🎁 Gift Pack (JSON)',
    mn_t:'💾 My Collection', mn_s:'Emojis saved from the Builder live here (in your browser).',
    mn_e:'Nothing saved yet! Go to Builder, press 🎲 Random then 💾 Save.',
    foot:'😄 Tezofy Emoji Maker — made with love 🇧🇩 | All processing happens in your browser',
    ph_none:'✅ General mode — no limits', ph_discord:'Discord: 128-256px, GIF ≤ 256KB', ph_slack:'Slack: 128px, small files better', ph_twitch:'Twitch: 112px, ≤ 25KB', ph_teams:'Teams: 192px',
    cs_t:'⚡ CSS Studio', cs_s:'Pick an emoji, add animations & effects, then copy ready-to-use HTML/CSS code — glow, shine, sparkles & hover 3D included!',
    cs_src:'🎭 Pick an emoji', cs_up:'📤 Upload your image', cs_upname:'Uploaded image', cs_anim:'🎬 CSS Animation', cs_ctl:'🎚️ Controls',
    cs_size:'Size', cs_dur:'Duration', cs_fx:'✨ Effects', cs_glow:'🌟 Glow', cs_glowc:'Glow color', cs_blur:'Blur',
    cs_shine:'✨ Shine sweep', cs_spark:'⭐ Sparkles', cs_hover:'🖱️ Hover 3D tilt', cs_pop:'👆 Click pop',
    cs_code:'💻 Embed code', cs_copy:'📋 Copy code', cs_dlhtml:'⬇️ HTML file', cs_tolab:'🎬 Send to GIF Lab',
    bg_t:'🏷️ Badge Generator', bg_s:'Create beautiful animated badges with emoji + text — embed code included for your website or README.',
    bg_ph:'Type badge text...', bg_default:'Tezofy Emoji Maker', bg_glass:'🧊 Glass', bg_grad:'🌈 Gradient', bg_dark:'🌑 Dark', bg_ok:'✅ Green', bg_dlhtml:'⬇️ HTML file',
    i_st:'🧊 Style (2D/3D/5D)', i_stnone:'🙂 Normal', i_depth:'Depth',
    toast_save:'💾 Saved to collection!', toast_warn:'⚠️ Please choose an image file!', toast_rec:'🎬 Recording...', toast_vid:'🎥 Video downloaded!',
    toast_gif:'🎞️ GIF downloaded!', toast_big:'⚠️ File exceeds platform limit!', toast_zip:'📦 Building ZIP...', toast_gift:'🎁 Building gift pack...', toast_copy:'📋 Code copied!', toast_done:'✨ Done!'
  }
};
const t = k => (I18N[LANG] && I18N[LANG][k]) || I18N.bn[k] || k;
function applyLang(){
  document.documentElement.lang = LANG;
  $('#langBtn').textContent = LANG==='bn' ? 'EN' : 'বাং';
  $$('[data-t]').forEach(el=>{ el.innerHTML = t(el.dataset.t); });
  $$('[data-tp]').forEach(el=>{ el.placeholder = t(el.dataset.tp); });
  renderFeatures(); renderControls(); renderAnimChips(); renderStickers(); renderLayerPanel();
  renderPacks(packCat); renderMine(); updatePlatHint(); csBuildUI(); bgUpdate();
}
$('#langBtn').onclick = ()=>{ LANG = LANG==='bn' ? 'en' : 'bn'; applyLang(); };

/* ---------- ট্যাব ---------- */
function goTab(name){
  $$('.tab').forEach(x=>x.classList.toggle('active', x.dataset.tab===name));
  $$('.panel').forEach(p=>p.classList.toggle('active', p.id==='tab-'+name));
}
$$('.tab').forEach(x=>x.addEventListener('click',()=>goTab(x.dataset.tab)));
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.goto)));
$('#logoBtn').addEventListener('click',()=>goTab('home'));

/* ---------- টোস্ট ---------- */
function toast(msg){
  let el=$('#toast');
  if(!el){ el=document.createElement('div'); el.id='toast';
    el.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#ff5c8a,#7c5cff);color:#fff;padding:12px 22px;border-radius:999px;font-weight:700;z-index:99;box-shadow:0 10px 30px rgba(0,0,0,.4);transition:opacity .4s';
    document.body.appendChild(el);
  }
  el.textContent=msg; el.style.opacity='1';
  setTimeout(()=>el.style.opacity='0',1800);
}

/* ---------- হোম ---------- */
const FEATURES=[
 ['🎨','ইমোজি বিল্ডার + AI স্টুডিও','Builder + AI Studio','স্কিন, চোখ, চুল, এক্সেসরি মিলিয়ে স্ক্র্যাচ থেকে ইমোজি; প্রম্পট লিখলে AI স্টুডিও বানিয়ে দেবে। 2D/3D/5D স্টাইল!','Build emojis from parts — skin, eyes, hair, accessories; or type a prompt and the AI Studio makes it. 2D/3D/5D styles!'],
 ['🎞️','৮৩টি অ্যানিমেশন','83 Animations','স্পিন, জেলো, স্পাইরাল, ম্যাট্রিক্স, সিন্থওয়েভ, ফায়ার, ফ্রোজেন, রেইন, ফায়ারওয়ার্কস, দিস-ইজ-ফাইন...','Spin, jello, spiral, matrix, synthwave, fire, frozen, rain, fireworks, this-is-fine & more'],
 ['🧪','ইমোজি স্টুডিও 2D·3D·5D','Emoji Studio 2D·3D·5D','ছবি বা টেক্সট → ইমোজি: ব্যাকগ্রাউন্ড রিমুভ, জুম, ক্রপ, ৮ কালার FX, টেক্সট ইফেক্ট ইঞ্জিন (গ্র্যাডিয়েন্ট/রংধনু/আউটলাইন/৫ ফন্ট) + 2D·3D·5D ডেপথ।','Image or text → emoji: bg removal, zoom, crop, 8 color FX, text effect engine (gradient/rainbow/outline/5 fonts) + 2D·3D·5D depth.'],
 ['🎥','GIF + WebM এক্সপোর্ট','GIF + WebM Export','Discord/Slack/Twitch/Teams প্রিসেট, সাইজ-কোয়ালিটি কন্ট্রোল, লুপিং GIF।','Platform presets, size & quality controls, looping GIF export.'],
 ['🏷️','স্টিকার ও সিন','Stickers & Scenes','ইমোজির উপর স্টিকার, পেছনে মহাকাশ/সিন্থওয়েভ/কাস্টম ব্যাকগ্রাউন্ড।','Overlay stickers; space/synthwave/custom backgrounds behind.'],
 ['🤖','৮৭টি ইমোজি প্যাক + ZIP','87 Emoji Pack + ZIP','পড়াশোনা, মজার বাঙালি, ভিক্ষুক + ৩৯টি তেজোফি 3ডি — সার্চ, ফিল্টার, কোড কপি, ZIP ও গিফট প্যাক।','Study, Fun Bengali, Beggar + 39 Tezofy 3D — search, filter, copy code, ZIP & gift pack.'],
 ['⚡','CSS কোড স্টুডিও','CSS Code Studio','CSS অ্যানিমেশন + গ্লো/শাইন/স্পার্কল/হোভার 3ডি — কপি-পেস্ট করার মতো রেডি এমবেড কোড।','Portable HTML/CSS animations with glow, shine, sparkles & hover 3D — ready embed code.'],
 ['🧊','ছবিতে 2D·3D·5D','2D·3D·5D Photo Studio','যেকোনো ছবিতে ডেপথ-এক্সট্রুশন 3ডি ও হোলোগ্রাফিক 5ডি ইফেক্ট।','Depth-extruded 3D & holographic 5D effects on any photo.'],
 ['🏷️','ব্যাজ জেনারেটর','Badge Generator','ইমোজি + টেক্সট দিয়ে অ্যানিমেটেড ব্যাজ — গ্লাস/গ্র্যাডিয়েন্ট/ডার্ক স্টাইল, এমবেড কোড সহ।','Animated emoji + text badges — glass/gradient/dark styles with embed code.'],
 ['🧩','লেয়ার এডিটর','Layer Editor','ইমোজির ওপর ইমোজি সাজাও — টেনে বসাও, ঘোরাও, ছোট-বড় করো, মজার কম্বো বানাও!','Stack emojis on emojis — drag, rotate, resize and make fun combos!'],
];
function renderFeatures(){
  const g=$('#featureGrid'); g.innerHTML='';
  FEATURES.forEach(f=>{
    const d=document.createElement('div'); d.className='fcard';
    d.innerHTML=`<span class="ficon">${f[0]}</span><h3>${LANG==='bn'?f[1]:f[2]}</h3><p>${LANG==='bn'?f[3]:f[4]}</p>`;
    g.appendChild(d);
  });
}
(function(){
  const ems=['😄','😂','❤️','🤖','','🎬','','🍚','','🏏','','🥣','✨','💖','🌟'];
  const box=$('#heroFloaties');
  for(let i=0;i<12;i++){
    const s=document.createElement('span');
    s.textContent=ems[i%ems.length];
    s.style.left=(4+Math.random()*90)+'%';
    s.style.top=(8+Math.random()*80)+'%';
    s.style.animationDelay=(Math.random()*4)+'s';
    s.style.fontSize=(22+Math.random()*26)+'px';
    box.appendChild(s);
  }
})();

/* ---------- কালার হেল্পার ---------- */
function shade(hex,amt){
  const n=parseInt(hex.slice(1),16);
  let r=(n>>16)+amt,g=(n>>8&255)+amt,b=(n&255)+amt;
  r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));
  return '#'+((r<<16|g<<8|b).toString(16).padStart(6,'0'));
}

/* =================================================
   বিল্ডার — SVG (2D/3D/5D)
================================================= */
const SKINS=['#FFD93B','#FFB84D','#F1C27D','#E0AC69','#C68642','#8D5524','#9BE8D8','#FF9EC4'];
const state={style:'3d',skin:3,face:0,eyes:0,brows:1,mouth:1,hair:2,acc:0,cheek:1,fx:0};
const OUT='#20233d';

function star4(x,y,s,c){return `<path d="M${x} ${y-s} L${x+s*0.28} ${y-s*0.28} L${x+s} ${y} L${x+s*0.28} ${y+s*0.28} L${x} ${y+s} L${x-s*0.28} ${y+s*0.28} L${x-s} ${y} L${x-s*0.28} ${y-s*0.28} Z" fill="${c}"/>`;}
function heart(x,y,s,c){return `<path d="M${x} ${y+s} C${x-s*1.4} ${y-s*0.2} ${x-s*0.7} ${y-s*1.2} ${x} ${y-s*0.4} C${x+s*0.7} ${y-s*1.2} ${x+s*1.4} ${y-s*0.2} ${x} ${y+s} Z" fill="${c}"/>`;}
function star5(x,y,s,c){return `<path d="M${x} ${y-s} L${x+s*0.29} ${y-s*0.35} L${x+s*0.95} ${y-s*0.31} L${x+s*0.45} ${y+s*0.12} L${x+s*0.59} ${y+s*0.81} L${x} ${y+s*0.42} L${x-s*0.59} ${y+s*0.81} L${x-s*0.45} ${y+s*0.12} L${x-s*0.95} ${y-s*0.31} L${x-s*0.29} ${y-s*0.35} Z" fill="${c}"/>`;}
function faceShape(f){
  if(f===1) return 'M26 77 Q26 31 72 31 L128 31 Q174 31 174 77 L174 133 Q174 179 128 179 L72 179 Q26 179 26 133 Z';
  if(f===2) return 'M100 21 C150 21 172 63 172 105 C172 155 140 189 100 189 C60 189 28 155 28 105 C28 63 50 21 100 21 Z';
  return 'M100 25 C146 25 180 60 180 105 C180 150 146 185 100 185 C54 185 20 150 20 105 C20 60 54 25 100 25 Z';
}
function eyesSVG(v, style){
  const hl = style==='2d' ? '' : '<circle cx="72" cy="92" r="4" fill="#fff" opacity=".9"/><circle cx="136" cy="92" r="4" fill="#fff" opacity=".9"/>';
  const dotL='<circle cx="68" cy="98" r="11" fill="'+OUT+'"/>', dotR='<circle cx="132" cy="98" r="11" fill="'+OUT+'"/>';
  const happyL='<path d="M54 102 Q68 84 82 102" fill="none" stroke="'+OUT+'" stroke-width="7" stroke-linecap="round"/>',
        happyR='<path d="M118 102 Q132 84 146 102" fill="none" stroke="'+OUT+'" stroke-width="7" stroke-linecap="round"/>';
  switch(v){
    case 1: return happyL+happyR;
    case 2: return star5(68,98,14,'#ffb703')+star5(132,98,14,'#ffb703');
    case 3: return heart(68,98,11,'#ff4d6d')+heart(132,98,11,'#ff4d6d');
    case 4: return dotL+'<circle cx="72" cy="93" r="4" fill="#fff"/>'+happyR;
    case 5: return '<path d="M56 98 Q68 110 80 98" fill="none" stroke="'+OUT+'" stroke-width="7" stroke-linecap="round"/><path d="M120 98 Q132 110 144 98" fill="none" stroke="'+OUT+'" stroke-width="7" stroke-linecap="round"/>';
    case 6: return '<ellipse cx="68" cy="98" rx="11" ry="8" fill="'+OUT+'" transform="rotate(-14 68 98)"/><ellipse cx="132" cy="98" rx="11" ry="8" fill="'+OUT+'" transform="rotate(14 132 98)"/>';
    default: return dotL+dotR+hl;
  }
}
function browsSVG(v){
  if(v===0) return '';
  const w='stroke="'+OUT+'" stroke-width="7" stroke-linecap="round" fill="none"';
  if(v===2) return `<path d="M52 70 Q68 58 84 70" ${w}/><path d="M116 70 Q132 58 148 70" ${w}/>`;
  if(v===3) return `<path d="M54 82 L84 70" ${w}/><path d="M116 70 L146 82" ${w}/>`;
  return `<path d="M54 78 Q68 70 82 78" ${w}/><path d="M118 78 Q132 70 146 78" ${w}/>`;
}
function mouthSVG(v){
  const w='stroke="'+OUT+'" stroke-width="7" stroke-linecap="round" fill="none"';
  switch(v){
    case 1: return `<path d="M66 132 Q100 184 134 132 Q100 146 66 132 Z" fill="#7c2d12"/><ellipse cx="100" cy="152" rx="17" ry="9" fill="#ff6b81"/>`;
    case 2: return '<ellipse cx="100" cy="146" rx="14" ry="19" fill="'+OUT+'"/>';
    case 3: return `<path d="M70 154 Q100 128 130 154" ${w}/>`;
    case 4: return '<circle cx="100" cy="146" r="11" fill="'+OUT+'"/>';
    case 5: return `<path d="M68 136 Q100 164 132 136" ${w}/><path d="M90 148 q10 22 20 0 l0 -6 l-20 0 Z" fill="#ff6b81"/>`;
    default: return `<path d="M68 134 Q100 162 132 134" ${w}/>`;
  }
}
function hairSVG(v, behind){
  const H='#4a2f1d';
  if(behind){
    if(v===3) return `<circle cx="100" cy="78" r="66" fill="${H}"/>`;
    if(v===4) return `<rect x="20" y="60" width="34" height="104" rx="17" fill="${H}"/><rect x="146" y="60" width="34" height="104" rx="17" fill="${H}"/>`;
    return '';
  }
  switch(v){
    case 1: return `<path d="M30 82 Q38 26 100 24 Q162 26 170 82 Q140 52 100 54 Q60 52 30 82 Z" fill="${H}"/>`;
    case 2: return `<circle cx="58" cy="44" r="19" fill="${H}"/><circle cx="100" cy="32" r="22" fill="${H}"/><circle cx="142" cy="44" r="19" fill="${H}"/>`;
    case 5: return `<path d="M86 52 Q88 18 100 8 Q112 18 114 52 Z" fill="#e11d48"/>`;
    case 6: return `<circle cx="100" cy="26" r="16" fill="${H}"/><path d="M40 70 Q55 26 100 26 Q145 26 160 70 Q130 48 100 48 Q70 48 40 70 Z" fill="${H}"/>`;
    case 7: return `<path d="M32 70 Q100 6 168 70 L168 80 L32 80 Z" fill="#7c5cff"/><rect x="22" y="72" width="156" height="13" rx="6" fill="#5b3fd4"/>`;
    default: return '';
  }
}
function accSVG(v){
  switch(v){
    case 1: return `<circle cx="68" cy="98" r="17" fill="rgba(255,255,255,.22)" stroke="${OUT}" stroke-width="5"/><circle cx="132" cy="98" r="17" fill="rgba(255,255,255,.22)" stroke="${OUT}" stroke-width="5"/><path d="M85 98 L115 98" stroke="${OUT}" stroke-width="5"/>`;
    case 2: return `<rect x="48" y="86" width="40" height="26" rx="9" fill="${OUT}"/><rect x="112" y="86" width="40" height="26" rx="9" fill="${OUT}"/><path d="M88 96 L112 96" stroke="${OUT}" stroke-width="6"/>`;
    case 3: return `<path d="M78 46 L100 8 L122 46 Z" fill="#7c5cff"/><circle cx="100" cy="8" r="8" fill="#ffd93b"/><circle cx="92" cy="32" r="3" fill="#ffd93b"/><circle cx="108" cy="24" r="3" fill="#2dd4bf"/>`;
    case 4: return `<path d="M38 92 Q100 8 162 92" fill="none" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/><rect x="26" y="84" width="20" height="34" rx="9" fill="#7c5cff"/><rect x="154" y="84" width="20" height="34" rx="9" fill="#7c5cff"/>`;
    case 5: return `<path d="M72 128 Q86 116 100 128 Q114 116 128 128 Q116 142 100 133 Q84 142 72 128 Z" fill="#3b2a20"/>`;
    case 6: return `<path d="M68 36 L76 12 L92 28 L100 6 L108 28 L124 12 L132 36 Z" fill="#ffd93b" stroke="#e0a800" stroke-width="3"/>`;
    case 7: return star5(142,126,12,'#ffd93b');
    default: return '';
  }
}
function fxSVG(v){
  switch(v){
    case 1: return star4(24,44,12,'#ffd93b')+star4(178,60,9,'#2dd4bf')+star4(170,160,11,'#ff5c8a');
    case 2: return heart(26,52,10,'#ff4d6d')+heart(176,70,8,'#ff8fab')+heart(172,150,11,'#ff4d6d');
    case 3: return `<path d="M62 116 q-10 22 0 28 q12 -6 0 -28 Z" fill="#4cc9f0"/>`;
    case 4: return `<path d="M158 60 q-12 24 0 30 q14 -6 0 -30 Z" fill="#4cc9f0"/>`;
    case 5: return `<text x="150" y="46" font-size="30" font-weight="bold" fill="#7c5cff" font-family="sans-serif">Z</text><text x="172" y="70" font-size="20" font-weight="bold" fill="#9d86ff" font-family="sans-serif">z</text>`;
    case 6: return `<text x="152" y="52" font-size="28" fill="#2dd4bf" font-family="sans-serif">♪</text><text x="170" y="84" font-size="22" fill="#ff5c8a" font-family="sans-serif">♫</text>`;
    default: return '';
  }
}
function buildSVG(){
  const skin=SKINS[state.skin], st=state.style;
  let defs='', faceAttrs='', extra='', openG='', closeG='';
  if(st==='3d'){
    defs=`<defs><radialGradient id="g3" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="${shade(skin,60)}"/><stop offset="55%" stop-color="${skin}"/><stop offset="100%" stop-color="${shade(skin,-45)}"/>
      </radialGradient></defs>`;
    faceAttrs=`fill="url(#g3)" stroke="${shade(skin,-70)}" stroke-width="3"`;
    extra=`<ellipse cx="70" cy="66" rx="30" ry="17" fill="#fff" opacity=".35" transform="rotate(-18 70 66)"/>`;
  } else if(st==='5d'){
    defs=`<defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff5c8a"><animate attributeName="stop-color" values="#ff5c8a;#7c5cff;#2dd4bf;#ffd93b;#ff5c8a" dur="4s" repeatCount="indefinite"/></stop>
      <stop offset="100%" stop-color="#7c5cff"><animate attributeName="stop-color" values="#7c5cff;#2dd4bf;#ffd93b;#ff5c8a;#7c5cff" dur="4s" repeatCount="indefinite"/></stop>
      </linearGradient>
      <filter id="glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    faceAttrs=`fill="url(#g5)" stroke="rgba(255,255,255,.8)" stroke-width="2.5" filter="url(#glow)"`;
    extra=`<circle cx="100" cy="105" r="96" fill="none" stroke="url(#g5)" stroke-width="3" stroke-dasharray="10 14" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="0 100 105" to="360 100 105" dur="8s" repeatCount="indefinite"/></circle>
      <circle cx="40" cy="180" r="4" fill="#fff" opacity=".8"><animate attributeName="cy" values="190;20" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="2.6s" repeatCount="indefinite"/></circle>
      <circle cx="165" cy="180" r="3" fill="#ffd93b" opacity=".8"><animate attributeName="cy" values="190;30" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="3.4s" repeatCount="indefinite"/></circle>
      <circle cx="105" cy="190" r="3.5" fill="#2dd4bf" opacity=".8"><animate attributeName="cy" values="195;15" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="3s" repeatCount="indefinite"/></circle>`;
    openG=`<g><animateTransform attributeName="transform" type="rotate" values="-2.5 100 105;2.5 100 105;-2.5 100 105" dur="2.4s" repeatCount="indefinite"/>`;
    closeG=`</g>`;
  } else {
    faceAttrs=`fill="${skin}" stroke="${OUT}" stroke-width="6"`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">${defs}${extra}${openG}
    ${hairSVG(state.hair,true)}
    <path d="${faceShape(state.face)}" ${faceAttrs}/>
    ${st==='3d'?`<ellipse cx="100" cy="168" rx="52" ry="14" fill="#000" opacity=".10"/>`:''}
    ${state.cheek?`<ellipse cx="60" cy="124" rx="13" ry="8" fill="#ff8fab" opacity=".75"/><ellipse cx="140" cy="124" rx="13" ry="8" fill="#ff8fab" opacity=".75"/>`:''}
    ${eyesSVG(state.eyes,st)}
    ${browsSVG(state.brows)}
    ${mouthSVG(state.mouth)}
    ${hairSVG(state.hair,false)}
    ${accSVG(state.acc)}
    ${fxSVG(state.fx)}
  ${closeG}</svg>`;
}
let builderImg = new Image();
function renderBuilder(){
  const url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(buildSVG());
  $('#builderPreview').src=url;
  const im=new Image();
  im.onload=()=>{builderImg=im;};
  im.src=url;
}

/* ---------- বিল্ডার কন্ট্রোল (দ্বিভাষিক) ---------- */
const GROUPS=[
 {key:'skin',title:['🎨 স্কিন রং','🎨 Skin color'],sw:true},
 {key:'face',title:['😀 মুখের আকৃতি','😀 Face shape'],opts:[['⚪ গোল','⚪ Round'],['🟦 স্কয়ার','🟦 Square'],['🥚 ডিম','🥚 Oval']]},
 {key:'eyes',title:['👀 চোখ','👀 Eyes'],opts:[['⚫ নরমাল','⚫ Normal'],['😄 খুশি','😄 Happy'],['🌟 তারা','🌟 Stars'],['💖 হার্ট','💖 Hearts'],['😜 উইংক','😜 Wink'],['😌 ঘুমন্ত','😌 Sleepy'],['😠 রাগী','😠 Angry']]},
 {key:'brows',title:['🤨 ভ্রু','🤨 Brows'],opts:[['🚫 নেই','🚫 None'],['🙂 নরমাল','🙂 Normal'],['😲 তোলা','😲 Raised'],['😠 রাগী','😠 Angry']]},
 {key:'mouth',title:['👄 মুখ','👄 Mouth'],opts:[['🙂 হাসি','🙂 Smile'],['😆 বড় হাসি','😆 Laugh'],['😮 ও','😮 Open'],['🙁 দুঃখী','🙁 Sad'],['😯 অবাক','😯 Surprised'],['😝 জিভ','😝 Tongue']]},
 {key:'hair',title:['💇 চুল','💇 Hair'],opts:[['🚫 নেই','🚫 None'],['💈 ফ্রিঞ্জ','💈 Fringe'],['🌀 কোঁকড়া','🌀 Curly'],['🌳 আফ্রো','🌳 Afro'],['🎤 লম্বা','🧑🎤 Long'],['🦔 মোহক','🦔 Mohawk'],['🎩 ক্যাপ','🎩 Cap']]},
 {key:'acc',title:['🕶️ এক্সেসরি','🕶️ Accessory'],opts:[['🚫 নেই','🚫 None'],['👓 চশমা',' Glasses'],['️ সানগ্লাস','🕶️ Shades'],['🎉 পার্টি হ্যাট','🎉 Party hat'],['🎧 হেডফোন','🎧 Headphones'],['🥸 গোঁফ','🥸 Mustache'],['👑 মুকুট','👑 Crown'],['⭐ স্টিকার','⭐ Sticker']]},
 {key:'cheek',title:['🍭 গাল','🍭 Cheeks'],opts:[['🚫 নেই','🚫 None'],['🌸 ব্লাশ','🌸 Blush']]},
 {key:'fx',title:['✨ ইফেক্ট','✨ Effect'],opts:[['🚫 নেই','🚫 None'],['✨ ঝিলিক','✨ Sparkle'],['💖 হার্ট','💖 Hearts'],['😢 অশ্রু','😢 Tear'],['😅 ঘাম','😅 Sweat'],['😴 Zzz','😴 Zzz'],['🎵 গান','🎵 Music']]},
];
function renderControls(){
  const L=LANG==='bn'?0:1;
  const box=$('#builderControls'); box.innerHTML='';
  GROUPS.forEach(g=>{
    const div=document.createElement('div'); div.className='cgroup';
    div.innerHTML=`<h4>${g.title[L]}</h4>`;
    const holder=document.createElement('div'); holder.className=g.sw?'swatches':'chips';
    if(g.sw){
      SKINS.forEach((c,i)=>{
        const b=document.createElement('button'); b.className='swatch'+(state.skin===i?' active':'');
        b.style.background=c;
        b.onclick=()=>{state.skin=i; renderControls(); renderBuilder();};
        holder.appendChild(b);
      });
    } else {
      g.opts.forEach((o,i)=>{
        const b=document.createElement('button'); b.className='chip'+(state[g.key]===i?' active':'');
        b.textContent=o[L];
        b.onclick=()=>{state[g.key]=i; renderControls(); renderBuilder();};
        holder.appendChild(b);
      });
    }
    div.appendChild(holder); box.appendChild(div);
  });
}
$$('.style-btn').forEach(b=>b.onclick=()=>{
  state.style=b.dataset.style;
  $$('.style-btn').forEach(x=>x.classList.toggle('active',x===b));
  renderBuilder();
});
$('#btnRandom').onclick=()=>{
  const lim={face:3,eyes:7,brows:4,mouth:6,hair:8,acc:8,cheek:2,fx:7};
  state.skin=Math.floor(Math.random()*SKINS.length);
  Object.keys(lim).forEach(k=>state[k]=Math.floor(Math.random()*lim[k]));
  renderControls(); renderBuilder();
};
function downloadCanvas(canvas,name){
  canvas.toBlob(b=>{
    const a=document.createElement('a');
    a.href=URL.createObjectURL(b); a.download=name; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  },'image/png');
}
function svgToCanvas(svg,size,cb){
  const im=new Image();
  im.onload=()=>{const c=document.createElement('canvas'); c.width=c.height=size;
    c.getContext('2d').drawImage(im,0,0,size,size); cb(c);};
  im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
$('#btnDownload').onclick=()=>{
  const s=+$('#dlSize').value;
  svgToCanvas(buildSVG(),s,c=>downloadCanvas(c,'emoji-'+state.style+'-'+s+'.png'));
};
$('#btnSave').onclick=()=>{
  svgToCanvas(buildSVG(),160,c=>{
    const mine=JSON.parse(localStorage.getItem('ek_mine')||'[]');
    mine.unshift({d:c.toDataURL('image/png'),t:Date.now()});
    localStorage.setItem('ek_mine',JSON.stringify(mine.slice(0,24)));
    renderMine(); toast(t('toast_save'));
  });
};
$('#btnToLab').onclick=()=>{ setLabSource(builderImg,'বিল্ডার ইমোজি / Builder emoji'); goTab('lab'); };

/* ---------- AI স্টুডিও (প্রম্পট → ইমোজি) ---------- */
const PROMPT_RULES=[
 [['রাগ','angry','rage'],'brows',3], [['রাগ','angry'],'eyes',6], [['রাগ','angry'],'mouth',3],
 [['খুশি','happy','smile','হাসি'],'mouth',0], [['হাসি','laugh','lol','হাহা'],'mouth',1],
 [['দুঃখ','sad','কান্না','cry'],'mouth',3], [['দুঃখ','sad','কান্না','cry'],'fx',3],
 [['ভালোবাসা','love','প্রেম'],'eyes',3], [['ভালোবাসা','love','প্রেম'],'fx',2],
 [['চশমা','glasses'],'acc',1], [['সানগ্লাস','sunglass','cool'],'acc',2],
 [['টুপি','cap','ক্যাপ'],'hair',7], [['মুকুট','crown','king','রাজা'],'acc',6],
 [['হেডফোন','headphone'],'acc',4], [['গান','music','সংগীত'],'fx',6],
 [['তারা','star','তারাকা'],'eyes',2], [['তারা','star'],'fx',1],
 [['ঘুম','sleep','ঘুমন্ত'],'eyes',5], [['ঘুম','sleep'],'fx',5],
 [['জিভ','tongue'],'mouth',5], [['অবাক','surprise','wow','চমক'],'mouth',4],
 [['অবাক','surprise','wow','চমক'],'brows',2], [['কোঁকড়া','curly'],'hair',2],
 [['আফ্রো','afro'],'hair',3], [['লম্বা চুল','long hair'],'hair',4], [['মোহক','mohawk'],'hair',5],
 [['গোঁফ','mustache'],'acc',5], [['পার্টি','party'],'acc',3], [['পার্টি','party'],'fx',1],
 [['ভয়','fear','scared'],'fx',4], [['উইংক','wink'],'eyes',4],
 [['লাল','red'],'skin',7], [['হলুদ','yellow'],'skin',0], [['বাদামি','brown'],'skin',4],
 [['গাঢ়','dark'],'skin',5], [['মিন্ট','mint'],'skin',6],
 [['5d','৫ডি','holo'],'STYLE','5d'], [['3d','৩ডি'],'STYLE','3d'], [['2d','২ডি','flat'],'STYLE','2d'],
];
$('#btnPrompt').onclick=()=>{
  const txt=($('#promptInput').value||'').toLowerCase();
  if(!txt.trim()){ $('#btnRandom').onclick(); return; }
  PROMPT_RULES.forEach(r=>{
    if(r[0].some(k=>txt.includes(k))){
      if(r[1]==='STYLE'){ state.style=r[2]; $$('.style-btn').forEach(x=>x.classList.toggle('active',x.dataset.style===r[2])); }
      else state[r[1]]=r[2];
    }
  });
  renderControls(); renderBuilder(); toast(t('toast_done'));
};
$('#promptInput').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#btnPrompt').onclick(); });

/* =================================================
   ছবি → ইমোজি
================================================= */
const imgState={shape:'none',bg:0,tol:45,fx:'none',size:256,src:null,style:'none',depth:65,mode:'image',text:'WOW',textColor:'#ffd93b',textOut:'#7c3aed',textOutW:26,gradOn:true,rainbow:false,font:0,zoom:100};
const dz=$('#dropZone'), fi=$('#fileInput');
dz.addEventListener('click',()=>fi.click());
dz.addEventListener('dragover',e=>{e.preventDefault(); dz.classList.add('drag');});
dz.addEventListener('dragleave',()=>dz.classList.remove('drag'));
dz.addEventListener('drop',e=>{e.preventDefault(); dz.classList.remove('drag'); if(e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);});
fi.addEventListener('change',()=>{ if(fi.files[0]) loadFile(fi.files[0]); });
function loadFile(f){
  if(!f.type.startsWith('image/')){ toast(t('toast_warn')); return; }
  const r=new FileReader();
  r.onload=()=>{ const im=new Image(); im.onload=()=>{ imgState.src=im;
      setImgMode('image');
      $('#imgPreviewWrap').hidden=false; $('#imgActions').hidden=false; dz.hidden=true;
      renderImage(); };
    im.src=r.result; };
  r.readAsDataURL(f);
}
$('#btnImgClear').onclick=()=>{ imgState.src=null; dz.hidden=false; $('#imgPreviewWrap').hidden=true; $('#imgActions').hidden=true; };

/* বেস ইমোজি সিলেক্টর */
const BASE_EMOJIS=['😄','😂','','😭','😡','🤔','🥳','😴','😎','🤓','👍','🙏','💪','🙌','❤️','💯','⭐','🔥','','🐟','','🌂'];
(function(){
  const box=$('#baseEmojis');
  BASE_EMOJIS.forEach(e=>{
    const b=document.createElement('button'); b.textContent=e;
    b.onclick=()=>{
      const c=document.createElement('canvas'); c.width=c.height=256;
      const x=c.getContext('2d');
      x.font='200px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif';
      x.textAlign='center'; x.textBaseline='middle';
      x.fillText(e,128,140);
      imgState.src=c;
      setImgMode('image');
      $('#imgPreviewWrap').hidden=false; $('#imgActions').hidden=false; dz.hidden=true;
      renderImage();
    };
    box.appendChild(b);
  });
})();

function chipGroup(id,cb){
  $$('#'+id+' .chip').forEach(ch=>ch.onclick=()=>{
    $$('#'+id+' .chip').forEach(x=>x.classList.toggle('active',x===ch));
    cb(ch.dataset.v);
  });
}
chipGroup('shapeChips',v=>{imgState.shape=v; renderImage();});
chipGroup('bgChips',v=>{imgState.bg=+v; renderImage();});
chipGroup('fxChips',v=>{imgState.fx=v; renderImage();});
chipGroup('sizeChips',v=>{imgState.size=+v; renderImage();});
chipGroup('styleChips',v=>{imgState.style=v; renderImage();});
$('#stDepth').addEventListener('input',e=>{imgState.depth=+e.target.value; renderImage();});
function setImgMode(v){
  imgState.mode=v;
  $$('#modeChips .chip').forEach(x=>x.classList.toggle('active',x.dataset.v===v));
  $('#textGroup').style.display=v==='text'?'':'none';
  if(v==='text'){ $('#imgPreviewWrap').hidden=false; $('#imgActions').hidden=false; $('#dropZone').hidden=true; }
  else if(!imgState.src){ $('#imgPreviewWrap').hidden=true; $('#imgActions').hidden=true; $('#dropZone').hidden=false; }
}
chipGroup('modeChips',v=>{ setImgMode(v); renderImage(); });
['#stText','#stOutW','#stZoom'].forEach(s=>$(s).addEventListener('input',e=>{
  if(s==='#stText') imgState.text=e.target.value;
  else if(s==='#stOutW') imgState.textOutW=+e.target.value;
  else { imgState.zoom=+e.target.value; $('#stZoomVal').textContent=imgState.zoom; }
  renderImage();
}));
['#stColor','#stOut'].forEach(s=>$(s).addEventListener('input',e=>{
  if(s==='#stColor') imgState.textColor=e.target.value; else imgState.textOut=e.target.value;
  renderImage();
}));
$('#stFont').onchange=e=>{ imgState.font=+e.target.value; renderImage(); };
['#stGradOn','#stRainbow'].forEach(s=>$(s).addEventListener('change',e=>{
  if(s==='#stGradOn') imgState.gradOn=e.target.checked; else imgState.rainbow=e.target.checked;
  renderImage();
}));
$('#bgTol').addEventListener('input',e=>{imgState.tol=+e.target.value; renderImage();});

function processedSquare(src,res){
  const c=document.createElement('canvas'); c.width=c.height=res;
  const x=c.getContext('2d');
  const s=Math.min(src.width,src.height);
  const sx=(src.width-s)/2, sy=(src.height-s)/2;
  x.drawImage(src,sx,sy,s,s,0,0,res,res);
  if(imgState.bg){
    const d=x.getImageData(0,0,res,res), p=d.data;
    const corners=[[0,0],[res-1,0],[0,res-1],[res-1,res-1]];
    let r=0,g=0,b=0;
    corners.forEach(([cx,cy])=>{const i=(cy*res+cx)*4; r+=p[i]; g+=p[i+1]; b+=p[i+2];});
    r/=4; g/=4; b/=4;
    const tol=imgState.tol, soft=tol*0.6;
    for(let i=0;i<p.length;i+=4){
      const dist=Math.sqrt((p[i]-r)**2+(p[i+1]-g)**2+(p[i+2]-b)**2);
      if(dist<tol) p[i+3]=0;
      else if(dist<tol+soft) p[i+3]=Math.round(p[i+3]*(dist-tol)/soft);
    }
    x.putImageData(d,0,0);
  }
  return c;
}
function cssFilter(f){
  if(f==='gray') return 'grayscale(1)';
  if(f==='sepia') return 'sepia(1)';
  if(f==='invert') return 'invert(1)';
  if(f==='saturate') return 'saturate(1.8) contrast(1.1)';
  if(f==='warm') return 'sepia(.28) saturate(1.35) hue-rotate(-12deg)';
  if(f==='cool') return 'saturate(1.2) hue-rotate(18deg) brightness(1.03)';
  return 'none';
}
function shapeClip(x,res){
  if(imgState.shape==='circle'){ x.beginPath(); x.arc(res/2,res/2,res/2-4,0,Math.PI*2); x.clip(); }
  if(imgState.shape==='round'){ const r=90; x.beginPath(); x.moveTo(r,4); x.arcTo(res-4,4,res-4,res-4,r); x.arcTo(res-4,res-4,4,res-4,r); x.arcTo(4,res-4,4,4,r); x.arcTo(4,4,res-4,4,r); x.closePath(); x.clip(); }
}
const TEXT_FONTS=["'Arial Black', Arial, sans-serif","'Comic Sans MS','Chalkboard SE',cursive","'Noto Sans Bengali','Hind Siliguri','Vrinda',sans-serif","Georgia,'Times New Roman',serif","'Courier New',monospace"];
function textSubject(res){
  const c=document.createElement('canvas'); c.width=c.height=res;
  const x=c.getContext('2d');
  const txt=(imgState.text||'').trim()||'WOW';
  const k=res/512;
  const fam=TEXT_FONTS[imgState.font||0];
  x.font='bold '+Math.round(200*k)+'px '+fam;
  const w0=x.measureText(txt).width;
  const fit=Math.min(200*k, 200*k*(res*0.84)/Math.max(1,w0), 260*k/Math.max(1,[...txt].length*0.32));
  x.font='bold '+Math.round(fit)+'px '+fam;
  x.textAlign='center'; x.textBaseline='middle'; x.lineJoin='round';
  const cy=res/2+res*0.02;
  if(imgState.textOutW>0){ x.lineWidth=imgState.textOutW*k; x.strokeStyle=imgState.textOut; x.strokeText(txt,res/2,cy); }
  let chars=[...txt];
  if(typeof Intl!=='undefined'&&Intl.Segmenter){
    try{ chars=[...new Intl.Segmenter('bn',{granularity:'grapheme'}).segment(txt)].map(s=>s.segment); }catch(e){}
  }
  if(imgState.rainbow&&chars.length>1){
    const ws=chars.map(ch=>x.measureText(ch).width);
    const total=ws.reduce((a,b)=>a+b,0);
    let px=res/2-total/2;
    x.textAlign='left';
    chars.forEach((ch,i)=>{
      if(imgState.textOutW>0){ x.lineWidth=imgState.textOutW*k; x.strokeStyle=imgState.textOut; x.strokeText(ch,px,cy); }
      x.fillStyle=`hsl(${Math.round(i*360/chars.length)},92%,60%)`;
      x.fillText(ch,px,cy);
      px+=ws[i];
    });
  } else {
    if(imgState.gradOn){
      const g=x.createLinearGradient(0,res*0.18,0,res*0.85);
      g.addColorStop(0,imgState.textColor); g.addColorStop(1,shade(imgState.textColor,-55));
      x.fillStyle=g;
    } else x.fillStyle=imgState.textColor;
    x.fillText(txt,res/2,cy);
  }
  return c;
}
function renderImage(target){
  const res=512;
  let base=null;
  if(imgState.mode==='text') base=textSubject(res);
  else { if(!imgState.src) return null; base=processedSquare(imgState.src,res); }
  const subj=document.createElement('canvas'); subj.width=subj.height=res;
  const sx=subj.getContext('2d');
  sx.save(); shapeClip(sx,res);
  const zm=((imgState.zoom||100)/100)*(imgState.shape==='cover'?1:0.94);
  sx.translate(res/2,res/2); sx.scale(zm,zm); sx.translate(-res/2,-res/2);
  const f=imgState.fx;
  if(f!=='neon') sx.filter=cssFilter(f);
  if(f==='neon'){ sx.shadowColor='#ff2fd6'; sx.shadowBlur=42; sx.drawImage(base,0,0); sx.shadowColor='#2dd4bf'; sx.shadowBlur=26; }
  sx.drawImage(base,0,0);
  sx.restore();
  const out=target||$('#imgCanvas');
  out.width=out.height=res;
  const x=out.getContext('2d');
  x.clearRect(0,0,res,res);
  if(imgState.style==='3d'||imgState.style==='5d') imgStyleRender(x,subj);
  else x.drawImage(subj,0,0);
  return out;
}
/* 2D/3D/5D depth-extrusion renderer (তেজোফি স্টুডিও ইঞ্জিন) */
function imgSil(subj,color){
  const s=document.createElement('canvas'); s.width=s.height=512;
  const g=s.getContext('2d');
  g.drawImage(subj,0,0);
  g.globalCompositeOperation='source-atop';
  g.fillStyle=color; g.fillRect(0,0,512,512);
  return s;
}
function imgStyleRender(x,subj){
  const res=512, d=imgState.depth/100, is5=imgState.style==='5d';
  x.save(); x.translate(res/2,res/2);
  if(imgState.style==='2d'){ x.drawImage(subj,-res/2,-res/2); x.restore(); return; }
  if(is5){
    x.save(); x.globalAlpha=.35; x.filter='blur(16px)'; x.drawImage(imgSil(subj,'#8b5cf6'),-res/2,-res/2); x.restore();
    x.save(); x.globalAlpha=.28;
    x.drawImage(imgSil(subj,'#22d3ee'),-res/2-3,-res/2-4);
    x.drawImage(imgSil(subj,'#f43f5e'),-res/2+3,-res/2+2);
    x.restore();
  }
  const dark=imgSil(subj,'#0b0d1a');
  const depthN=is5?Math.round(10+16*d):Math.round(4+8*d);
  const ox=(is5?15:9)*(.35+d), oy=ox*.8;
  for(let i=depthN;i>=1;i--){
    const f=i/depthN;
    x.globalAlpha=(is5?.5:.38)*(1-f*.55);
    x.drawImage(dark,-res/2+ox*f*(is5?1.5:1),-res/2+oy*f*(is5?1.5:1));
  }
  x.globalAlpha=1;
  if(is5){
    x.save(); x.globalAlpha=.3;
    x.drawImage(imgSil(subj,'#ff2255'),-res/2-2.5,-res/2);
    x.drawImage(imgSil(subj,'#2255ff'),-res/2+2.5,-res/2);
    x.restore();
  }
  x.drawImage(subj,-res/2,-res/2);
  const gl=document.createElement('canvas'); gl.width=gl.height=res;
  const gg=gl.getContext('2d');
  gg.drawImage(subj,0,0);
  gg.globalCompositeOperation='source-atop';
  const g1=gg.createLinearGradient(40,20,400,470);
  g1.addColorStop(0,'rgba(255,255,255,'+((is5?.55:.42)*(.4+.6*d)).toFixed(3)+')');
  g1.addColorStop(.42,'rgba(255,255,255,0.05)');
  g1.addColorStop(1,'rgba(255,255,255,0)');
  gg.fillStyle=g1; gg.fillRect(0,0,res,res);
  const r1=gg.createRadialGradient(165,118,8,165,118,200);
  r1.addColorStop(0,'rgba(255,255,255,'+((is5?.8:.55)*(.35+.65*d)).toFixed(3)+')');
  r1.addColorStop(1,'rgba(255,255,255,0)');
  gg.fillStyle=r1; gg.fillRect(0,0,res,res);
  if(is5){
    const r2=gg.createRadialGradient(400,430,8,400,430,170);
    r2.addColorStop(0,'rgba(120,190,255,0.28)'); r2.addColorStop(1,'rgba(120,190,255,0)');
    gg.fillStyle=r2; gg.fillRect(0,0,res,res);
  }
  x.drawImage(gl,-res/2,-res/2);
  if(is5&&d>.35){
    x.save(); x.globalCompositeOperation='lighter';
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      x.globalAlpha=.45; x.fillStyle='#fff';
      x.beginPath(); x.arc(Math.cos(a)*215,Math.sin(a)*215,3,0,Math.PI*2); x.fill();
    }
    x.restore();
  }
  x.restore();
}
$('#btnImgDownload').onclick=()=>{
  const full=renderImage(document.createElement('canvas'));
  const c=document.createElement('canvas'); c.width=c.height=imgState.size;
  c.getContext('2d').drawImage(full,0,0,imgState.size,imgState.size);
  downloadCanvas(c,'emoji-photo-'+imgState.size+'.png');
};
$('#btnImgToLab').onclick=()=>{
  const full=renderImage(document.createElement('canvas'));
  setLabSource(full,'ছবি ইমোজি / Photo emoji'); goTab('lab');
};

/* =================================================
   অ্যানিমেশন ল্যাব — ৮৩ অ্যানিমেশন + সিন + স্টিকার
================================================= */
/* =================================================
   অ্যানিমেশন ল্যাব — ৮৩টি অ্যানিমেশন, ৬ ক্যাটাগরি, কাস্টোমাইজেশন
================================================= */
const ANIMS=[
 /* 🎯 মোশন */
 {id:'bounce',l:['⬆️ বাউন্স','⬆️ Bounce'],cat:'motion',p:['int']},
 {id:'spin',l:['🔄 স্পিন','🔄 Spin'],cat:'motion',p:['int']},
 {id:'oscillate',l:['🎯 অসিলেট','🎯 Oscillate'],cat:'motion',p:['int']},
 {id:'float',l:['🎈 ফ্লোট',' Float'],cat:'motion',p:['int']},
 {id:'shake',l:['🫨 শেক','🫨 Shake'],cat:'motion',p:['int']},
 {id:'jello',l:['🍮 জেলো','🍮 Jello'],cat:'motion',p:['int']},
 {id:'skew',l:['📐 স্কিউ','📐 Skew'],cat:'motion',p:['int']},
 {id:'spiral',l:['🌀 স্পাইরাল','🌀 Spiral'],cat:'motion',p:['int']},
 {id:'pulse',l:['💫 পালস','💫 Pulse'],cat:'motion',p:['int']},
 {id:'zoom',l:['🔍 জুম','🔍 Zoom'],cat:'motion',p:['int']},
 {id:'heartbeat',l:['💓 হার্টবিট','💓 Heartbeat'],cat:'motion',p:['int']},
 {id:'swing',l:['🌿 সুইং','🌿 Swing'],cat:'motion',p:['int']},
 {id:'zigzag',l:['⚡ জিগজ্যাগ','⚡ Zigzag'],cat:'motion',p:['int']},
 {id:'scrollv',l:['📜 স্ক্রল ↕',' Scroll ↕'],cat:'motion',p:[]},
 {id:'scrollh',l:['📜 স্ক্রল ↔','📜 Scroll ↔'],cat:'motion',p:[]},
 {id:'wobble',l:[' ওবল','🫨 Wobble'],cat:'motion',p:['int']},
 {id:'flip',l:['🪙 ফ্লিপ','🪙 Flip'],cat:'motion',p:['int']},
 {id:'roll',l:['🎢 রোল','🎢 Roll'],cat:'motion',p:['int']},
 {id:'drift',l:['🍃 ড্রিফট','🍃 Drift'],cat:'motion',p:['int']},
 {id:'orbit',l:['🪐 অরবিট','🪐 Orbit'],cat:'motion',p:['int']},
 {id:'rubber',l:['🎯 রাবার','🎯 Rubber'],cat:'motion',p:['int']},
 {id:'tilt',l:['📏 টিল্ট','📏 Tilt'],cat:'motion',p:['int']},
 {id:'jumpspin',l:['🤸 জাম্প-স্পিন','🤸 Jump-spin'],cat:'motion',p:['int']},
 {id:'quake',l:['🌋 ভূকম্প','🌋 Quake'],cat:'motion',p:['int']},
 {id:'slide',l:['🛝 স্লাইড','🛝 Slide'],cat:'motion',p:['int']},
 /* ✨ পার্টিকেল */
 {id:'confetti',l:['🎊 কনফেত্তি','🎊 Confetti'],cat:'particles',p:['cnt','siz']},
 {id:'stars',l:['⭐ তারা','⭐ Stars'],cat:'particles',p:['cnt','siz']},
 {id:'stardust',l:['✨ স্টারডাস্ট','✨ Stardust'],cat:'particles',p:['cnt']},
 {id:'hearts',l:['💖 হার্টস','💖 Hearts'],cat:'particles',p:['cnt','siz']},
 {id:'fireworks',l:['🎆 ফায়ারওয়ার্কস','🎆 Fireworks'],cat:'particles',p:['cnt']},
 {id:'explode',l:['💥 এক্সপ্লোড','💥 Explode'],cat:'particles',p:['cnt']},
 {id:'bubbles',l:[' বুদবুদ','🫧 Bubbles'],cat:'particles',p:['cnt','siz']},
 {id:'balloons',l:['🎈 বেলুন','🎈 Balloons'],cat:'particles',p:['cnt','siz']},
 {id:'leaves',l:['🍂 পাতা','🍂 Leaves'],cat:'particles',p:['cnt','siz']},
 {id:'petals',l:['🌸 পাপড়ি','🌸 Petals'],cat:'particles',p:['cnt','siz']},
 {id:'glitter',l:['✨ গ্লিটার','✨ Glitter'],cat:'particles',p:['cnt']},
 {id:'coins',l:['🪙 কয়েন বৃষ্টি','🪙 Coin rain'],cat:'particles',p:['cnt','siz']},
 {id:'notes',l:['🎵 নোটস','🎵 Notes'],cat:'particles',p:['cnt','siz']},
 {id:'emojirain',l:['😜 ইমোজি বৃষ্টি','😜 Emoji rain'],cat:'particles',p:['cnt','siz']},
 {id:'smoke',l:['💨 ধোঁয়া','💨 Smoke'],cat:'particles',p:['cnt']},
 {id:'loveburst',l:['💘 লাভ বার্স্ট','💘 Love burst'],cat:'particles',p:['cnt']},
 /* 🌦️ আবহাওয়া */
 {id:'fire',l:['🔥 ফায়ার','🔥 Fire'],cat:'weather',p:['int','cnt']},
 {id:'frozen',l:['❄️ ফ্রোজেন','❄️ Frozen'],cat:'weather',p:['int','cnt']},
 {id:'rain',l:['🌧️ বৃষ্টি','🌧️ Rain'],cat:'weather',p:['int','cnt']},
 {id:'rainbowrain',l:['🌦️ রেইনবো বৃষ্টি','🌦️ Rainbow rain'],cat:'weather',p:['cnt']},
 {id:'storm',l:['⛈️ ঝড়','⛈️ Storm'],cat:'weather',p:['int','cnt']},
 {id:'snowfall',l:['🌨️ তুষারপাত','🌨️ Snowfall'],cat:'weather',p:['cnt','siz']},
 {id:'wind',l:['💨 োড়ো হাওয়া','💨 Wind'],cat:'weather',p:['int']},
 {id:'fog',l:['🌫️ কুয়াশা','🌫️ Fog'],cat:'weather',p:['int']},
 {id:'heat',l:['🥵 তাপঢেউ','🥵 Heat wave'],cat:'weather',p:['int']},
 {id:'underwater',l:['🌊 আন্ডারওয়াটার','🌊 Underwater'],cat:'weather',p:['int']},
 /* 🎨 কালার FX */
 {id:'rainbow',l:['🌈 রেইনবো','🌈 Rainbow'],cat:'color',p:['int']},
 {id:'neon',l:['💡 নিয়ন','💡 Neon'],cat:'color',p:['int']},
 {id:'huecycle',l:['🎨 হিউ সাইকেল','🎨 Hue cycle'],cat:'color',p:['int']},
 {id:'flash',l:['📸 ফ্ল্যাশ','📸 Flash'],cat:'color',p:['int']},
 {id:'invertpulse',l:['🔄 ইনভার্ট পালস','🔄 Invert pulse'],cat:'color',p:['int']},
 {id:'vaporwave',l:['🌇 ভেপরওয়েভ','🌇 Vaporwave'],cat:'color',p:['int']},
 {id:'xray',l:['🩻 এক্স-রে','🩻 X-ray'],cat:'color',p:[]},
 {id:'gold',l:['🏅 গোল্ডেন','🏅 Golden'],cat:'color',p:[]},
 /* 🕹️ রেট্রো/সিন */
 {id:'glitch',l:['👾 গ্লিচ','👾 Glitch'],cat:'retro',p:['int']},
 {id:'matrix',l:['🟩 ম্যাট্রিক্স','🟩 Matrix'],cat:'retro',p:['int','cnt']},
 {id:'space',l:['🚀 স্পেস ট্রাভেল','🚀 Space travel'],cat:'retro',p:['int']},
 {id:'synthwave',l:['🌆 সিন্থওয়েভ','🌆 Synthwave'],cat:'retro',p:[]},
 {id:'crt',l:['📺 CRT','📺 CRT'],cat:'retro',p:['int']},
 {id:'vhs',l:['📼 VHS','📼 VHS'],cat:'retro',p:['int']},
 {id:'pixelate',l:['👾 পিক্সেলেট','👾 Pixelate'],cat:'retro',p:['siz']},
 {id:'gameboy',l:['🎮 গেমবয়','🎮 Gameboy'],cat:'retro',p:[]},
 {id:'disco',l:['🪩 ডিস্কো','🪩 Disco'],cat:'retro',p:['int']},
 {id:'spotlight',l:['🔦 স্পটলাইট','🔦 Spotlight'],cat:'retro',p:['int']},
 {id:'static',l:['📡 TV স্ট্যাটিক','📡 TV static'],cat:'retro',p:['int']},
 {id:'film',l:['🎞️ ওল্ড ফিল্ম','🎞️ Old film'],cat:'retro',p:['int']},
 /* 😂 মিম/ফান */
 {id:'party',l:['🎉 পার্টি','🎉 Party'],cat:'meme',p:['cnt']},
 {id:'fine',l:['☕ দিস ইজ ফাইন','☕ This is fine'],cat:'meme',p:['int']},
 {id:'nyan',l:['🌈 নিয়ান ট্রেইল','🌈 Nyan trail'],cat:'meme',p:['int']},
 {id:'moon',l:['🚀 চাঁদে যাওয়া','🚀 To the moon'],cat:'meme',p:['int']},
 {id:'slap',l:['👋 স্ল্যাপ','👋 Slap'],cat:'meme',p:['int']},
 {id:'boing',l:['🦘 বইং','🦘 Boing'],cat:'meme',p:['int']},
 {id:'tada',l:['🎊 টাডা!','🎊 Tada!'],cat:'meme',p:['int']},
 {id:'mindblown',l:['🤯 মাইন্ড ব্লোন','🤯 Mind blown'],cat:'meme',p:['int']},
 {id:'pet',l:['🤗 প্যাট প্যাট','🤗 Pat pat'],cat:'meme',p:[]},
 {id:'crab',l:['🦀 ক্র্যাব রেভ','🦀 Crab rave'],cat:'meme',p:['int']},
 {id:'conga',l:['🚶 কংগা লাইন','🚶 Conga line'],cat:'meme',p:['int']},
 {id:'deepfry',l:['🍳 ডিপ ফ্রাই','🍳 Deep fry'],cat:'meme',p:['int']},
];
const ACATS=[['all','🌟 সব','🌟 All'],['motion','🎯 মোশন','🎯 Motion'],['particles','✨ পার্টিকেল','✨ Particles'],
 ['weather','🌦️ আবহাওয়া','🌦️ Weather'],['color','🎨 কালার FX','🎨 Color FX'],['retro','🕹️ রেট্রো/সিন','🕹️ Retro/Scene'],['meme','😂 মিম/ফান','😂 Meme/Fun']];
const PDEFS={int:['তীব্রতা','Intensity'],cnt:['কণা সংখ্যা','Particles'],siz:['আকার','Size']};
const STICKERS=[['none','🚫'],['heart','❤️'],['star','⭐'],['party','🎉'],['laugh','😂'],['fire','🔥'],['bd','🇧🇩'],['lol','LOL']];
const lab={anim:'bounce',speed:1,dir:1,size:256,qual:24,color:'none',scene:'transparent',sticker:'none',bgImg:null,src:null,label:'',fx:{},acat:'all',layers:[],sel:null,edit:false};
const pv=k=>(lab.fx[k]!==undefined?+lab.fx[k]:50)/50;
const tri=p=>2*Math.abs(2*(p-Math.floor(p+.5)))-1;
const rnd=(i,s)=>{const x=Math.sin(i*127.1+s*311.7)*43758.5453;return x-Math.floor(x);};

function renderAnimChips(){
  const L=LANG==='bn'?0:1;
  const cats=$('#animCats'); cats.innerHTML='';
  ACATS.forEach(c=>{
    const b=document.createElement('button'); b.className='chip'+(lab.acat===c[0]?' active':'');
    b.textContent=c[1+L];
    b.onclick=()=>{lab.acat=c[0]; renderAnimChips();};
    cats.appendChild(b);
  });
  const box=$('#animChips'); box.innerHTML='';
  ANIMS.filter(a=>lab.acat==='all'||a.cat===lab.acat).forEach(a=>{
    const b=document.createElement('button'); b.className='chip'+(a.id===lab.anim?' active':'');
    b.textContent=a.l[L]; b.title=a.cat;
    b.onclick=()=>{ lab.anim=a.id; lab.fx={}; renderAnimChips(); };
    box.appendChild(b);
  });
  const cur=ANIMS.find(a=>a.id===lab.anim)||{p:[]};
  const fp=$('#fxParams'); fp.innerHTML='';
  cur.p.forEach(k=>{
    const d=document.createElement('div'); d.className='fp';
    d.innerHTML=`<span>${PDEFS[k][L]}</span><input type="range" min="0" max="100" value="${lab.fx[k]!==undefined?lab.fx[k]:50}"><b>${lab.fx[k]!==undefined?lab.fx[k]:50}</b>`;
    const r=d.querySelector('input'), o=d.querySelector('b');
    r.oninput=()=>{ lab.fx[k]=+r.value; o.textContent=r.value; };
    fp.appendChild(d);
  });
}
function renderStickers(){
  const box=$('#stickerChips'); box.innerHTML='';
  STICKERS.forEach(s=>{
    const b=document.createElement('button'); b.className='chip'+(s[0]===lab.sticker?' active':'');
    b.textContent=s[1]+(LANG==='bn'?'':' '+s[0]);
    b.onclick=()=>{ lab.sticker=s[0]; renderStickers(); };
    box.appendChild(b);
  });
}
function setLabSource(src,label){ lab.src=src; lab.label=label; $('#labSourceInfo').textContent='✅ '+label; }
$('#labSpeed').onchange=e=>lab.speed=+e.target.value;
$('#labDir').onchange=e=>lab.dir=+e.target.value;
$('#labSize').onchange=e=>lab.size=+e.target.value;
$('#labQual').onchange=e=>lab.qual=+e.target.value;
$('#labColor').onchange=e=>lab.color=e.target.value;
$('#labScene').onchange=e=>lab.scene=e.target.value;
$('#bgUpload').onchange=e=>{
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{const im=new Image(); im.onload=()=>{lab.bgImg=im; lab.scene='custom'; $('#labScene').value='custom';}; im.src=r.result;};
  r.readAsDataURL(f);
};
const PLATS={none:{size:256,limit:0},discord:{size:128,limit:262144},slack:{size:128,limit:65536},twitch:{size:112,limit:25600},teams:{size:192,limit:524288}};
function updatePlatHint(){
  const p=$('#platSel').value;
  $('#platHint').textContent=t('ph_'+p);
  if(p!=='none'){ $('#labSize').value=PLATS[p].size; lab.size=PLATS[p].size; }
}
$('#platSel').onchange=updatePlatHint;

/* ---------- সিন ব্যাকগ্রাউন্ড ---------- */
function drawScene(x,W,u){
  const sc=lab.scene;
  if(sc==='transparent'){ x.clearRect(0,0,W,W); return; }
  if(sc==='dark'){ x.fillStyle='#14162e'; x.fillRect(0,0,W,W); return; }
  if(sc==='gradient'){ const g=x.createLinearGradient(0,0,W,W); g.addColorStop(0,'#ff5c8a'); g.addColorStop(1,'#7c5cff'); x.fillStyle=g; x.fillRect(0,0,W,W); return; }
  if(sc==='space'||lab.anim==='space'){
    x.fillStyle='#050614'; x.fillRect(0,0,W,W);
    for(let i=0;i<22;i++){ const tw=.4+.6*Math.abs(Math.sin(u*2+i)); x.globalAlpha=tw; x.fillStyle='#fff';
      x.fillRect(rnd(i,1)*W, rnd(i,2)*W, 2, 2); }
    x.globalAlpha=1; return;
  }
  if(sc==='synthwave'){ drawSynth(x,W,u); return; }
  if(sc==='custom'&&lab.bgImg){
    const im=lab.bgImg, s=Math.max(W/im.width,W/im.height);
    x.drawImage(im,(W-im.width*s)/2,(W-im.height*s)/2,im.width*s,im.height*s); return;
  }
  x.fillStyle='#14162e'; x.fillRect(0,0,W,W);
}
function drawSynth(x,W,u){
  const g=x.createLinearGradient(0,0,0,W);
  g.addColorStop(0,'#1a0533'); g.addColorStop(.55,'#3b0f63'); g.addColorStop(1,'#0d0221');
  x.fillStyle=g; x.fillRect(0,0,W,W);
  const sg=x.createRadialGradient(W/2,W*.55,10,W/2,W*.55,W*.3);
  sg.addColorStop(0,'#ffd93b'); sg.addColorStop(.6,'#ff5c8a'); sg.addColorStop(1,'rgba(255,92,138,0)');
  x.fillStyle=sg; x.beginPath(); x.arc(W/2,W*.55,W*.28,Math.PI,0); x.fill();
  x.strokeStyle='rgba(45,212,191,.7)'; x.lineWidth=2;
  const hy=W*.62;
  for(let i=0;i<8;i++){ const yy=hy+Math.pow(i/8,1.8)*(W-hy); x.beginPath(); x.moveTo(0,yy); x.lineTo(W,yy); x.stroke(); }
  for(let i=-6;i<=6;i++){ x.beginPath(); x.moveTo(W/2+i*W*.09,hy); x.lineTo(W/2+i*W*.35,W); x.stroke(); }
}

/* ---------- ট্রান্সফর্ম ---------- */
function getTF(id,u,W,dir){
  const I=pv('int'), r={dx:0,dy:0,rot:0,sx:1,sy:1,kx:0,j:0};
  switch(id){
    case 'bounce': r.dy=-Math.abs(Math.sin(u*3))*W*.15*I; break;
    case 'spin': r.rot=u*2.4*dir; break;
    case 'oscillate': r.rot=Math.sin(u*4)*.35*I; break;
    case 'float': r.dy=Math.sin(u*2)*W*.06*I; r.rot=Math.sin(u*1.3)*.07*I; break;
    case 'shake': r.dx=Math.sin(u*22)*W*.03*I; r.rot=Math.sin(u*22)*.08*I; break;
    case 'jello': r.j=Math.sin(u*6)*.18*I; break;
    case 'skew': r.kx=Math.sin(u*4)*.35*dir*I; break;
    case 'spiral': r.rot=u*3*dir; r.sx=r.sy=.75+.25*Math.sin(u*2); break;
    case 'pulse': r.sx=r.sy=1+Math.sin(u*4)*.12*I; break;
    case 'zoom': r.sx=r.sy=1+.4*Math.abs(Math.sin(u*1.5))*I; break;
    case 'heartbeat': { const p=(u*1.6)%1; r.sx=r.sy=1+(p<.14?Math.sin(p/.14*Math.PI)*.22:(p<.28?Math.sin((p-.14)/.14*Math.PI)*.14:0))*I; break; }
    case 'swing': r.rot=Math.sin(u*2.5)*.4*I; r.dy=-W*.05; break;
    case 'zigzag': r.dx=tri(u*.8)*W*.1*dir*I; r.dy=-Math.abs(tri(u*1.6))*W*.08*I; break;
    case 'scrollv': r.dy=(((u*.5)%1)-.5)*W*1.4; break;
    case 'scrollh': r.dx=(((u*.5)%1)-.5)*W*1.4*dir; break;
    case 'wobble': r.rot=Math.sin(u*6)*.15*I; r.kx=Math.sin(u*6+1.5)*.2*I; break;
    case 'flip': { let c=Math.cos(u*(1+I*2)); if(Math.abs(c)<.12) c=.12*(c<0?-1:1); r.sx=c; break; }
    case 'roll': r.rot=u*2*dir; r.dx=tri(u*.4)*W*.3*dir; break;
    case 'drift': r.dx=Math.sin(u*.8)*W*.12*I; r.dy=Math.cos(u*.6)*W*.09*I; break;
    case 'orbit': r.dx=Math.cos(u*2)*W*.18*I; r.dy=Math.sin(u*2)*W*.18*I; r.rot=Math.sin(u)*.1; break;
    case 'rubber': r.sx=1+.3*Math.sin(u*5)*I; r.sy=1-.3*Math.sin(u*5)*I; break;
    case 'tilt': r.rot=tri(u*.5)*.5*I; break;
    case 'jumpspin': r.dy=-Math.abs(Math.sin(u*3))*W*.2*I; r.rot=u*4*dir; break;
    case 'quake': r.dx=(rnd(Math.floor(u*30),1)-.5)*12*I; r.dy=(rnd(Math.floor(u*30),2)-.5)*12*I; break;
    case 'slide': r.dx=Math.sin(u*1.5)*W*.35*I*dir; break;
    case 'boing': r.sy=1+.4*Math.abs(Math.sin(u*4))*I; r.sx=1+(1-r.sy)*.7; r.dy=-Math.abs(Math.sin(u*4))*W*.1*I; break;
    case 'tada': { const c=(u%2); r.sx=r.sy=1+(c<.3?(c/.3)*.3*I:.3*Math.max(0,1-(c-.3)/.3)*I); if(c>.5) r.rot=Math.sin(u*10)*.1*I; break; }
    case 'slap': { const f=(u*.7)%1; if(f<.12) r.rot=(f/.12-.5)*.7*dir*I; break; }
    case 'moon': r.dy=W*.65-((u*.25)%1)*W*1.3; break;
    case 'stardust': r.dy=Math.sin(u*2)*W*.04; break;
    case 'frozen': r.dx=Math.sin(u*30)*2*I; break;
    case 'fine': r.dy=Math.sin(u*1.2)*W*.02; break;
    case 'party': r.dy=-Math.abs(Math.sin(u*3))*W*.09; r.rot=Math.sin(u*3)*.12; break;
    case 'wind': r.rot=Math.sin(u*3)*.1*I; break;
  }
  return r;
}
/* ---------- কালার ফিল্টার ---------- */
function getFL(id,u){
  const I=pv('int');
  switch(id){
    case 'rainbow': return 'hue-rotate('+((u*120*I)%360)+'deg) saturate(1.6)';
    case 'huecycle': return 'hue-rotate('+((u*40*I)%360)+'deg)';
    case 'invertpulse': return ((u*(0.5+I))%1)<.5?'invert(1)':'';
    case 'xray': return 'invert(1) hue-rotate(180deg)';
    case 'gold': return 'sepia(1) saturate(2.2) brightness(1.05)';
    case 'gameboy': return 'grayscale(1) contrast(1.2) brightness(1.1)';
    case 'deepfry': return 'saturate(3) contrast(1.7) brightness(1.1)';
    case 'vaporwave': return 'saturate(1.6) hue-rotate(-25deg)';
    case 'film': return 'sepia(.6) contrast(1.1)';
    default: return '';
  }
}
/* ---------- ওভারলে ইফেক্ট ---------- */
const OV_EMO=['😂','❤️','⭐','😜','','🎉'];
function ov(id,c,W,u,S,src){
  const I=pv('int'), cnt=Math.round(15+70*pv('cnt')), siz=pv('siz');
  switch(id){
    case 'neon': { c.save(); c.shadowColor=['#ff2fd6','#2dd4bf','#ffd93b'][Math.floor(u*3)%3]; c.shadowBlur=(20+15*Math.sin(u*6))*I; c.globalAlpha=.85; c.drawImage(src,-S/2,-S/2,S,S); c.restore(); break; }
    case 'confetti': case 'party': { for(let i=0;i<cnt;i++){ const yy=((rnd(i,2)+u*.25*(.5+rnd(i,3)/5))%1)*W; const xx=rnd(i,1)*W+Math.sin(u*2+i)*10;
      c.save(); c.translate(xx,yy); c.rotate(u*3+i); c.fillStyle=['#ff5c8a','#7c5cff','#2dd4bf','#ffd93b'][i%4];
      const s=(3+rnd(i,4)*6)*siz; c.fillRect(-s/2,-s/2,s,s*.6); c.restore(); } break; }
    case 'stars': { for(let i=0;i<cnt;i++){ const yy=(((rnd(i,2)-u*.15)%1)+1)%1*W;
      c.save(); c.translate(rnd(i,1)*W,yy); c.rotate(u+i); c.fillStyle=['#ffd93b','#fff','#2dd4bf'][i%3];
      starPath(c,(4+rnd(i,3)*8)*siz); c.fill(); c.restore(); } break; }
    case 'stardust': { for(let i=0;i<cnt;i++){ const yy=(((rnd(i,2)-u*.2)%1)+1)%1*W; const xx=W/2+Math.sin(u*2+i)*W*.4;
      c.globalAlpha=.5+.5*Math.sin(u*6+i); c.fillStyle=i%2?'#fff':'#ffd93b';
      c.save(); c.translate(xx,yy); starPath(c,4*siz); c.fill(); c.restore(); c.globalAlpha=1; } break; }
    case 'hearts': case 'loveburst': { for(let i=0;i<cnt;i++){ let xx,yy;
      if(id==='loveburst'){ const cyc=(u*.8)%1; const a=rnd(i,1)*Math.PI*2; xx=Math.cos(a)*cyc*W*.5; yy=Math.sin(a)*cyc*W*.5; c.globalAlpha=1-cyc;
        c.save(); c.translate(xx,yy); }
      else { yy=(((rnd(i,2)-u*.12)%1)+1)%1*W; xx=rnd(i,1)*W; c.save(); c.translate(xx,yy); }
      const s=(5+rnd(i,3)*8)*siz; c.fillStyle=i%2?'#ff4d6d':'#ff8fab';
      c.beginPath(); c.moveTo(0,s); c.bezierCurveTo(-s*1.4,-s*.2,-s*.7,-s*1.2,0,-s*.4);
      c.bezierCurveTo(s*.7,-s*1.2,s*1.4,-s*.2,0,s); c.fill(); c.restore(); c.globalAlpha=1; } break; }
    case 'fireworks': { const n=Math.max(1,Math.round(cnt/12)); for(let k=0;k<n;k++){ const cyc=(u*.7+rnd(k,5))%1; const cx=W*(.2+.6*rnd(k,1)), cy=W*(.2+.3*rnd(k,2));
      for(let i=0;i<14;i++){ const a=i/14*Math.PI*2; const rr=cyc*W*.22;
        c.globalAlpha=1-cyc; c.fillStyle=['#ff5c8a','#ffd93b','#2dd4bf'][i%3];
        c.beginPath(); c.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr, 3,0,7); c.fill(); } c.globalAlpha=1; } break; }
    case 'explode': case 'mindblown': { const p=(u%1.6)/1.6;
      c.strokeStyle=`rgba(255,200,60,${1-p})`; c.lineWidth=6*(1-p)+2; c.beginPath(); c.arc(0,0,p*W*.55,0,Math.PI*2); c.stroke();
      const n=Math.round(cnt/2); for(let i=0;i<n;i++){ const a=rnd(i,1)*Math.PI*2; const rr=p*W*.5*rnd(i,2)+10;
        const yy=id==='mindblown'? -S/2+Math.sin(a)*rr : Math.sin(a)*rr;
        const xx=id==='mindblown'? Math.cos(a)*rr : Math.cos(a)*rr;
        c.globalAlpha=1-p; c.fillStyle=['#ff5c8a','#ffd93b','#2dd4bf'][i%3];
        c.beginPath(); c.arc(xx,yy,3,0,7); c.fill(); c.globalAlpha=1; } break; }
    case 'bubbles': { for(let i=0;i<cnt;i++){ const yy=(((rnd(i,2)-u*.18*(0.5+rnd(i,3)))%1)+1)%1*W; const xx=rnd(i,1)*W+Math.sin(u+i)*8;
      const s=(4+rnd(i,4)*10)*siz; c.strokeStyle='rgba(200,240,255,.8)'; c.lineWidth=2;
      c.beginPath(); c.arc(xx,yy,s,0,7); c.stroke(); c.fillStyle='rgba(255,255,255,.5)'; c.beginPath(); c.arc(xx-s*.3,yy-s*.3,s*.2,0,7); c.fill(); } break; }
    case 'balloons': { for(let i=0;i<Math.min(cnt,30);i++){ const yy=(((rnd(i,2)-u*.1)%1)+1)%1*(W+80)-40; const xx=rnd(i,1)*W+Math.sin(u*1.5+i)*12;
      const s=(8+rnd(i,4)*8)*siz; c.fillStyle=['#ff5c8a','#7c5cff','#2dd4bf','#ffd93b','#ff8fab'][i%5];
      c.beginPath(); c.ellipse(xx,yy,s*.8,s,0,0,7); c.fill();
      c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=1.5; c.beginPath(); c.moveTo(xx,yy+s); c.quadraticCurveTo(xx+4,yy+s+10,xx,yy+s+20); c.stroke(); } break; }
    case 'leaves': case 'petals': { for(let i=0;i<cnt;i++){ const yy=((rnd(i,2)+u*.12*(0.5+rnd(i,3)))%1)*W; const xx=rnd(i,1)*W+Math.sin(u*2+i)*14;
      const s=(4+rnd(i,4)*6)*siz; c.save(); c.translate(xx,yy); c.rotate(u*2+i);
      c.fillStyle=id==='leaves'?['#7cb518','#a4a435','#d68c2c'][i%3]:['#ffb3c6','#ff8fab','#ffd6e0'][i%3];
      c.beginPath(); c.ellipse(0,0,s,s*.45,0,0,7); c.fill(); c.restore(); } break; }
    case 'glitter': { for(let i=0;i<cnt;i++){ const xx=rnd(i,1)*W, yy=rnd(i,2)*W;
      c.globalAlpha=Math.max(0,Math.sin(u*5+i*2)); c.fillStyle=i%2?'#fff':'#ffd93b';
      c.save(); c.translate(xx,yy); starPath(c,3*siz+2); c.fill(); c.restore(); c.globalAlpha=1; } break; }
    case 'coins': { for(let i=0;i<cnt;i++){ const yy=((rnd(i,2)+u*.3*(0.6+rnd(i,3)))%1)*W; const xx=rnd(i,1)*W;
      const s=(5+rnd(i,4)*6)*siz; c.fillStyle='#ffd93b'; c.strokeStyle='#c99b06'; c.lineWidth=2;
      c.beginPath(); c.arc(xx,yy,s,0,7); c.fill(); c.stroke();
      c.fillStyle='#c99b06'; c.font='bold '+Math.round(s)+'px sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('৳',xx,yy+1); } break; }
    case 'notes': { for(let i=0;i<cnt;i++){ const yy=(((rnd(i,2)-u*.15)%1)+1)%1*W; const xx=rnd(i,1)*W+Math.sin(u*2+i)*10;
      c.fillStyle=['#2dd4bf','#ff5c8a','#ffd93b'][i%3]; c.font=Math.round((12+rnd(i,3)*14)*siz)+'px sans-serif';
      c.fillText(i%2?'♪':'♫',xx,yy); } break; }
    case 'emojirain': { for(let i=0;i<Math.min(cnt,40);i++){ const yy=((rnd(i,2)+u*.25*(0.5+rnd(i,3)))%1)*W; const xx=rnd(i,1)*W;
      c.font=Math.round((14+rnd(i,4)*14)*siz)+'px "Noto Color Emoji","Apple Color Emoji",sans-serif';
      c.textAlign='center'; c.fillText(OV_EMO[i%OV_EMO.length],xx,yy); } break; }
    case 'smoke': { for(let i=0;i<Math.min(cnt,30);i++){ const cyc=((rnd(i,2)+u*.12)%1); const yy=W-cyc*W*.8; const xx=rnd(i,1)*W*.6+W*.2+Math.sin(u+i)*10;
      const s=(8+cyc*26)*siz; c.globalAlpha=(1-cyc)*.35;
      const g=c.createRadialGradient(xx,yy,1,xx,yy,s); g.addColorStop(0,'rgba(200,200,210,.8)'); g.addColorStop(1,'rgba(200,200,210,0)');
      c.fillStyle=g; c.beginPath(); c.arc(xx,yy,s,0,7); c.fill(); c.globalAlpha=1; } break; }
    case 'fire': { for(let i=0;i<cnt;i++){ const yy=W-((rnd(i,2)+u*.6*(.5+rnd(i,3)/20))%1)*W*.5*I;
      const xx=rnd(i,1)*W+Math.sin(u*4+i)*8; const s=(6+rnd(i,4)*14)*siz;
      const g=c.createRadialGradient(xx,yy,1,xx,yy,s);
      g.addColorStop(0,'rgba(255,220,80,.9)'); g.addColorStop(.5,'rgba(255,110,40,.7)'); g.addColorStop(1,'rgba(255,60,20,0)');
      c.fillStyle=g; c.beginPath(); c.arc(xx,yy,s,0,7); c.fill(); } break; }
    case 'frozen': case 'snowfall': { if(id==='frozen'){ c.fillStyle='rgba(120,200,255,.15)'; c.fillRect(-W,-W,W*3,W*3);
        c.strokeStyle='rgba(200,240,255,.8)'; c.lineWidth=6; c.strokeRect(-W/2+3,-W/2+3,W-6,W-6); }
      for(let i=0;i<cnt;i++){ const yy=((rnd(i,2)+u*(id==='frozen'?.1:.18))%1)*W; const xx=rnd(i,1)*W+Math.sin(u+i)*6;
        c.fillStyle='#fff'; c.globalAlpha=.85; c.beginPath(); c.arc(xx-W/2,yy-W/2,(1.5+rnd(i,3)*3)*siz,0,7); c.fill(); c.globalAlpha=1; } break; }
    case 'rain': case 'rainbowrain': case 'storm': { c.fillStyle= id==='rainbowrain'?'rgba(0,0,0,.08)':'rgba(40,50,80,.25)'; c.fillRect(-W,-W,W*3,W*3);
      for(let i=0;i<cnt;i++){ const yy=((rnd(i,2)+u*.9*(0.5+rnd(i,3)))%1)*W; const xx=rnd(i,1)*W;
        c.strokeStyle=id==='rainbowrain'?['#ff5c8a','#ffd93b','#2dd4bf','#7c5cff'][i%4]:'rgba(160,200,255,.8)';
        c.lineWidth=2; c.beginPath(); c.moveTo(xx-W/2,yy-W/2); c.lineTo(xx-W/2-4,yy-W/2+14*I); c.stroke(); }
      if(id==='storm'){ const f=(u*1.3)%1; if(f<.06){ c.fillStyle='rgba(255,255,255,'+(0.9-f*10)+')'; c.fillRect(-W,-W,W*3,W*3);
        c.strokeStyle='#fff'; c.lineWidth=3; c.beginPath(); let lx=W*(.2+rnd(Math.floor(u),3)*.6)-W/2, ly=-W/2;
        c.moveTo(lx,ly); for(let k=0;k<4;k++){ lx+=(rnd(Math.floor(u*7)+k,4)-.5)*60; ly+=W*.22; c.lineTo(lx,ly); } c.stroke(); } } break; }
    case 'wind': { for(let i=0;i<Math.round(cnt/2);i++){ const xx=(((rnd(i,1)+u*(.6+rnd(i,3)*.6))%1))*W*1.4-W*.2; const yy=rnd(i,2)*W;
      c.strokeStyle='rgba(255,255,255,'+(.2+rnd(i,4)*.4)+')'; c.lineWidth=2;
      c.beginPath(); c.moveTo(xx-W*.7,yy-W/2); c.quadraticCurveTo(xx-W*.35,yy-W/2-8,xx-W/2,yy-W/2); c.stroke(); } break; }
    case 'fog': { for(let k=0;k<4;k++){ const xx=((u*.05*(k%2?1:-1)*(0.5+I)+rnd(k,1))%1+1)%1*(W*1.6)-W*.8; const yy=W*(.2+.2*k);
      const g=c.createRadialGradient(xx,yy,10,xx,yy,W*.5); g.addColorStop(0,'rgba(220,225,235,'+(.25*I)+')'); g.addColorStop(1,'rgba(220,225,235,0)');
      c.fillStyle=g; c.beginPath(); c.arc(xx,yy,W*.5,0,7); c.fill(); } break; }
    case 'heat': { c.fillStyle='rgba(255,120,0,.08)'; c.fillRect(-W,-W,W*3,W*3);
      for(let k=0;k<5;k++){ const yy=W*(.15+.18*k); c.strokeStyle='rgba(255,180,80,.35)'; c.lineWidth=3; c.beginPath();
        for(let xx=-W/2;xx<=W/2;xx+=8){ c.lineTo(xx, yy + Math.sin(xx*.05+u*6+k)*4*I ); } c.stroke(); } break; }
    case 'underwater': { c.fillStyle='rgba(20,90,180,.25)'; c.fillRect(-W,-W,W*3,W*3);
      for(let k=0;k<3;k++){ c.save(); c.globalAlpha=.12; c.fillStyle='#bfe8ff';
        c.beginPath(); c.moveTo(-W*.1+k*W*.35,-W/2); c.lineTo(W*.05+k*W*.35,-W/2); c.lineTo(W*.25+k*W*.35,W/2); c.lineTo(-W*.0+k*W*.35,W/2); c.fill(); c.restore(); }
      for(let i=0;i<Math.round(cnt/2);i++){ const yy=(((rnd(i,2)-u*.2)%1)+1)%1*W; c.strokeStyle='rgba(220,250,255,.7)'; c.lineWidth=1.5;
        c.beginPath(); c.arc(rnd(i,1)*W-W/2,yy-W/2,3+rnd(i,3)*5,0,7); c.stroke(); } break; }
    case 'flash': { const f=(u*(0.8+I))%1; if(f<.08){ c.fillStyle='rgba(255,255,255,'+(1-f/.08*.7)+')'; c.fillRect(-W,-W,W*3,W*3); } break; }
    case 'vaporwave': { const g=c.createLinearGradient(-W/2,-W/2,W/2,W/2); g.addColorStop(0,'rgba(255,113,206,.22)'); g.addColorStop(1,'rgba(0,255,231,.18)');
      c.fillStyle=g; c.fillRect(-W,-W,W*3,W*3); break; }
    case 'crt': { c.fillStyle='rgba(0,0,0,.18)'; for(let yy=-W/2;yy<W/2;yy+=4) c.fillRect(-W/2,yy,W,1.5);
      const g=c.createRadialGradient(0,0,W*.3,0,0,W*.75); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,.5)');
      c.fillStyle=g; c.fillRect(-W,-W,W*3,W*3); break; }
    case 'vhs': { c.globalAlpha=.35; c.filter='hue-rotate(90deg)'; c.drawImage(src,-S/2+3,-S/2,S,S); c.filter='hue-rotate(-90deg)'; c.drawImage(src,-S/2-3,-S/2,S,S); c.filter='none'; c.globalAlpha=1;
      for(let k=0;k<3;k++){ const yy=rnd(Math.floor(u*10)+k,1)*W-W/2; c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(-W/2,yy,W,2+3*rnd(k,2)); } break; }
    case 'disco': { for(let k=0;k<6;k++){ const a=u*1.2*I+k*Math.PI/3; c.save(); c.globalAlpha=.18;
        c.fillStyle=['#ff5c8a','#ffd93b','#2dd4bf','#7c5cff','#ff8fab','#8aff6b'][k];
        c.beginPath(); c.moveTo(0,-W/2); c.lineTo(Math.cos(a)*W, -W/2+Math.sin(a)*W+W); c.lineTo(Math.cos(a+.3)*W, -W/2+Math.sin(a+.3)*W+W); c.closePath(); c.fill(); c.restore(); } break; }
    case 'spotlight': { const lx=Math.sin(u*1.3)*W*.3, ly=Math.cos(u*.9)*W*.3;
      c.save(); c.globalCompositeOperation='source-atop'; c.restore();
      c.fillStyle='rgba(0,0,10,.75)'; c.fillRect(-W,-W,W*3,W*3);
      const g=c.createRadialGradient(lx,ly,10,lx,ly,W*.45*I+20); g.addColorStop(0,'rgba(0,0,10,0)'); g.addColorStop(1,'rgba(0,0,10,0)');
      c.save(); c.globalCompositeOperation='destination-out';
      const g2=c.createRadialGradient(lx,ly,5,lx,ly,W*.4*I+20); g2.addColorStop(0,'rgba(0,0,0,1)'); g2.addColorStop(1,'rgba(0,0,0,0)');
      c.fillStyle=g2; c.beginPath(); c.arc(lx,ly,W*.45*I+20,0,7); c.fill(); c.restore(); break; }
    case 'static': { const seed=Math.floor(u*20); for(let i=0;i<cnt*3;i++){ c.fillStyle=rnd(seed*100+i,1)>.5?'rgba(255,255,255,.25)':'rgba(0,0,0,.25)';
        c.fillRect(rnd(i,1)*W-W/2, rnd(i,2)*W-W/2, 2, 2); } break; }
    case 'film': { const g=c.createRadialGradient(0,0,W*.3,0,0,W*.8); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(40,20,0,.55)');
      c.fillStyle=g; c.fillRect(-W,-W,W*3,W*3);
      if(rnd(Math.floor(u*8),3)>.7){ c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=1; const xx=(rnd(Math.floor(u*8),4)-.5)*W; c.beginPath(); c.moveTo(xx,-W/2); c.lineTo(xx,W/2); c.stroke(); } break; }
    case 'nyan': { const cols=['#ff0000','#ff9900','#ffff00','#33cc33','#3399ff','#9933ff'];
      for(let k=0;k<6;k++){ c.fillStyle=cols[k]; c.fillRect(-W/2, -8+k*6 + Math.sin(u*8)*2, W*.35, 6); } break; }
    case 'moon': { for(let i=0;i<Math.round(cnt/2);i++){ const yy=S/2+((rnd(i,2)+u*1.2)%1)*W*.4; const xx=(rnd(i,1)-.5)*S*.5;
      const g=c.createRadialGradient(xx,yy,1,xx,yy,8); g.addColorStop(0,'rgba(255,200,60,.9)'); g.addColorStop(1,'rgba(255,80,20,0)');
      c.fillStyle=g; c.beginPath(); c.arc(xx,yy,8,0,7); c.fill(); } break; }
    case 'slap': { const f=(u*.7)%1; if(f<.15){ c.save(); c.translate(S*.45,-S*.3); c.rotate(-.5); c.font=Math.round(W*.2)+'px "Noto Color Emoji",sans-serif'; c.textAlign='center'; c.fillText('👋',0,0); c.restore();
        c.fillStyle='#ffd93b'; starPath(c,14*(1-f/.15)+4); c.save(); c.translate(S*.4,-S*.35); c.fill(); c.restore(); } break; }
    case 'pet': { c.save(); c.translate(Math.sin(u*4)*S*.15, -S*.55+Math.abs(Math.sin(u*8))*6); c.rotate(Math.sin(u*8)*.2);
      c.font=Math.round(W*.16)+'px "Noto Color Emoji",sans-serif'; c.textAlign='center'; c.fillText('🤚',0,0); c.restore(); break; }
    case 'crab': { for(let i=0;i<3;i++){ const xx=(((u*.15*(0.7+i*.2)*I)+i*.33)%1)*W-W/2; const yy=W*.42;
      c.save(); c.translate(xx,yy+Math.sin(u*6+i)*3); c.font=Math.round(W*.1)+'px "Noto Color Emoji",sans-serif'; c.textAlign='center'; c.fillText('🦀',0,0); c.restore(); } break; }
    case 'conga': { for(let i=0;i<4;i++){ const xx=(((u*.2*I)+i*.12)%1)*W*1.4-W*.7; const yy=W*.4+Math.sin(u*6+i)*4;
      c.save(); c.translate(xx,yy); c.font=Math.round(W*.11)+'px "Noto Color Emoji",sans-serif'; c.textAlign='center'; c.fillText(['😂','','💃',''][i],0,0); c.restore(); } break; }
    case 'deepfry': { for(let i=0;i<cnt;i++){ c.fillStyle='rgba(255,'+Math.round(120+rnd(i,1)*100)+',0,.25)';
      c.fillRect(rnd(i,2)*W-W/2, rnd(i,3)*W-W/2, 4+rnd(i,4)*10, 3); } break; }
    case 'matrix': { c.font='bold 16px monospace'; const cols=Math.max(4,Math.round(cnt/3));
      for(let i=0;i<cols;i++){ const yy=(((u*(.3+rnd(i,3)*.4)*I)+rnd(i,5))%1)*(W+160)-80;
        for(let j=0;j<6;j++){ c.fillStyle=j===0?'#c8ffc8':'#00cc44'; c.globalAlpha=1-j*.15;
          c.fillText(String((i*7+j*3+Math.floor(u*4))%2), (i/cols)*W-W/2+8, yy-j*18-W/2+W/2); } c.globalAlpha=1; } break; }
    case 'space': { for(let i=0;i<cnt;i++){ const a=rnd(i,1)*Math.PI*2; const r=(((rnd(i,2)+u*(.3+rnd(i,3)*.7)*.5*I)%1))*W*.7;
        const x1=Math.cos(a)*r, y1=Math.sin(a)*r, x2=Math.cos(a)*(r+20+rnd(i,3)*30), y2=Math.sin(a)*(r+20+rnd(i,3)*30);
        c.strokeStyle='rgba(255,255,255,'+(.2+r/W*.8)+')'; c.lineWidth=2;
        c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); } break; }
    case 'fine': { for(let i=0;i<10;i++){ const xx=i/10*W-W/2+Math.sin(u*3+i)*6; const hh=W*.12*I+Math.sin(u*5+i*2)*W*.03;
        const g=c.createLinearGradient(xx,W/2,xx,W/2-hh);
        g.addColorStop(0,'rgba(255,120,20,.95)'); g.addColorStop(1,'rgba(255,220,60,0)');
        c.fillStyle=g; c.beginPath(); c.moveTo(xx-10,W/2); c.quadraticCurveTo(xx,W/2-hh,xx+10,W/2); c.fill(); } break; }
  }
}
function starPath(c,s){ c.beginPath(); for(let i=0;i<10;i++){ const r=i%2===0?s:s*.45; const a=i*Math.PI/5-Math.PI/2;
  c.lineTo(Math.cos(a)*r,Math.sin(a)*r); } c.closePath(); }
function drawSticker(x,W,u){
  if(lab.sticker==='none') return;
  const map={heart:'❤️',star:'⭐',party:'🎉',laugh:'😂',fire:'🔥',bd:'🇧',lol:'LOL'};
  const s=map[lab.sticker]; if(!s) return;
  x.save(); x.translate(W*.82,W*.16+Math.sin(u*3)*4);
  if(s==='LOL'){ x.font='bold '+Math.round(W*.11)+'px sans-serif'; x.textAlign='center'; x.fillStyle='#ffd93b'; x.strokeStyle='#000'; x.lineWidth=4; x.strokeText(s,0,0); x.fillText(s,0,0); }
  else { x.font=Math.round(W*.16)+'px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(s,0,0); }
  x.restore();
}

/* ---------- ইমোজি লেয়ার এডিটর ---------- */
const PALETTE=['😀','😂','🤣','','🥳','','🤩','😭','😡','🥶','','💀','','👽','','❤️','💔','⭐','🌟','✨','⚡','🔥','💥','🎉','🎊','🎈','🎁','🏆','🥇','⚽','','🎸','','🍕','','🌭','','🍩','🍭','🥤','','🐟','','🐱','','🐸','','🌹','☀️','🌈','💯','👑','🎩','🕶️','👍','','🤙','️','💪','🇧🇩'];
let layerSeq=1;
function renderLayerPanel(){
  const L=LANG==='bn'?0:1;
  const box=$('#layerEditorBox');
  box.innerHTML=`<h4>${L?'🧩 Emoji Layer Editor':'🧩 ইমোজি লেয়ার এডিটর'}</h4>
  <p class="hint">${L?'Layer more emojis on top — drag in preview to place, mouse-wheel to resize, sliders to fine-tune!':'ইমোজির ওপর আরও ইমোজি সাজাও — প্রিভিউতে টেনে বসাও, মাউস-হুইলে ছোট-বড়, স্লাইডারে ফাইন-টিউন!'}</p>
  <div class="row wrap" style="margin:10px 0">
    <button class="chip ${lab.edit?'active':''}" id="btnEdit">✏️ ${L?'Edit mode':'এডিট মোড'}</button>
    <input type="text" id="layerInput" class="tinput" style="min-width:110px" placeholder="${L?'emoji / text…':'ইমোজি / টেক্সট…'}">
    <button class="btn" id="btnAddLayer">➕ ${L?'Add':'যোগ'}</button>
  </div>
  <div class="base-emojis" id="emojiPalette"></div>
  <div id="layerCtl"></div>`;
  const pal=$('#emojiPalette');
  PALETTE.forEach(e=>{ const b=document.createElement('button'); b.textContent=e;
    b.onclick=()=>addLayer(e,false); pal.appendChild(b); });
  $('#btnEdit').onclick=()=>{ lab.edit=!lab.edit; renderLayerPanel(); };
  $('#btnAddLayer').onclick=()=>{ const v=$('#layerInput').value.trim(); if(v){ addLayer(v, [...v].length>2); } $('#layerInput').value=''; };
  $('#layerInput').addEventListener('keydown',e=>{ if(e.key==='Enter') $('#btnAddLayer').onclick(); });
  syncLayerCtl();
}
function addLayer(e,txt){
  const n=lab.layers.length;
  lab.layers.push({id:layerSeq++, e, txt:!!txt, x:(n%2?-1:1)*45*(1+n%3), y:-70+(n%4)*35, s:.22, rot:0, op:1});
  lab.sel=lab.layers[lab.layers.length-1].id;
  lab.edit=true;
  renderLayerPanel();
}
function getSel(){ return lab.layers.find(l=>l.id===lab.sel)||null; }
function syncLayerCtl(){
  const L=LANG==='bn'?0:1;
  const c=$('#layerCtl'); if(!c) return;
  const s=getSel();
  if(!s){ c.innerHTML=`<p class="hint" style="margin-top:10px">${L?'No layer selected — click one in the preview, or add a new one.':'লেয়ার বাছা হয়নি — প্রিভিউতে ক্লিক করো বা নতুন যোগ করো।'}</p>`; return; }
  c.innerHTML=`<div class="layer-title">${L?'Selected':'বাছা'}: ${s.e}</div>
  <div class="fxparams">
    <div class="fp"><span>${L?'Size':'মাপ'}</span><input id="lyS" type="range" min="6" max="80" value="${Math.round(s.s*100)}"><b>${Math.round(s.s*100)}</b></div>
    <div class="fp"><span>${L?'Rotate':'ঘোরানো'}</span><input id="lyR" type="range" min="-180" max="180" value="${Math.round(s.rot*180/Math.PI)}"><b>${Math.round(s.rot*180/Math.PI)}</b></div>
    <div class="fp"><span>${L?'Opacity':'স্বচ্ছতা'}</span><input id="lyO" type="range" min="10" max="100" value="${Math.round(s.op*100)}"><b>${Math.round(s.op*100)}</b></div>
  </div>
  <div class="row wrap" style="margin-top:10px">
    <button class="pbtn" id="lyDup">📋 ${L?'Copy':'কপি'}</button>
    <button class="pbtn" id="lyFront">⬆️ ${L?'Front':'সামনে'}</button>
    <button class="pbtn" id="lyBack">⬇️ ${L?'Back':'পেছনে'}</button>
    <button class="pbtn" id="lyDel">🗑️ ${L?'Delete':'মুছুন'}</button>
  </div>`;
  const bind=(id,fn)=>{const el=$(id); el.oninput=()=>{fn(+el.value); el.nextElementSibling.textContent=el.value;};};
  bind('#lyS',v=>s.s=v/100);
  bind('#lyR',v=>s.rot=v*Math.PI/180);
  bind('#lyO',v=>s.op=v/100);
  $('#lyDup').onclick=()=>{ const cp={...s,id:layerSeq++,x:s.x+30,y:s.y+30}; lab.layers.push(cp); lab.sel=cp.id; syncLayerCtl(); };
  $('#lyFront').onclick=()=>{ const i=lab.layers.indexOf(s); lab.layers.splice(i,1); lab.layers.push(s); };
  $('#lyBack').onclick=()=>{ const i=lab.layers.indexOf(s); lab.layers.splice(i,1); lab.layers.unshift(s); };
  $('#lyDel').onclick=()=>{ lab.layers.splice(lab.layers.indexOf(s),1); lab.sel=null; syncLayerCtl(); };
}
/* প্রিভিউ ক্যানভাসে পয়েন্টার ইন্টারঅ্যাকশন */
(function(){
  const cv=$('#labCanvas');
  let drag=null;
  const pos=e=>{ const r=cv.getBoundingClientRect();
    return {x:(e.clientX-r.left)*cv.width/r.width - cv.width/2, y:(e.clientY-r.top)*cv.height/r.height - cv.height/2}; };
  cv.addEventListener('pointerdown',e=>{
    if(!lab.edit) return;
    const p=pos(e);
    for(let i=lab.layers.length-1;i>=0;i--){ const l=lab.layers[i];
      const rr=Math.max(24, l.s*cv.width*.6);
      if(Math.hypot(p.x-l.x,p.y-l.y)<rr){ lab.sel=l.id; drag={l,ox:p.x-l.x,oy:p.y-l.y}; cv.setPointerCapture(e.pointerId); syncLayerCtl(); return; } }
    lab.sel=null; syncLayerCtl();
  });
  cv.addEventListener('pointermove',e=>{ if(!drag) return; const p=pos(e); drag.l.x=p.x-drag.ox; drag.l.y=p.y-drag.oy; });
  cv.addEventListener('pointerup',()=>drag=null);
  cv.addEventListener('wheel',e=>{
    if(!lab.edit) return; const s=getSel(); if(!s) return; e.preventDefault();
    s.s=Math.min(.8,Math.max(.06, s.s*(e.deltaY<0?1.08:0.92))); syncLayerCtl();
  },{passive:false});
})();
function drawLayers(c,W){
  for(const l of lab.layers){
    c.save(); c.translate(l.x,l.y); c.rotate(l.rot); c.globalAlpha=l.op;
    c.textAlign='center'; c.textBaseline='middle';
    if(l.txt){ c.font='bold '+Math.round(l.s*W)+'px sans-serif'; c.strokeStyle='#000'; c.lineWidth=Math.max(2,W*.015); c.strokeText(l.e,0,0); c.fillStyle='#ffd93b'; c.fillText(l.e,0,0); }
    else { c.font=Math.round(l.s*W)+'px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif'; c.fillText(l.e,0,0); }
    c.restore();
  }
}
function drawSelOutline(c,W){
  const s=getSel(); if(!s) return;
  const r=s.s*W*.62;
  c.save(); c.translate(W/2+s.x,W/2+s.y); c.rotate(s.rot);
  c.strokeStyle='#2dd4bf'; c.lineWidth=2; c.setLineDash([6,5]);
  c.strokeRect(-r,-r,r*2,r*2);
  c.setLineDash([]); c.fillStyle='#2dd4bf';
  [[-r,-r],[r,-r],[-r,r],[r,r]].forEach(pt=>{ c.beginPath(); c.arc(pt[0],pt[1],4,0,7); c.fill(); });
  c.restore();
}

/* ---------- মূল রেন্ডারার ---------- */
let PIXC=null;
function drawLab(x,W,u,forceAnim){
  perfU=u;
  const dir=lab.dir;
  x.clearRect(0,0,W,W);
  if(lab.anim==='synthwave') drawSynth(x,W,u); else drawScene(x,W,u);
  const src=lab.src||builderImg;
  if(!src||!src.width) return;
  const tf=(lab.edit&&!forceAnim)?{dx:0,dy:0,rot:0,sx:1,sy:1,kx:0,j:0}:getTF(lab.anim,u,W,dir);
  let filt=(cssFilter(lab.color)||'').trim();
  const af=getFL(lab.anim,u); if(af) filt=(filt+' '+af).trim();
  x.save();
  x.translate(W/2+tf.dx,W/2+tf.dy); x.rotate(tf.rot);
  if(tf.kx) x.transform(1,0,tf.kx,1,0,0);
  if(tf.j) x.transform(1+tf.j*.4,tf.j,tf.j,1-tf.j*.4,0,0);
  x.scale(tf.sx,tf.sy);
  const S=W*.62;
  x.filter=filt||'none';
  if(lab.anim==='scrollv'){
    x.drawImage(src,-S/2,tf.dy-S/2,S,S);
    x.drawImage(src,-S/2,tf.dy-1.4*W-S/2,S,S);
  } else if(lab.anim==='scrollh'){
    x.drawImage(src,tf.dx-S/2,-S/2,S,S);
    x.drawImage(src,tf.dx-1.4*W*dir-S/2,-S/2,S,S);
  } else if(lab.anim==='pixelate'){
    const cell=Math.max(4,Math.round(4+pv('siz')*28));
    const small=Math.max(4,Math.round(S/cell));
    if(!PIXC) PIXC=document.createElement('canvas');
    PIXC.width=PIXC.height=small;
    PIXC.getContext('2d').drawImage(src,0,0,small,small);
    x.imageSmoothingEnabled=false;
    x.drawImage(PIXC,0,0,small,small,-S/2,-S/2,S,S);
    x.imageSmoothingEnabled=true;
  } else if(lab.anim==='glitch'){
    const off=Math.round(Math.sin(Math.floor(u*14))*W*.02*pv('int'));
    x.globalAlpha=.75; x.filter='hue-rotate(90deg)';
    x.drawImage(src,-S/2+off,-S/2,S,S);
    x.filter='hue-rotate(-90deg)';
    x.drawImage(src,-S/2-off,-S/2,S,S);
    x.globalAlpha=1; x.filter=filt||'none';
    x.drawImage(src,-S/2,-S/2,S,S);
  } else {
    x.drawImage(src,-S/2,-S/2,S,S);
  }
  x.filter='none';
  drawLayers(x,W);
  ov(lab.anim,x,W,u,S,src);
  x.restore();
  if(lab.edit&&!forceAnim) drawSelOutline(x,W);
  drawSticker(x,W,u);
}

/* ---------- লাইভ লুপ ---------- */
const labC=$('#labCanvas'), labX=labC.getContext('2d');
let perfU=0;
(function loop(){ drawLab(labX,labC.width,performance.now()/1000*lab.speed); requestAnimationFrame(loop); })();

$('#btnLabPng').onclick=()=>downloadCanvas(labC,'emoji-'+lab.anim+'.png');
$('#btnLabWebm').onclick=()=>{
  if(!window.MediaRecorder){ toast(t('toast_warn')); return; }
  const stream=labC.captureStream(30);
  const rec=new MediaRecorder(stream,{mimeType:'video/webm'});
  const chunks=[];
  rec.ondataavailable=e=>chunks.push(e.data);
  rec.onstop=()=>{
    const b=new Blob(chunks,{type:'video/webm'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(b);
    a.download='emoji-'+lab.anim+'.webm'; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    toast(t('toast_vid'));
  };
  rec.start(); toast(t('toast_rec'));
  setTimeout(()=>rec.stop(),2400);
};

/* ---------- GIF এনকোডার ---------- */
function lzwEncode(idx){
  const CLEAR=256,EOI=257;
  let codeSize=9,next=258;
  const dict=new Map();
  const bytes=[]; let acc=0,nb=0;
  const emit=c=>{acc|=c<<nb; nb+=codeSize; while(nb>=8){bytes.push(acc&255); acc>>=8; nb-=8;}};
  emit(CLEAR);
  let pre=idx[0];
  for(let i=1;i<idx.length;i++){
    const k=idx[i], key=(pre<<8)|k;
    if(dict.has(key)){ pre=dict.get(key); }
    else{
      emit(pre);
      if(next<4096){ dict.set(key,next); next++; if(next===(1<<codeSize)&&codeSize<12) codeSize++; }
      else { emit(CLEAR); dict.clear(); next=258; codeSize=9; }
      pre=k;
    }
  }
  emit(pre); emit(EOI);
  if(nb>0) bytes.push(acc&255);
  return bytes;
}
function encodeGIF(frames,w,h,delayCs){
  const out=[];
  const B=(...bs)=>bs.forEach(b=>out.push(b&255));
  const S=s=>{for(const ch of s) out.push(ch.charCodeAt(0));};
  const U16=v=>B(v&255,(v>>8)&255);
  S('GIF89a'); U16(w); U16(h); B(0xF7,0,0);
  for(let r=0;r<6;r++)for(let g=0;g<6;g++)for(let b=0;b<6;b++) B(r*51,g*51,b*51);
  for(let i=216;i<255;i++) B(0,0,0);
  B(255,0,255);
  B(0x21,0xFF,0x0B); S('NETSCAPE2.0'); B(3,1,0,0,0);
  for(const fr of frames){
    B(0x21,0xF9,0x04,0x09, delayCs&255, (delayCs>>8)&255, 255, 0);
    B(0x2C); U16(0); U16(0); U16(w); U16(h); B(0);
    B(8);
    const lzw=lzwEncode(fr);
    for(let i=0;i<lzw.length;i+=255){
      const chunk=lzw.slice(i,i+255);
      B(chunk.length); out.push(...chunk);
    }
    B(0);
  }
  B(0x3B);
  return new Uint8Array(out);
}
$('#btnLabGif').onclick=()=>{
  const size=lab.size, frames=lab.qual, dur=2;
  const delayCs=Math.max(2,Math.round(100*dur/frames));
  const cv=document.createElement('canvas'); cv.width=cv.height=size;
  const cx=cv.getContext('2d');
  const list=[];
  for(let i=0;i<frames;i++){
    const u=i/frames*dur*lab.speed;
    drawLab(cx,size,u,true);
    const d=cx.getImageData(0,0,size,size), p=d.data;
    const idx=new Array(size*size);
    for(let j=0;j<idx.length;j++){
      const o=j*4;
      if(p[o+3]<125){ idx[j]=255; continue; }
      idx[j]=36*Math.round(p[o]/51)+6*Math.round(p[o+1]/51)+Math.round(p[o+2]/51);
    }
    list.push(idx);
  }
  const gif=encodeGIF(list,size,size,delayCs);
  const blob=new Blob([gif],{type:'image/gif'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='emoji-'+lab.anim+'.gif'; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  const plat=$('#platSel').value;
  if(plat!=='none'&&blob.size>PLATS[plat].limit) toast(t('toast_big'));
  else toast(t('toast_gif')+' ('+Math.round(blob.size/1024)+'KB)');
};

/* ---------- ZIP ---------- */
const CRC_T=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c;}return t;})();
function crc32(d){let c=0xFFFFFFFF;for(let i=0;i<d.length;i++)c=CRC_T[(c^d[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}
function makeZip(files){
  const loc=[],cen=[];let off=0;
  const enc=new TextEncoder();
  for(const f of files){
    const nb=enc.encode(f.name), cr=crc32(f.data), sz=f.data.length;
    const lh=new DataView(new ArrayBuffer(30));
    lh.setUint32(0,0x04034b50,true); lh.setUint16(4,20,true);
    lh.setUint32(14,cr,true); lh.setUint32(18,sz,true); lh.setUint32(22,sz,true);
    lh.setUint16(26,nb.length,true);
    loc.push(new Uint8Array(lh.buffer),nb,f.data);
    const ch=new DataView(new ArrayBuffer(46));
    ch.setUint32(0,0x02014b50,true); ch.setUint16(4,20,true); ch.setUint16(6,20,true);
    ch.setUint32(16,cr,true); ch.setUint32(20,sz,true); ch.setUint32(24,sz,true);
    ch.setUint16(28,nb.length,true); ch.setUint32(42,off,true);
    cen.push(new Uint8Array(ch.buffer),nb);
    off+=30+nb.length+sz;
  }
  const cenLen=cen.reduce((a,b)=>a+b.length,0);
  const end=new DataView(new ArrayBuffer(22));
  end.setUint32(0,0x06054b50,true);
  end.setUint16(8,files.length,true); end.setUint16(10,files.length,true);
  end.setUint32(12,cenLen,true); end.setUint32(16,off,true);
  return new Blob([...loc,...cen,new Uint8Array(end.buffer)],{type:'application/zip'});
}

/* =================================================
   AI প্যাক + সার্চ + ZIP
================================================= */
const PACKS=[
 ['student-happy.png',['খুশি ছাত্র','Happy student'],'study'],['student-studying.png',['পড়ুয়া','Studious'],'study'],['student-a-plus.png',['A+ উচ্ছ্বাস','A+ joy'],'study'],
 ['student-raising-hand.png',['হাত তোলা','Hand raised'],'study'],['student-graduation.png',['গ্র্যাজুয়েশন','Graduation'],'study'],['student-writing.png',['লেখালেখি','Writing'],'study'],
 ['study-07-reading-book.png',['বই পড়া','Reading'],'study'],['study-08-homework-desk.png',['হোমওয়ার্ক','Homework'],'study'],['study-09-idea-bulb.png',['আইডিয়া','Idea'],'study'],
 ['study-10-science-lab.png',['সায়েন্স ল্যাব','Science lab'],'study'],['study-11-math.png',['ম্যাথ','Math'],'study'],['study-12-art-class.png',['আর্ট ক্লাস','Art class'],'study'],
 ['study-13-globe.png',['গ্লোব','Globe'],'study'],['study-14-online-class.png',['অনলাইন ক্লাস','Online class'],'study'],['study-15-library.png',['লাইব্রেরি','Library'],'study'],
 ['study-16-book-stack.png',['বইয়ের স্তূপ','Book stack'],'study'],['study-17-alphabet.png',['বর্ণমালা','Alphabet'],'study'],['study-18-telescope.png',['টেলিস্কোপ','Telescope'],'study'],
 ['study-19-exam.png',['পরীক্ষা','Exam'],'study'],['study-20-trophy.png',['ট্রফি','Trophy'],'study'],['study-21-science-fair.png',['সায়েন্স ফেয়ার','Science fair'],'study'],
 ['study-22-abacus.png',['অ্যাবাকাস','Abacus'],'study'],['study-23-nature.png',['প্রকৃতি','Nature'],'study'],['study-24-going-to-school.png',['স্কুলে যাওয়া','To school'],'study'],
 ['study-25-school-bus.png',['স্কুল বাস','School bus'],'study'],['study-26-teacher.png',['শিক্ষক','Teacher'],'study'],['study-27-puzzle.png',['পাজল','Puzzle'],'study'],
 ['study-28-history.png',['ইতিহাস','History'],'study'],['study-29-group-study.png',['গ্রুপ স্টাডি','Group study'],'study'],['study-30-presentation.png',['প্রেজেন্টেশন','Presentation'],'study'],
 ['bengali-01-rice-fish.png',['ভাত-মাছ প্রেমী','Rice-fish lover'],'bengali'],['bengali-02-cha-adda.png',['চায়ে চুমুক','Tea sip'],'bengali'],['bengali-03-fuchka.png',['ফুচকা','Fuchka'],'bengali'],
 ['bengali-04-rickshaw.png',['রিকশা সফর','Rickshaw ride'],'bengali'],['bengali-05-bhat-ghum.png',['ভাতঘুম','After-lunch nap'],'bengali'],['bengali-06-maa-jhanta.png',['মায়ের ঝাঁটা','Mom\'s broom'],'bengali'],
 ['bengali-07-cricket-fan.png',['ক্রিকেট পাগল','Cricket fanatic'],'bengali'],['bengali-08-roshogolla.png',['রসগোল্লা','Roshogolla'],'bengali'],['bengali-09-boishakh.png',['পহেলা বৈশাখ','Pohela Boishakh'],'bengali'],
 ['bengali-10-monsoon.png',['বৃষ্টি ভেজা','Monsoon soaked'],'bengali'],
 ['beggar-01-hopeful-bowl.png',['আশাবাদী পাত্র','Hopeful bowl'],'beggar'],['beggar-02-cool-shades.png',['কুল সানগ্লাস','Cool shades'],'beggar'],['beggar-03-counting-coins.png',['কয়েন গোনা','Counting coins'],'beggar'],
 ['beggar-04-dog-friend.png',['কুকুর বন্ধু','Dog friend'],'beggar'],['beggar-05-ektara-singer.png',['একতারা গান','Ektara song'],'beggar'],['beggar-06-hungry-tummy.png',['পেটে গুরগুর','Hungry tummy'],'beggar'],
 ['beggar-07-thumbs-up-sign.png',['থাম্বস-আপ','Thumbs up'],'beggar'],['beggar-08-nap-umbrella.png',['ছাতায় ঘুম','Umbrella nap'],'beggar'],
 /* তেজোফি 3ডি প্যাক (39) */
 ['tz-01-smile-blush.png',['লাজুক হাসি','Shy smile'],'tezofy'],
 ['tz-02-joy-tears.png',['আনন্দঅশ্রু','Joy tears'],'tezofy'],
 ['tz-03-heart-red.png',['লাল হৃদয়','Red heart'],'tezofy'],
 ['tz-04-sparkles.png',['ঝিলমিল','Sparkles'],'tezofy'],
 ['tz-05-pray-hands.png',['প্রার্থনা','Pray hands'],'tezofy'],
 ['tz-06-love-face.png',['ভালোবাসা মুখ','Love face'],'tezofy'],
 ['tz-07-party-popper.png',['পার্টি পপার','Party popper'],'tezofy'],
 ['tz-08-thumbs-up.png',['থাম্বস আপ','Thumbs up'],'tezofy'],
 ['tz-09-grin.png',['হাসি','Grin'],'tezofy'],
 ['tz-10-grin-big-eyes.png',['বড় চোখের হাসি','Big grin'],'tezofy'],
 ['tz-11-grin-smile-eyes.png',['চোখভরা হাসি','Smile eyes'],'tezofy'],
 ['tz-12-beam.png',['দাঁত দেখা হাসি','Beam'],'tezofy'],
 ['tz-13-tears-hold.png',['আবেগাপ্লুত','Holding tears'],'tezofy'],
 ['tz-14-star-struck.png',['তারকা-মুগ্ধ','Star struck'],'tezofy'],
 ['tz-15-party-face.png',['পার্টি মুখ','Party face'],'tezofy'],
 ['tz-16-sunglasses.png',['সানগ্লাস','Sunglasses'],'tezofy'],
 ['tz-17-heart-eyes.png',['হার্ট চোখ','Heart eyes'],'tezofy'],
 ['tz-18-heart-purple.png',['বেগুনি হৃদয়','Purple heart'],'tezofy'],
 ['tz-19-heart-sparkle.png',['ঝলমলে হৃদয়','Sparkling heart'],'tezofy'],
 ['tz-20-heart-hands.png',['হৃদয় হাত','Heart hands'],'tezofy'],
 ['tz-21-heart-bow.png',['ফিতা-হৃদয়','Heart bow'],'tezofy'],
 ['tz-22-wave.png',['হাত নাড়া','Wave'],'tezofy'],
 ['tz-23-raise-hands.png',['হাত তোলা','Raised hands'],'tezofy'],
 ['tz-24-clap.png',['তালি','Clap'],'tezofy'],
 ['tz-25-handshake.png',['করমর্দন','Handshake'],'tezofy'],
 ['tz-26-blossom.png',['ফুল','Blossom'],'tezofy'],
 ['tz-27-rainbow.png',['রংধনু','Rainbow'],'tezofy'],
 ['tz-28-herb.png',['সবুজ পাতা','Herb'],'tezofy'],
 ['tz-29-butterfly.png',['প্রজাপতি','Butterfly'],'tezofy'],
 ['tz-30-cat.png',['বিড়াল','Cat'],'tezofy'],
 ['tz-31-pizza.png',['পিজ্জা','Pizza'],'tezofy'],
 ['tz-32-cake.png',['কেক','Cake'],'tezofy'],
 ['tz-33-strawberry.png',['স্ট্রবেরি','Strawberry'],'tezofy'],
 ['tz-34-coffee.png',['কফি','Coffee'],'tezofy'],
 ['tz-35-gift.png',['উপহার','Gift'],'tezofy'],
 ['tz-36-balloon.png',['বেলুন','Balloon'],'tezofy'],
 ['tz-37-love-letter.png',['প্রেমপত্র','Love letter'],'tezofy'],
 ['tz-38-rocket.png',['রকেট','Rocket'],'tezofy'],
 ['tz-39-bulb.png',['বাল্ব','Light bulb'],'tezofy'],
];
const CATKEY={study:'pk_study',bengali:'pk_bengali',beggar:'pk_beggar',tezofy:'pk_tezofy'};
let packCat='all', packQuery='';
$('#packSearch').addEventListener('input',e=>{packQuery=e.target.value.toLowerCase(); renderPacks(packCat);});
function renderPacks(cat){
  packCat=cat;
  const L=LANG==='bn'?0:1;
  const g=$('#packGrid'); g.innerHTML='';
  PACKS.filter(p=>(cat==='all'||p[2]===cat) && (!packQuery || p[1][0].toLowerCase().includes(packQuery) || p[1][1].toLowerCase().includes(packQuery)))
  .forEach(p=>{
    const d=document.createElement('div'); d.className='pcard';
    d.innerHTML=`<div class="thumb"><img loading="lazy" src="packs/${p[0]}" alt="${p[1][L]}"></div>
      <div class="pname">${p[1][L]}</div><div class="pcat">${t(CATKEY[p[2]])}</div>
      <div class="row"><button class="pbtn dl">⬇️</button><button class="pbtn cd">📋</button><button class="pbtn an">🎬</button></div>`;
    d.querySelector('.dl').onclick=()=>{ const a=document.createElement('a'); a.href='packs/'+p[0]; a.download=p[0]; a.click(); };
    d.querySelector('.cd').onclick=async()=>{ const uri=await packURI(p[0]);
      copyText(`<img src="${uri}" alt="${p[1][L]}" style="width:64px;height:64px;object-fit:contain">`); };
    d.querySelector('.an').onclick=()=>{
      const im=new Image();
      im.onload=()=>{ setLabSource(im,p[1][L]); goTab('lab'); };
      im.src='packs/'+p[0];
    };
    g.appendChild(d);
  });
}
chipGroup('packCats',v=>renderPacks(v));
$('#btnZip').onclick=async()=>{
  toast(t('toast_zip'));
  const list=PACKS.filter(p=>packCat==='all'||p[2]===packCat);
  const files=[];
  for(const p of list){
    const r=await fetch('packs/'+p[0]);
    const ab=new Uint8Array(await r.arrayBuffer());
    files.push({name:p[0],data:ab});
  }
  const blob=makeZip(files);
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='tezofy-emoji-maker-pack.zip'; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),4000);
  toast(t('toast_done'));
};
$('#btnGift').onclick=async()=>{
  toast(t('toast_gift'));
  const items=[];
  for(const p of PACKS){
    const uri=await packURI(p[0]);
    items.push({file:p[0],name_bn:p[1][0],name_en:p[1][1],category:p[2],format:'png',transparent:true,data_uri:uri});
  }
  blobDL('tezofy-emoji-maker-gift-pack.json',JSON.stringify({pack:'Tezofy Emoji Maker Gift Pack',version:3,count:items.length,emojis:items},null,2),'application/json');
  toast(t('toast_done'));
};

/* =================================================
   আমার সংগ্রহ
================================================= */
function renderMine(){
  const g=$('#mineGrid'); g.innerHTML='';
  const mine=JSON.parse(localStorage.getItem('ek_mine')||'[]');
  $('#mineEmpty').style.display=mine.length?'none':'block';
  mine.forEach((m,i)=>{
    const d=document.createElement('div'); d.className='pcard';
    d.innerHTML=`<div class="thumb"><img src="${m.d}"></div><div class="pname">#${i+1}</div>
      <div class="row"><button class="pbtn dl">⬇️</button><button class="pbtn an">🎬</button><button class="pbtn rm">🗑️</button></div>`;
    d.querySelector('.dl').onclick=()=>{const a=document.createElement('a'); a.href=m.d; a.download='my-emoji-'+(i+1)+'.png'; a.click();};
    d.querySelector('.an').onclick=()=>{const im=new Image(); im.onload=()=>{setLabSource(im,'#'+(i+1)); goTab('lab');}; im.src=m.d;};
    d.querySelector('.rm').onclick=()=>{const arr=JSON.parse(localStorage.getItem('ek_mine')||'[]'); arr.splice(i,1); localStorage.setItem('ek_mine',JSON.stringify(arr)); renderMine();};
    g.appendChild(d);
  });
}


/* =================================================
   ⚡ CSS স্টুডিও — পোর্টেবল অ্যানিমেশন কোড + ব্যাজ জেনারেটর
================================================= */
const CS_ANIMS=[
 ['none','🚫 নেই','🚫 None'],['float','🎈 ফ্লোট','🎈 Float'],['beat','💓 বিট','💓 Beat'],
 ['wobble','🫨 ওবল','🫨 Wobble'],['jelly','🍮 জেলি','🍮 Jelly'],['bounce','⬆️ বাউন্স','⬆️ Bounce'],
 ['spin','🔄 স্পিন','🔄 Spin'],['shake','🫨 শেক','🫨 Shake'],['zoom','🔍 জুম','🔍 Zoom'],['dance','🕺 ড্যান্স','🕺 Dance']];
const CS_KF={
 float:"0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-16px) rotate(1.5deg); }",
 beat:"0%,100% { transform: scale(1); } 14% { transform: scale(1.22); } 28% { transform: scale(1); } 42% { transform: scale(1.12); }",
 wobble:"0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); }",
 jelly:"0%,100% { transform: scale(1,1); } 30% { transform: scale(1.16,.88); } 50% { transform: scale(.9,1.12); } 70% { transform: scale(1.06,.94); }",
 bounce:"0%,100% { transform: translateY(0) scale(1,1); } 42% { transform: translateY(-24px) scale(.97,1.04); } 55% { transform: translateY(-24px) scale(1.04,.96); }",
 spin:"to { transform: rotate(360deg); }",
 shake:"0%,100% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-3deg); } 40% { transform: translateX(8px) rotate(3deg); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); }",
 zoom:"0%,100% { transform: scale(1); } 50% { transform: scale(1.14); }",
 dance:"0%,100% { transform: rotate(-4deg) translateY(0); } 25% { transform: rotate(5deg) translateY(-10px); } 50% { transform: rotate(-5deg) translateY(0); } 75% { transform: rotate(4deg) translateY(-6px); }"};
const SPARK_POS=[[8,18],[30,4],[58,6],[84,20],[92,52],[76,86],[42,95],[10,70]];
const cs={anim:'float',size:128,dur:1.6,glow:'#7c5cff',glowB:14,glowOn:false,shine:false,spark:false,hover:false,pop:false,file:'tz-01-smile-blush.png',src:null,name:'',tab:'html'};
const bgSt={style:'bg-glass',anim:'float',dur:1.6,file:'tz-01-smile-blush.png',src:null,tab:'html'};
const uriCache={};
async function packURI(file){
  if(uriCache[file]) return uriCache[file];
  const r=await fetch('packs/'+file);
  const blob=await r.blob();
  return uriCache[file]=await new Promise(res=>{const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.readAsDataURL(blob);});
}
function copyText(s){
  const done=()=>toast(t('toast_copy'));
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(s).then(done,()=>{fbCopy(s); done();}); }
  else { fbCopy(s); done(); }
}
function fbCopy(s){ const ta=document.createElement('textarea'); ta.value=s; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} ta.remove(); }
function blobDL(name,text,mime){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:mime})); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); }
function escHTML(s){ return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function sparksHTML(){ return SPARK_POS.map(([x,y],i)=>`<i style="left:${x}%;top:${y}%;animation-delay:${(i*.18).toFixed(2)}s"></i>`).join(''); }
function nameOf(file){ const p=PACKS.find(q=>q[0]===file); return p?p[1][LANG==='bn'?0:1]:(file==='upload'?t('cs_upname'):file); }

function csCSS(){
  const L=[];
  L.push(`.ek-wrap { position: relative; width: ${cs.size}px; height: ${cs.size}px; perspective: 800px; }`);
  L.push(`.ek-img { width: 100%; height: 100%; object-fit: contain; display: block; }`);
  if(cs.glowOn) L.push(`.ek-wrap .ek-img { filter: drop-shadow(0 0 ${cs.glowB}px ${cs.glow}); }`);
  if(cs.hover) L.push(`.ek-wrap:hover .ek-img { transform: rotateX(15deg) rotateY(-13deg) translateY(-6px) scale(1.12); transition: transform .5s ease; }`);
  if(cs.pop) L.push(`.ek-wrap:active .ek-img { transform: scale(.9); transition: transform .1s; }`);
  if(cs.anim!=='none'){
    L.push(`.ek-img { animation: ek-${cs.anim} ${cs.dur}s ${cs.anim==='spin'?'linear':'ease-in-out'} infinite; }`);
    L.push(`@keyframes ek-${cs.anim} { ${CS_KF[cs.anim]} }`);
  }
  if(cs.shine){
    L.push(`.ek-shine { position: absolute; inset: 4%; overflow: hidden; border-radius: 22%; pointer-events: none; }`);
    L.push(`.ek-shine::after { content: ''; position: absolute; top: -25%; bottom: -25%; width: 38%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent); transform: translateX(-210%) skewX(-18deg); animation: ek-shine ${(cs.dur*2).toFixed(1)}s ease-in-out infinite; }`);
    L.push(`@keyframes ek-shine { 0% { transform: translateX(-210%) skewX(-18deg); } 55%,100% { transform: translateX(320%) skewX(-18deg); } }`);
  }
  if(cs.spark){
    L.push(`.ek-sparks { position: absolute; inset: -14%; pointer-events: none; }`);
    L.push(`.ek-sparks i { position: absolute; width: 9%; height: 9%; background: #fde68a; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); animation: ek-twinkle ${(cs.dur*1.25).toFixed(2)}s ease-in-out infinite; }`);
    L.push(`@keyframes ek-twinkle { 0%,100% { opacity: 0; transform: scale(.35) rotate(0); } 50% { opacity: 1; transform: scale(1) rotate(22deg); } }`);
  }
  return L.join('\n');
}
function csHTML(){
  return `<div class="ek-wrap">
  <img class="ek-img" src="${cs.src}" alt="${escHTML(cs.name)}">
  ${cs.shine?'<span class="ek-shine"></span>':''}
  ${cs.spark?`<span class="ek-sparks">${sparksHTML()}</span>`:''}
</div>`;
}
function csJSON(){
  return JSON.stringify({tool:'Tezofy Emoji Maker',type:'emoji-animation',source:cs.file==='upload'?'custom-upload':cs.file,name:cs.name,
    animation:cs.anim,size_px:cs.size,duration_s:cs.dur,
    glow:{enabled:cs.glowOn,color:cs.glow,blur_px:cs.glowB},hover_3d:cs.hover,click_pop:cs.pop,shine:cs.shine,sparkles:cs.spark},null,2);
}
function csFULL(){
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Tezofy Emoji Maker — ${escHTML(cs.name)}</title>
<style>
body { background: #0d1020; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
${csCSS()}
</style></head><body>
${csHTML()}
</body></html>`;
}
let csLiveStyle=null;
async function csUpdate(){
  cs.size=+$('#csSize').value; cs.dur=+$('#csDur').value;
  cs.glowOn=$('#csGlowOn').checked; cs.glow=$('#csGlow').value; cs.glowB=+$('#csGlowB').value;
  cs.shine=$('#csShine').checked; cs.spark=$('#csSpark').checked; cs.hover=$('#csHover').checked; cs.pop=$('#csPop').checked;
  $('#csSizeVal').textContent=cs.size; $('#csDurVal').textContent=cs.dur;
  if(!cs.src){ if(cs.file==='upload') return; cs.src=await packURI(cs.file); cs.name=nameOf(cs.file); }
  if(!csLiveStyle){ csLiveStyle=document.createElement('style'); document.head.appendChild(csLiveStyle); }
  csLiveStyle.textContent=csCSS();
  $('#csStage').innerHTML=csHTML();
  csCode();
}
function csCode(){
  const out= cs.tab==='html'?csHTML() : cs.tab==='css'?csCSS() : cs.tab==='json'?csJSON() : csFULL();
  $('#csCode').value=out;
}
function csBuildUI(){
  const L=LANG==='bn'?0:1;
  const ab=$('#csAnimChips'); ab.innerHTML='';
  CS_ANIMS.forEach(a=>{ const b=document.createElement('button'); b.className='chip'+(cs.anim===a[0]?' active':''); b.textContent=a[L+1];
    b.onclick=()=>{ cs.anim=a[0]; csBuildUI(); csUpdate(); }; ab.appendChild(b); });
  const bb=$('#bgAnimChips'); bb.innerHTML='';
  CS_ANIMS.forEach(a=>{ const b=document.createElement('button'); b.className='chip'+(bgSt.anim===a[0]?' active':''); b.textContent=a[L+1];
    b.onclick=()=>{ bgSt.anim=a[0]; csBuildUI(); bgUpdate(); }; bb.appendChild(b); });
  const fill=(sel,cur)=>{ sel.innerHTML='';
    if(cur==='upload'){ const o=document.createElement('option'); o.value='upload'; o.textContent='📤 '+t('cs_upname'); o.selected=true; sel.appendChild(o); }
    PACKS.forEach(p=>{ const o=document.createElement('option'); o.value=p[0]; o.textContent=p[1][L]; if(p[0]===cur) o.selected=true; sel.appendChild(o); }); };
  fill($('#csEmoji'),cs.file); fill($('#bgEmoji'),bgSt.file);
  if(cs.file!=='upload') cs.name=nameOf(cs.file);
  if($('#csCode').value) csCode();
}
['#csSize','#csDur','#csGlow','#csGlowB'].forEach(s=>$(s).addEventListener('input',csUpdate));
['#csGlowOn','#csShine','#csSpark','#csHover','#csPop'].forEach(s=>$(s).addEventListener('change',csUpdate));
$('#csEmoji').onchange=async e=>{ cs.file=e.target.value; cs.src=null; await csUpdate(); };
$('#csUploadBtn').onclick=()=>$('#csFile').click();
$('#csFile').onchange=e=>{
  const f=e.target.files[0];
  if(!f||!f.type.startsWith('image/')){ toast(t('toast_warn')); return; }
  const r=new FileReader();
  r.onload=()=>{ cs.src=r.result; cs.file='upload'; cs.name=t('cs_upname'); csBuildUI(); csUpdate(); };
  r.readAsDataURL(f);
};
$('#csCodeTabs').addEventListener('click',e=>{
  const b=e.target.closest('button[data-c]'); if(!b) return;
  $$('#csCodeTabs button').forEach(x=>x.classList.toggle('active',x===b));
  cs.tab=b.dataset.c; csCode();
});
$('#csCopy').onclick=()=>copyText($('#csCode').value);
$('#csDlHtml').onclick=()=>{ blobDL('tezofy-emoji-maker-animated.html',csFULL(),'text/html'); toast(t('toast_done')); };
$('#csDlJson').onclick=()=>{ blobDL('tezofy-emoji-maker-anim.json',csJSON(),'application/json'); toast(t('toast_done')); };
$('#csDlPng').onclick=()=>{ const im=new Image(); im.onload=()=>{ const c=document.createElement('canvas'); c.width=c.height=512; c.getContext('2d').drawImage(im,0,0,512,512); downloadCanvas(c,'tezofy-emoji.png'); }; im.src=cs.src; };
$('#csToLab').onclick=()=>{ const im=new Image(); im.onload=()=>{ setLabSource(im,cs.name); goTab('lab'); }; im.src=cs.src; };

/* ---------- ব্যাজ জেনারেটর ---------- */
function bgCSSOnly(){
  let s=`.badge-prev { display: inline-flex; align-items: center; gap: 9px; padding: 10px 20px; border-radius: 999px; font-size: 1rem; font-weight: 600; }
.badge-prev img { width: 30px; height: 30px; object-fit: contain; }
.bg-glass { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.22); color: #fff; backdrop-filter: blur(8px); }
.bg-grad  { background: linear-gradient(135deg, #7c3aed, #db2777); color: #fff; box-shadow: 0 8px 20px rgba(124,58,237,.45); }
.bg-dark  { background: #12162a; border: 1px solid #2c3357; color: #e8eaf6; }
.bg-ok    { background: linear-gradient(135deg, #059669, #22c58a); color: #fff; box-shadow: 0 8px 20px rgba(5,150,105,.4); }`;
  if(bgSt.anim!=='none') s+=`\n@keyframes ek-${bgSt.anim} { ${CS_KF[bgSt.anim]} }`;
  return s;
}
function bgHTML(){
  const animStyle=bgSt.anim==='none'?'':` style="animation: ek-${bgSt.anim} ${bgSt.dur}s ${bgSt.anim==='spin'?'linear':'ease-in-out'} infinite"`;
  return `<span class="badge-prev ${bgSt.style}">
  <img src="${bgSt.src}" alt=""${animStyle}>
  <b>${escHTML($('#bgText').value||t('bg_default'))}</b>
</span>`;
}
async function bgUpdate(){
  bgSt.dur=+$('#bgDur').value; $('#bgDurVal').textContent=bgSt.dur;
  if(!bgSt.src){ bgSt.src=await packURI(bgSt.file); }
  $('#bgImg').src=bgSt.src;
  $('#bgLabel').textContent=$('#bgText').value||t('bg_default');
  $('#bgPrev').className='badge-prev '+bgSt.style;
  $('#bgImg').style.animation=bgSt.anim==='none'?'none':`ek-${bgSt.anim} ${bgSt.dur}s ${bgSt.anim==='spin'?'linear':'ease-in-out'} infinite`;
  bgCode();
}
function bgCode(){
  const out= bgSt.tab==='html'?bgHTML() : bgSt.tab==='css'?bgCSSOnly() :
    JSON.stringify({tool:'Tezofy Emoji Maker',type:'badge',source:bgSt.file,text:$('#bgText').value||t('bg_default'),style:bgSt.style,animation:bgSt.anim,duration_s:bgSt.dur},null,2);
  $('#bgCode').value=out;
}
$('#bgEmoji').onchange=async e=>{ bgSt.file=e.target.value; bgSt.src=null; await bgUpdate(); };
chipGroup('bgStyleChips',v=>{ bgSt.style=v; bgUpdate(); });
$('#bgDur').addEventListener('input',bgUpdate);
$('#bgText').addEventListener('input',bgUpdate);
$('#bgCodeTabs').addEventListener('click',e=>{
  const b=e.target.closest('button[data-c]'); if(!b) return;
  $$('#bgCodeTabs button').forEach(x=>x.classList.toggle('active',x===b));
  bgSt.tab=b.dataset.c; bgCode();
});
$('#bgCopy').onclick=()=>copyText($('#bgCode').value);
$('#bgDlHtml').onclick=()=>{
  const full=`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Tezofy Emoji Maker Badge</title>
<style>body { background:#0d1020; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; font-family:sans-serif; }
${bgCSSOnly()}</style></head><body>
${bgHTML()}
</body></html>`;
  blobDL('tezofy-emoji-maker-badge.html',full,'text/html'); toast(t('toast_done'));
};
csUpdate(); bgUpdate();

/* ---------- শুরু ---------- */
applyLang();
renderBuilder();
