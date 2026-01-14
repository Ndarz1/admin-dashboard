# 🚀 Admin Dashboard - Sistem Manajemen Modern

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

<p align="center">
  Platform administrasi yang kuat, responsif, dan elegan untuk manajemen data wisata, reservasi, dan analitik bisnis.
  <br>
  <a href="#-fitur-unggulan"><strong>Jelajahi Fitur »</strong></a>
  <br>
  <br>
  <a href="#-demo-aplikasi">Lihat Demo</a>
  ·
  <a href="#-laporan-bug">Lapor Bug</a>
  ·
  <a href="#-request-fitur">Request Fitur</a>
</p>

---

## 📑 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Antarmuka Pengguna (UI)](#-antarmuka-pengguna-ui)
- [Fitur Unggulan](#-fitur-unggulan)
- [Teknologi](#-teknologi)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat & Instalasi](#-prasyarat--instalasi)
- [Konfigurasi API](#-konfigurasi-api)
- [Panduan Penggunaan](#-panduan-penggunaan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 📋 Tentang Proyek

**Admin Dashboard** ini dikembangkan untuk memenuhi kebutuhan administrasi modern yang kompleks namun tetap mengedepankan kemudahan penggunaan (User Experience). Proyek ini merupakan bagian dari tugas akhir mata kuliah **Pemrograman Web Dinamis**.

Sistem ini dirancang untuk menjadi "pusat kontrol" bagi pengelola, memungkinkan pemantauan metrik kinerja secara real-time, pengelolaan data master (wisata, pengguna), serta administrasi pemesanan tiket dengan alur kerja yang efisien.

## 🎨 Antarmuka Pengguna (UI)

> _Tambahkan screenshot aplikasi di bagian ini untuk memberikan gambaran visual kepada pengguna._

|                                                         Dashboard Analytics                                                          |                                                        Calendar Management                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <!-- Masukkan Link Gambar Dashboard --> <img src="https://placehold.co/600x400?text=Dashboard+Preview" alt="Dashboard" width="100%"> | <!-- Masukkan Link Gambar Calendar --> <img src="https://placehold.co/600x400?text=Calendar+Preview" alt="Calendar" width="100%"> |

|                                                        User Management                                                         |                                                             Settings                                                              |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| <!-- Masukkan Link Gambar User Mgmt --> <img src="https://placehold.co/600x400?text=User+Management" alt="Users" width="100%"> | <!-- Masukkan Link Gambar Settings --> <img src="https://placehold.co/600x400?text=Settings+Preview" alt="Settings" width="100%"> |

---

## ✨ Fitur Unggulan

Aplikasi ini dibagi menjadi beberapa modul utama:

### 1. 📊 Dashboard & Analitik

- **Visualisasi Data**: Grafik interaktif menggunakan `Recharts` untuk memantau tren pendapatan, pengunjung, dan booking.
- **KPI Cards**: Ringkasan performa utama (Total Revenue, Active Users, dll) sekilas pandang.

### 2. 🔐 Autentikasi & Keamanan

- **Secure Login**: Sistem login terintegrasi dengan validasi JWT (JSON Web Token).
- **Role-Based Access**: (Opsional) Tampilan menu yang disesuaikan dengan hak akses pengguna.
- **Auto Logout**: Penanganan sesi kadaluarsa otomatis untuk keamanan.

### 3. 📅 Manajemen Jadwal (Calendar)

- **Integrasi FullCalendar**: Tampilan kalender interaktif (Month, Week, Day view).
- **Event Handling**: Tambah, edit, dan hapus agenda atau jadwal kunjungan dengan mudah.

### 4. 📝 Manajemen Data Master

- **CRUD Operasi Lengkap**: Create, Read, Update, Delete untuk data destinasi wisata, fasilitas, dan kategori.
- **Search & Filter**: Pencarian data cerdas dan filtering untuk navigasi data yang cepat.
- **Upload Gambar**: Dukungan upload drag-and-drop menggunakan `react-dropzone`.

### 5. ⚙️ Pengaturan & Profil

- **Edit Profil**: Pembaruan informasi akun pengguna dan preferensi.
- **Customisasi**: Pengaturan parameter aplikasi sesuai kebutuhan admin.

---

## 🛠 Teknologi

Dibangun dengan standar industri terkini untuk performa dan skalabilitas:

- **Frontend Core**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) - _Next Generation Frontend Tooling_
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - _Utility-first CSS framework_
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management & Data**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **UI Components**:
  - [Framer Motion](https://www.framer.com/motion/) (Animasi)
  - [Lucide React](https://lucide.dev/) (Ikon)
  - [SweetAlert2](https://sweetalert2.github.io/) (Notifikasi Popup cantik)
  - [React Select](https://react-select.com/) (Dropdown advanced)

---

## 📂 Struktur Folder

Struktur proyek diatur agar mudah dipahami dan dikembangkan lebih lanjut:

```plaintext
admin-dashboard/
├── 📁 src/
│   ├── 📁 assets/          # Aset statis (Images, Fonts, Global CSS)
│   ├── 📁 components/      # Komponen UI Reusable (Button, Card, Modal)
│   │   ├── 📁 dashboard/   # Komponen spesifik Dashboard
│   │   ├── 📁 settings/    # Komponen halaman Settings
│   │   └── ...
│   ├── � pages/           # Halaman Aplikasi (Page Views)
│   │   ├── 📁 auth/        # Login & Register
│   │   ├── 📁 analytics/   # Halaman Analitik
│   │   ├── 📁 management/  # Halaman CRUD Data
│   │   └── ...
│   ├── 📁 utils/           # Helper functions & Konstanta
│   ├── ⚛️ App.jsx          # Main Router Configuration
│   └── ⚛️ main.jsx         # Entry Point
├── 📄 package.json         # Dependencies & Script
├── ⚙️ vite.config.js       # Konfigurasi Vite
└── 📄 README.md            # Dokumentasi Proyek
```

---

## 🚀 Prasyarat & Instalasi

### Prasyarat

Sebelum memulai, pastikan sistem Anda memiliki:

- **Node.js** (v18.x atau lebih baru)
- **npm** (v9.x atau lebih baru)
- **Backend API** yang berjalan (Default: `http://localhost:5000`)

### Langkah Instalasi

1.  **Clone Repositori**

    ```bash
    git clone https://github.com/username/admin-dashboard.git
    cd admin-dashboard
    ```

2.  **Instal Dependensi**

    ```bash
    npm install
    ```

3.  **Jalankan Mode Pengembangan**

    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.

4.  **Build untuk Produksi**
    ```bash
    npm run build
    ```

---

## � Konfigurasi API

Secara default, aplikasi ini dikonfigurasi untuk terhubung ke backend lokal.

**Catatan Penting:**
Saat ini, URL API backend (**Base URL**) dikonfigurasi secara langsung (hardcoded) di dalam file komponen (contoh: `src/components/settings/ProfileSettings.jsx`) ke alamat:
`http://localhost:5000/api`

Untuk lingkungan produksi, disarankan untuk mengganti endpoint ini dengan Variabel Lingkungan (.env) agar lebih fleksibel.

---

## 📖 Panduan Penggunaan

1.  **Login**: Masuk menggunakan kredensial administrator yang valid.
2.  **Dashboard**: Lihat ringkasan data di halaman utama.
3.  **Kelola Data**: Gunakan menu sidebar untuk mengakses halaman manajemen (Wisata, Fasilitas, dll). Klik tombol "Tambah Data" untuk input baru, atau ikon pensil untuk mengedit.
4.  **Logout**: Klik ikon profil di pojok kanan atas dan pilih Logout untuk mengakhiri sesi.

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Jika Anda memiliki ide untuk perbaikan:

1.  Fork proyek ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

---

## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

<center>
  <p>Dibuat dengan ❤️ dan ☕ oleh <b>Tim Pengembang</b></p>
  <p><i>Pemrograman Web Dinamis - Semester 5</i></p>
</center>
