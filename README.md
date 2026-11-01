# RIKO P.N. Portfolio

Static site (HTML/CSS/JS), tanpa build step.

## Upload gambar (taruh di folder `assets/`, nama file persis)
- `hero.png` – foto hero (PNG transparan disarankan)
- `about.jpg` – foto di section About
- `carousel-1.jpg` … `carousel-7.jpg` – 7 gambar carousel (rasio 3:4)
- `cv.pdf` – file untuk tombol Download CV

Jika file belum ada, otomatis tampil placeholder.

## Deploy ke Vercel
1. Push folder ini ke GitHub, lalu Vercel > Add New Project > Import. Framework: **Other**, tanpa build command, output directory kosong.
2. Atau via CLI: `npx vercel --prod` di folder ini.
