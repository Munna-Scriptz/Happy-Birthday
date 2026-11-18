# 🎉 Birthday Wishing Website

A clean, interactive and **mobile-first birthday website** built with React, Vite and Tailwind CSS. It uses playful animations, smooth route transitions and a few scrapbook-style stickers to create a personal, memorable experience.

---

<p align="center"><img src="https://happy-birthday-preview.vercel.app/deskBanner.png" /></p>
<p align="center"><img src="https://happy-birthday-preview.vercel.app/preview-2.png" /></p>

---

## 🌟 Features

- **Cake opening animation** — a custom SVG cake with confetti welcomes visitors on the first paint.
- **Smooth page transitions** — a hand-drawn animation plays between the homepage, letter and scrapbook routes.
- **3 dedicated pages:**
  - **Homepage:** the birthday title, typing date, portrait, balloons and two small call-to-action buttons that sit side by side on phones.
  - **Little letter:** a small sealed envelope. The white paper stays completely hidden until you tap the envelope; tap anywhere outside (or press `Esc`) to close it again.
  - **3D letter page:** a notebook-style fold-out letter with a dark backdrop, ruled paper, binder rings and a cover photo.
  - **Love notes page:** floating notes you can drag around the screen.
  - **Scrapbook:** memories, a timeline, reason cards and a wish jar, decorated with stickers.
- **Fully responsive** — layouts, type and the notebook are scaled down for small phone screens.
- **Simple to customize** — all names, photos, letters and notes live in one data file.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Munna-Scriptz/Happy-Birthday.git
```

### 2. Open the project

Navigate to the folder on your computer and install the dependencies:

```bash
cd Happy-Birthday
npm install
```

### 3. Run the website

```bash
npm run dev
```

Then open the local URL shown in your terminal. To create a production build, run `npm run build`.

---

## 🎨 Customizing it

Edit **`src/data/siteData.js`** to change the names, age, birthday date, portrait, letters, love notes and scrapbook content. Sticker and paper artwork lives in `public/stickers/` — keep the same filenames if you replace the images.

Presentation-only timings are kept in the components (for example `src/pages/Home.jsx` controls how quickly the homepage animations play after the opening cake).

---

## 💛 Why I Built This

I wanted to create a unique birthday experience using animations, transitions and interactive UI elements — something fun, personal and visually satisfying. Feel free to use it, customize it or improve it in your own style.

Made with ❤️ by **Munna-Scriptz**

---

## 📬 Want to Connect?

If you use the project or want to collaborate, reach out anytime!
