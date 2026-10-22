# 🚀 Adarsh Milan – Space-Themed Portfolio

🌐 **Live site:** [portfoliyo-zeta-indol.vercel.app](https://portfoliyo-zeta-indol.vercel.app/)

My personal developer portfolio, built with **React 19 + Vite** and packed with animations: smooth scrolling, particle backgrounds, scrambled/decrypted text effects, a 3D-feeling profile card, an interactive skills icon cloud and a working contact form.

## ✨ Sections

| Section | Highlights |
|---------|-----------|
| **Landing** | Space background, particles (OGL/WebGL), decrypted-text intro |
| **About Me** | Tilt profile card, scroll-reveal text |
| **Skills** | Rotating 3D icon cloud, animated circular progress bars |
| **Projects** | Alternating left/right cards with swap animation – CalcAI, Cyborg City, Swachhta Sahayak, Multi-Level Inventory, Voice2Note, Know Your Bharm, JavaScript30 and my first portfolio |
| **Achievements** | Certificate gallery |
| **Contact** | Form that sends email through EmailJS |

Also: custom smooth cursor, page scroll-progress bar, Lenis smooth scrolling, "cool mode" particle buttons and rainbow buttons.

## 🛠️ Tech stack

- **React 19**, **Vite 7**
- **Tailwind CSS 4** + shadcn/ui-style components (`radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`)
- Animation: **GSAP**, **Framer Motion / Motion**, **Lenis**, **OGL**, `rough-notation`, `tw-animate-css`
- Icons: `lucide-react`
- Email: `@emailjs/browser`
- Deploy configs for **Netlify** (`netlify.toml`) and **Vercel** (`vercel.json`)

## 📁 Structure

```
src/
├── App.jsx              # page layout, Lenis + scroll progress
├── screens/             # landing, Aboutme, Skills, Projects, Achive, contact
├── components/          # Particles, ProfileCard, CardSwap, ScrambledText, DecryptedText,
│   │                    # ScrollReveal, Customcursor, project cards, progress ...
│   └── ui/              # icon-cloud, smooth-cursor, rainbow-button, cool-mode, circular progress
├── assets/              # images, backgrounds, certificates
└── lib/utils.ts         # cn() class helper
```

## ▶️ Run locally

```bash
git clone https://github.com/Adarshmilan/Portfoliyo.git
cd Portfoliyo
npm install
npm run dev        # http://localhost:5173
```

### Other scripts

```bash
npm run build      # production build → dist/
npm run preview    # preview the build
npm run lint       # ESLint
```

## 🌍 Deploy

- **Netlify:** build command `npm run build`, publish directory `dist` (already set in `netlify.toml`, with SPA redirect).
- **Vercel:** import the repo – `vercel.json` handles the SPA rewrite.
