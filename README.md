# 🌍 Jelajah Ekonomi - Media Pembelajaran IPS Interaktif Berbasis Game

<p align="center">
  <img src="public/jelakom.png" alt="Logo Jelajah Ekonomi" width="120" />
</p>

<p align="center">
  <strong>Platform Gamifikasi Edukasi Interaktif IPS (Ilmu Pengetahuan Sosial) SMP</strong><br>
  Memadukan petualangan pulau ekonomi, simulasi keputusan konsumsi, misi foto bertenaga AI, dan kustomisasi avatar modular 2D.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white" alt="Node.js Express" />
  <img src="https://img.shields.io/badge/Database-MySQL%20%2F%20MariaDB-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini%20Vision-8E75C2?logo=google&logoColor=white" alt="Gemini AI" />
</p>

---

## 📖 Daftar Isi

1. [Tentang Proyek](#-tentang-proyek)
2. [Fitur Unggulan](#-fitur-unggulan)
3. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
4. [Struktur Folder Proyek](#-struktur-folder-proyek)
5. [Prasyarat Sistem](#-prasyarat-sistem)
6. [Panduan Menjalankan Proyek](#-panduan-menjalankan-proyek)
7. [Daftar Akun Pengujian](#-daftar-akun-pengujian)
8. [Konfigurasi Gemini AI Vision](#-konfigurasi-gemini-ai-vision)
9. [Deployment](#-deployment)
10. [Lisensi & Hak Cipta](#-lisensi--hak-cipta)

---

## 💡 Tentang Proyek

**Jelajah Ekonomi** dirancang untuk mengatasi kejenuhan belajar materi ekonomi pada mata pelajaran IPS tingkat Sekolah Menengah Pertama (SMP), khususnya materi:
- **Kebutuhan Manusia & Skala Prioritas** (Primer, Sekunder, Tersier)
- **Kelangkaan Sumber Daya & Biaya Peluang**
- **Kegiatan Ekonomi**: Produksi, Distribusi, dan Konsumsi

Melalui gamifikasi, peserta didik mengumpulkan **Koin Edukasi** dan **Poin XP** dari kuis serta misi foto nyata untuk mengkustomisasi avatar mereka, sekaligus belajar menerapkan prinsip ekonomi bijak dalam membelanjakan koin.

---

## ✨ Fitur Unggulan

### 1. 🗺️ Jelajah Peta (Interactive Realm Map)
- Menjelajahi 5 pulau tematik: **Pulau Kebutuhan**, **Pulau Kelangkaan**, **Lembah Produksi**, **Jalur Distribusi**, dan **Pasar Konsumsi**.
- Dilengkapi penanda status pulau (*Terkunci*, *Tersedia*, dan *Selesai*).

### 2. 📚 Pusat Belajar & Kuis Interaktif
- Rangkuman materi komprehensif berbasis kurikulum dengan ilustrasi visual.
- Kuis pilihan ganda interaktif dilengkapi penjelasan edukatif, efek suara, batas waktu, dan reward koin/XP.

### 3. 📸 Misi Foto AI (Google Gemini Vision)
- Siswa mengunggah atau memotret objek ekonomi di lingkungan sekitar (misalnya barang kebutuhan pokok, alat produksi, atau struk belanja).
- **Gemini AI** menganalisis gambar secara real-time untuk memvalidasi kesesuaian objek dengan konsep ekonomi dan memberikan umpan balik cerdas.

### 4. 👕 Lemari Avatar & Kamar Pas (Custom 2D Vector Canvas)
- Kustomisasi karakter bergaya anime/webtoon 2D modular menggunakan SVG beresolusi tinggi tanpa penurunan kualitas.
- Pilihan rambut, kemeja seragam SMP lengkap berdasi, jaket, celana panjang, rok, sepatu, hingga aksesoris (topi, mahkota, ransel).
- Penerapan konsep ekonomi: setiap item dikategorikan berdasarkan skala prioritas (*Primer, Sekunder, Tersier*).

### 5. 🏆 Podium Juara & Leaderboard Realtime
- Podium 3 besar juara kelas yang menampilkan avatar standing 3D secara proporsional.
- Tabel peringkat interaktif dengan filter berdasarkan Poin, Level, Koin, atau Kuis Selesai.
- Pembaruan *real-time* via event sinkronisasi data antar tab dan polling database.

### 6. 👤 Profil Saya
- Tampilan avatar *Full-Body* berdiri utuh tanpa terpotong.
- Galeri Lencana Prestasi (*Badges*) yang terbuka berdasarkan pencapaian belajar.
- Riwayat koleksi pakaian dan statistik performa siswa.

### 7. 🛡️ Dashboard Khusus Guru / Admin
- Akses penuh untuk memantau kemajuan seluruh kelompok/siswa.
- Fitur *Quick Tools* untuk pengujian fitur (tambah saldo koin uji, buka semua lencana, atau reset data akun).

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Animasi & Efek**: Canvas Confetti, CSS Micro-interactions, Web Audio API Sound FX

### Backend & Database
- **Server Runtime**: [Node.js](https://nodejs.org/) dengan [Express 5](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) (driver `mysql2/promise`)
- **Penyimpanan Lokal**: Hybrid LocalStorage sinkron otomatis saat offline

### AI & Vision
- **Model**: Google Gemini API (Multimodal Vision Analysis)

---

## 📁 Struktur Folder Proyek

```text
JelajahEkonomi/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Alur CI/CD GitHub Actions untuk GitHub Pages
├── public/
│   ├── jelakom.png              # Aset visual & logo aplikasi
│   └── ...
├── server/
│   ├── db.js                    # Konfigurasi pool koneksi MySQL & skema tabel
│   ├── index.js                 # REST API endpoints (Auth, Leaderboard, Activities, Sync)
│   └── reset_users.js           # Skrip reset data user database ke kondisi awal
├── src/
│   ├── assets/                  # Gambar latar belakang & grafis peta
│   ├── components/
│   │   ├── ApiKeyModal.jsx      # Modal konfigurasi Google Gemini API Key
│   │   ├── AvatarCanvas.jsx     # Mesin render SVG modular avatar 2D
│   │   ├── Dashboard.jsx        # Halaman peta petualangan pulau ekonomi
│   │   ├── HeaderBar.jsx        # Bilah navigasi atas akun pengguna
│   │   ├── LeaderboardAdmin.jsx # Podium & tabel peringkat juara kelas
│   │   ├── LoginPage.jsx        # Halaman login dengan opsi akun instan
│   │   ├── MateriKuis.jsx       # Modul materi belajar & kuis interaktif
│   │   ├── MisiFotoAI.jsx       # Modul pemindai kamera bertenaga Gemini AI
│   │   ├── Navbar.jsx           # Navigasi tab utama
│   │   ├── ProfilSaya.jsx       # Halaman profil siswa & avatar full body
│   │   ├── TokoKarakter.jsx     # Kamar pas & toko busana avatar
│   │   └── ...
│   ├── data/                    # Data statis (materi, kuis, misi AI, toko pakaian)
│   ├── utils/
│   │   ├── apiService.js        # Klien pemanggil REST API backend
│   │   ├── audio.js             # Generator efek suara Web Audio API
│   │   ├── geminiService.js     # Integrasi Google Gemini API Vision
│   │   └── storage.js           # Manajemen state lokal & sinkronisasi hybrid
│   ├── App.jsx                  # Komponen induk aplikasi
│   ├── index.css                # Konfigurasi Tailwind CSS & animasi global
│   └── main.jsx                 # Entry point aplikasi React
├── daftar_akun_jelajah_ekonomi.csv  # Daftar akun pengujian admin & siswa
├── package.json
└── vite.config.js
```

---

## ⚙️ Prasyarat Sistem

Sebelum menjalankan aplikasi, pastikan komputer Anda telah terpasang:
1. **Node.js** (versi 18.x atau versi 20.x ke atas) — [Unduh Node.js](https://nodejs.org/)
2. **NPM** (terpasang otomatis bersama Node.js)
3. **MySQL Database** (dapat menggunakan **Laragon**, **XAMPP**, atau MySQL Server mandiri)

---

## 🚀 Panduan Menjalankan Proyek

### 1. Kloning atau Buka Direktori Proyek
Buka terminal (PowerShell atau Bash) di dalam folder proyek:
```bash
cd "c:\path\to\JelajahEkonomi"
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Database MySQL
- Jika menggunakan **Laragon**: Buka aplikasi Laragon lalu klik tombol **Start All**.
- Jika menggunakan **XAMPP**: Buka XAMPP Control Panel lalu klik **Start** pada modul MySQL.
> **Catatan**: Secara default, backend akan otomatis membuat database `jelajah_ekonomi` beserta tabel-tabelnya pada `localhost:3306` dengan user `root` tanpa kata sandi.

### 4. Jalankan Server Backend (API)
Di jendela terminal pertama:
```bash
npm run server
```
Server akan aktif di `http://localhost:3000`.

### 5. Jalankan Frontend (Aplikasi Web)
Di jendela terminal kedua:
```bash
npm run dev
```
Aplikasi web siap diakses melalui peramban di: **`http://localhost:5173`**.

---

## 👥 Daftar Akun Pengujian

Aplikasi telah dilengkapi dengan akun bawaan untuk memudahkan pengujian:

| No | Username | Password | Nama Lengkap | Peran | Keterangan |
|:--:|:---|:---|:---|:---|:---|
| 1 | **admin** | `admin` | Administrator (Penguji/Guru) | Admin | Akun penguji dengan saldo awal 5.000 koin & akses menu admin |
| 2 | **user1** | `user1` | Kelompok 1 | Siswa | Akun siswa baru (Level 1, 0 Koin) |
| 3 | **user2** | `user2` | Kelompok 2 | Siswa | Akun siswa baru |
| 4 | **user3** | `user3` | Kelompok 3 | Siswa | Akun siswa baru |
| 5 | **user4** | `user4` | Kelompok 4 | Siswa | Akun siswa baru |

> *Tip: Pada halaman login, Anda dapat mengklik tombol pintas akun pengujian untuk masuk secara instan tanpa mengetik.*

---

## 🔑 Konfigurasi Gemini AI Vision

Untuk menggunakan fitur pemindaian foto objek ekonomi pada menu **Misi Foto AI**:
1. Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/).
2. Di dalam aplikasi, klik ikon **Kunci (API Key)** di pojok kanan atas bilah navigasi.
3. Masukkan Gemini API Key Anda dan klik **Simpan Kunci**.
4. Sistem akan langsung menguji validitas kunci dan mengaktifkan fitur analisis kamera AI.

---

## 🚢 Deployment

### GitHub Pages
Repositori ini telah dikonfigurasi dengan workflow otomatis GitHub Actions di [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Setiap *push* ke cabang `main` akan otomatis memicu proses build dan deploy ke GitHub Pages.

### Vercel / Netlify
Aplikasi siap dideploy ke Vercel atau Netlify dengan pengaturan:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `20.x`

---

## 📄 Lisensi & Hak Cipta

Dikembangkan sebagai media pembelajaran interaktif berbasis teknologi untuk pendidikan IPS SMP.  
Hak Cipta &copy; 2026 **Jelajah Ekonomi Team**. Seluruh hak cipta dilindungi undang-undang.
