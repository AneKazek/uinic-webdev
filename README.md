# 🧠 UINIC WebDev — MindPath

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-%5E8.2-777BB4?logo=php&logoColor=white)
![Inertia](https://img.shields.io/badge/Inertia.js-React-6366F1?logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.x-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

> Platform perjalanan kesehatan mental dengan UI gamified: journaling, mood tracking, missions, dan chatbot konseling — dibangun dengan Laravel + Inertia React.

---

## ✨ Fitur Utama
- Dashboard modern dengan top navbar konsisten.
- Chatbot konseling bergaya dashboard (`/mental-health-chat`).
- Daily Journaling dan mood tracker terintegrasi.
- Gamifikasi: XP, streak, achievements, dan missions.
- Desain responsif berbasis Tailwind, efek parallax, dan animasi subtle.
- Integrasi Supabase (Auth/DB/API PostgREST-ready).
- Siap deploy ke Vercel (serverless PHP runtime).

## 🏗️ Teknologi
- Backend: `Laravel 12`, `PHP 8.2`
- SPA: `Inertia.js (React)` + `Vite 7`
- UI: `TailwindCSS 4`, `lucide-react`, komponen UI kustom
- Data: `@supabase/supabase-js 2.x`
- Deployment: `Vercel`

## 📁 Struktur Penting
- `resources/js/pages/landing/index.tsx` — Halaman landing (referensi UI Duolingo-style)
- `resources/js/components/components/sections/hero-section.tsx` — Hero dengan bubble dan box progres
- `resources/js/pages/dashboard.tsx` — Dashboard utama (kartu journaling & teman AI)
- `resources/js/pages/mental-health-chat/index.tsx` — Chatbot konseling bergaya dashboard
- `routes/web.php` — Routing Laravel
- `vercel.json` + `api/index.php` — Konfigurasi deploy Vercel

## ⚙️ Persiapan Lokal
1. Clone repo dan masuk direktori project.
2. Install dependency PHP & JS:
   - `composer install`
   - `npm install`
3. Buat `.env` dan generate key:
   - `cp .env.example .env`
   - `php artisan key:generate`
4. Jalankan migrasi dan seeder bila diperlukan:
   - `php artisan migrate --force`
5. Jalankan pengembangan lokal:
   - `npm run dev`
   - `php artisan serve`

## 🔑 Environment Variables
Minimal variabel penting:
- Laravel: `APP_ENV`, `APP_DEBUG`, `APP_KEY`, `APP_URL`
- Session/Cache: `SESSION_DRIVER`, `CACHE_STORE`
- Supabase (opsional, jika dipakai di client):
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - Service integration lain sesuai kebutuhan

Catatan: Untuk PostgREST akses tabel, gunakan header API Key dan endpoint Supabase Anda.

## 🚀 Deploy ke Vercel
Konfigurasi sudah disiapkan:
- `api/index.php` — meneruskan request ke `public/index.php`
- `vercel.json` — runtime `vercel-php` dan static assets dari `public/`

Langkah cepat:
1. Push repo ke GitHub.
2. Di Vercel, `New Project` → impor repo.
3. Framework Preset: `Other` (ikuti `vercel.json`).
4. Set env di Project Settings (production):
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_KEY` dari `.env` lokal
   - Tambahkan env Supabase jika digunakan
5. Deploy:
   - Preview: `vercel deploy`
   - Production: `vercel --prod`

Jika aset tidak tampil, pastikan build Vite menghasilkan ke `public/build` dan rute static di `vercel.json` aktif.

## 🧪 Kualitas Kode
- Lint: `npm run lint`
- Types: `npm run types`
- Test: `npm run test` (Vitest)

## 🧭 Navigasi Cepat
- Landing: `resources/js/pages/landing/index.tsx`
- Hero/bubble: `resources/js/components/components/sections/hero-section.tsx`
- Chatbot: `resources/js/pages/mental-health-chat/index.tsx`
- Dashboard: `resources/js/pages/dashboard.tsx`

## 🖼️ Desain & UX
- Tema gradient lembut dan elemen float untuk kesan friendly.
- Box “Goal Harian” dengan tiga indikator progres.
- Bubble “+10 Poin” dan “Mental Warrior” tersinkron dengan hero kanan.
- Overlay lembut pada bagian atas untuk mengatasi gap warna saat scroll.

## 🤝 Kontribusi
- Buka issue untuk bug/ide.
- Pull Request dengan deskripsi jelas dan fokus perubahan.

## 📄 Lisensi
MIT — bebas digunakan dan dikembangkan.
