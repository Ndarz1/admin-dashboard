# 🚀 Admin Dashboard — TA-PWD Dashboard

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

<p align="center">
  <b>Platform administrasi modern</b> untuk pengelolaan data wisata, reservasi,  
  dan analitik bisnis dengan antarmuka yang responsif, aman, dan mudah digunakan.
  <br><br>
  <a href="#-fitur-unggulan"><strong>Jelajahi Fitur »</strong></a>
  <br><br>
  <a href="#-demo-aplikasi">Demo</a>
  ·
  <a href="#-laporan-bug">Lapor Bug</a>
  ·
  <a href="#-request-fitur">Request Fitur</a>
</p>

---

## 📌 Tentang Proyek

**Admin Dashboard TA-PWD** merupakan aplikasi web yang dikembangkan sebagai bagian dari  
**Tugas Akhir Mata Kuliah Pemrograman Web Dinamis**.

Aplikasi ini dirancang sebagai **pusat kontrol administratif** yang memungkinkan administrator untuk:

- Memantau metrik performa sistem secara real-time
- Mengelola data master (wisata, pengguna, fasilitas)
- Mengatur jadwal dan reservasi
- Melakukan analisis data berbasis visualisasi

Fokus utama pengembangan meliputi **User Experience (UX)**, **keamanan**, dan **skalabilitas aplikasi**.

---

## 🎨 Antarmuka Pengguna (UI)

> _Tambahkan screenshot aplikasi untuk meningkatkan dokumentasi proyek._

| Dashboard Analytics | Calendar Management |
| :-----------------: | :-----------------: |
| <img src="https://placehold.co/600x400?text=Dashboard+Preview" width="100%"> | <img src="https://placehold.co/600x400?text=Calendar+Preview" width="100%"> |

| User Management | Settings |
| :-------------: | :------: |
| <img src="https://placehold.co/600x400?text=User+Management" width="100%"> | <img src="https://placehold.co/600x400?text=Settings+Preview" width="100%"> |

---

## ✨ Fitur Unggulan

### 📊 Dashboard & Analitik
- Visualisasi data interaktif menggunakan **Recharts**
- Ringkasan KPI: total pendapatan, jumlah pengguna, dan reservasi
- Monitoring performa sistem secara real-time

### 🔐 Autentikasi & Keamanan
- Sistem login berbasis **JWT (JSON Web Token)**
- Manajemen sesi dan auto logout
- Dukungan role-based access control (opsional)

### 📅 Manajemen Jadwal
- Integrasi **FullCalendar** (Month / Week / Day View)
- CRUD event dan jadwal kunjungan
- Sinkronisasi jadwal secara dinamis

### 📝 Manajemen Data Master
- CRUD lengkap data wisata, fasilitas, dan kategori
- Fitur pencarian dan filtering
- Upload gambar dengan **react-dropzone**

### ⚙️ Pengaturan & Profil
- Manajemen profil administrator
- Pengaturan aplikasi yang fleksibel

---

## 🛠 Teknologi yang Digunakan

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **UI & Utility**:
  - Framer Motion
  - Lucide React
  - SweetAlert2
  - React Select
  - Recharts
  - FullCalendar

---

## 📂 Struktur Folder

```plaintext
admin-dashboard/
├── src/
│   ├── assets/            # Aset statis
│   ├── components/        # Komponen reusable
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── ...
│   ├── pages/             # Halaman aplikasi
│   │   ├── auth/
│   │   ├── analytics/
│   │   ├── management/
│   │   └── ...
│   ├── utils/             # Helper & konstanta
│   ├── App.jsx            # Konfigurasi routing
│   └── main.jsx           # Entry point
├── .env.example           # Contoh environment variable
├── package.json
├── vite.config.js
└── README.md
