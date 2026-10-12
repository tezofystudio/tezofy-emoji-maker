# 🎭 Tezofy Emoji Maker

**2D • 3D • 5D Emoji Maker — সম্পূর্ণ দ্বিভাষিক (বাংলা + English)**

A fully client-side emoji maker & animator. No server, no signup, no dependencies — everything runs in your browser.

![preview](preview.png)

---

## ✨ Features / ফিচারসমূহ

| Feature | Details |
|---|---|
| 🎨 **Emoji Builder + AI Studio** | Build emojis from parts (skin, eyes, hair, accessories…) in 2D/3D/5D styles; type a prompt and the AI Studio assembles one |
| 🧪 **Emoji Studio — 2D/3D/5D Converter** | Image **or text** → emoji: background remover (tolerance), zoom (50–200%), crop (fit/cover/circle/squircle), 8 color FX (neon, warm, cool…), depth-extruded **3D** & holographic **5D** with gloss + anaglyph |
| ✏️ **Text Effect Engine** | Type any text (বাংলা/English): 5 fonts, gradient fill, rainbow letters (grapheme-safe for Bengali ligatures), outline color & width — then push it through the whole 2D·3D·5D pipeline |
| 🎬 **Animation Lab** | 83 animations in 6 categories with per-effect intensity/particle/size sliders, stickers & scenes, **layer editor** (drag/resize/rotate/opacity emoji combos), platform presets (Discord/Slack/Twitch/Teams), GIF / WebM / PNG export |
| ⚡ **CSS Studio** | Portable embed code: 10 CSS animations + glow, shine sweep, sparkles, hover-3D tilt, click pop → copy HTML/CSS/JSON or download a standalone HTML file. Plus an animated **badge generator** (glass/gradient/dark/green) |
| 🤖 **Emoji Packs** | 87 transparent PNGs — 30 study + 10 fun Bengali + 8 fun beggar + 39 Tezofy 3D. Search, filter, per-emoji PNG/📋-code/🎬-animate, one-click **ZIP** + **gift-pack JSON** |
| 💾 **My Collection** | Saves your creations in `localStorage` |
| 🌐 **Fully bilingual** | Every label, button & toast in বাংলা and English — one-click switch |

## 🚀 Run locally / চালানো

The site is 100% static — any of these works:

```bash
# option 1: just open the file
open index.html            # macOS
xdg-open index.html        # Linux
start index.html           # Windows

# option 2: tiny dev server
python3 server.py          # → http://localhost:3000
```

## 📁 Project structure / স্ট্রাকচার

```
tezofy-emoji-maker/
├── index.html     # bilingual markup (7 tabs)
├── styles.css     # dark-neon theme + ek-* animation engine + badge styles
├── app.js         # the whole app (builder, studio, lab, css studio, packs…)
├── server.py      # optional no-cache static server
├── packs/         # 87 transparent emoji PNGs
├── preview.png    # screenshot for this README
├── LICENSE        # MIT
└── README.md
```

## 🌍 Publish on GitHub / গিটহাবে পাবলিক করার গাইড

### 1️⃣ রিপোজিটরি বানান (Create the repo)
1. Go to [github.com](https://github.com) → log in
2. Click **+** → **New repository**
3. Repository name: `tezofy-emoji-maker`
4. Select **Public** ✅
5. **Do NOT** tick “Add a README” (this folder already has one) → **Create repository**

### 2️⃣ পুশ করুন (Push from your computer)
Download/copy this folder, open a terminal **inside it**, then:

```bash
git init
git add .
git commit -m "🎭 Tezofy Emoji Maker — 2D/3D/5D emoji maker, 83 animations, bilingual (bn/en)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tezofy-emoji-maker.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username. First time? GitHub will ask you to sign in; on Windows install [Git for Windows](https://git-scm.com/download/win) first.

### 3️⃣ লাইভ সাইট চালু করুন (GitHub Pages — free hosting)
1. In your repo: **Settings** → **Pages**
2. *Source*: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**
3. Wait ~1 minute → your live site: `https://YOUR_USERNAME.github.io/tezofy-emoji-maker/` 🎉

The app is fully static & client-side, so GitHub Pages hosts it perfectly — no build step needed.

### পরে আপডেট করতে (To update later)

```bash
git add .
git commit -m "update: ..."
git push
```

## 🛠️ Tech / প্রযুক্তি

Vanilla HTML/CSS/JS + Canvas + SVG. Hand-rolled GIF (LZW + median-cut), WebM (MediaRecorder) and ZIP (stored, CRC32) encoders. **Zero dependencies, zero build step.**

## 📄 License

MIT — see [LICENSE](LICENSE). Free for personal & commercial use; a credit link back is appreciated. 💜

---

😄 **Tezofy Emoji Maker** — ভালোবাসা দিয়ে বানানো 🇧🇩
