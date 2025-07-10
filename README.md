Kalender Bali API

Kalender Bali API adalah alat untuk mengkonversi tanggal Masehi ke sistem kalender Bali (Saka) dengan akurat, mendukung perhitungan wuku, sasih, pancawara, saptawara, triwara, lintang, pararasan, ingkel, serta hari penting seperti Galungan, Kuningan, dan Dewasa Ayu. API ini dirancang untuk membantu pengembang dan pemerhati budaya Bali dalam mengakses informasi kalender Bali secara programatik.
Dokumentasi lengkap tersedia di https://kalender-bali-api.vercel.app.
Fitur

Konversi Tanggal: Mengkonversi tanggal Masehi ke sistem kalender Bali (wuku, sasih, pancawara, saptawara, dll.).
Hari Penting: Mendeteksi hari raya seperti Galungan, Kuningan, Nyepi, dan hari baik (Dewasa Ayu).
Fase Bulan: Menghitung Purnama dan Tilem menggunakan astronomy-engine dengan akurasi tinggi.
API Endpoints: Menyediakan endpoint untuk informasi harian, rentang tanggal, dan daftar hari penting.
Validasi Lokal: Menandai hari yang memerlukan validasi lokal untuk memastikan akurasi budaya.
Open Source: Berlisensi MIT, dengan kode tersedia di GitHub.

Instalasi
Untuk menjalankan API secara lokal, ikuti langkah-langkah berikut:

Clone Repositori:
git clone https://github.com/JukutPremium/Kalender-Bali-API.git
cd Kalender-Bali-API


Instal Dependensi:
npm install


Jalankan Server:
node index.js

API akan berjalan di http://localhost:3000 (atau port yang Anda tentukan).


Dependensi

express: Framework untuk membangun API.
astronomy-engine: Untuk perhitungan fase bulan (Purnama dan Tilem).

Penggunaan
API ini menyediakan beberapa endpoint untuk mengakses informasi kalender Bali. Berikut adalah contoh penggunaan:
1. Mendapatkan Informasi Hari Ini
Endpoint: GET /api/bali-calendar/today
curl https://kalender-bali-api.vercel.app/api/bali-calendar/today

Respons:
{
  "gregorianDate": "2025-07-10",
  "sakaYear": 1947,
  "sasih": "Kapat",
  "wuku": "Menail",
  "pancawara": "Kliwon",
  "saptawara": "Wraspati",
  "triwara": "Beteng",
  "lintang": "Pepe",
  "pararasan": "Laku Bulan",
  "ingkel": "Mina",
  "importantDays": ["Purnama Kapat"],
  "requiresLocalValidation": [],
  "isFullMoon": true,
  "isNewMoon": false
}

2. Mendapatkan Informasi untuk Tanggal Tertentu
Endpoint: GET /api/bali-calendar/:date
curl https://kalender-bali-api.vercel.app/api/bali-calendar/2025-07-10

3. Mendapatkan Galungan dan Kuningan dalam Setahun
Endpoint: GET /api/galungan-kuningan/:year
curl https://kalender-bali-api.vercel.app/api/galungan-kuningan/2025

Respons:
[
  {
    "date": "2025-02-05",
    "event": "Galungan",
    "baliDate": { "gregorianDate": "2025-02-05", /* ... */ }
  },
  {
    "date": "2025-02-15",
    "event": "Kuningan",
    "baliDate": { "gregorianDate": "2025-02-15", /* ... */ }
  }
]

4. Mendapatkan Hari Baik (Dewasa Ayu)
Endpoint: GET /api/dewasa-ayu/:year/:month
curl https://kalender-bali-api.vercel.app/api/dewasa-ayu/2025/7

Respons:
[
  {
    "date": "2025-07-01",
    "auspiciousDays": ["Soma Pon (Hari Baik untuk Usaha)"],
    "requiresLocalValidation": ["Soma Pon (Hari Baik untuk Usaha)"],
    "baliDate": { /* ... */ }
  }
]

Lihat dokumentasi lengkap untuk semua endpoint dan contoh kode dalam cURL, JavaScript, dan Python.
Struktur API
API ini dibangun menggunakan Express.js dan astronomy-engine untuk perhitungan astronomi. Berikut adalah endpoint yang tersedia:



Endpoint
Deskripsi
Parameter



GET /api/bali-calendar/today
Informasi kalender Bali untuk hari ini (WITA)
-


GET /api/bali-calendar/:date
Informasi kalender Bali untuk tanggal tertentu
date: YYYY-MM-DD


GET /api/galungan-kuningan/:year
Daftar Galungan dan Kuningan dalam setahun
year: YYYY


GET /api/bali-calendar/range/:startDate/:endDate
Informasi kalender Bali untuk rentang tanggal
startDate: YYYY-MM-DD, endDate: YYYY-MM-DD


GET /api/important-days/:year/:month
Daftar hari penting dalam bulan tertentu
year: YYYY, month: 1-12


GET /api/dewasa-ayu/:year/:month
Daftar hari baik (Dewasa Ayu) dalam bulan tertentu
year: YYYY, month: 1-12


GET /api/info
Informasi tentang API, fitur, dan dependensi
-


Catatan

Zona Waktu: Endpoint /today menggunakan WITA (UTC+8).
Validasi Lokal: Beberapa hari baik (Dewasa Ayu) memerlukan konfirmasi lokal karena variasi budaya di Bali.
Error Handling: API mengembalikan status 400 untuk input tidak valid dan 500 untuk kesalahan server.

Kontribusi
Kami menyambut kontribusi untuk meningkatkan API ini! Untuk berkontribusi:

Fork repositori di GitHub.
Buat branch untuk perubahan Anda (git checkout -b feature/nama-fitur).
Commit perubahan Anda (git commit -m 'Menambahkan fitur X').
Push ke branch Anda (git push origin feature/nama-fitur).
Buat pull request di GitHub.

Silakan laporkan isu atau saran di GitHub Issues.
Lisensi
API ini dirilis di bawah Lisensi MIT. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini sesuai ketentuan lisensi.
Kontak

Email: support@kalenderbali.com
GitHub: JukutPremium/Kalender-Bali-API
Dokumentasi: https://kalender-bali-api.vercel.app

Bagikan API ini:

Facebook
Twitter/X
WhatsApp
Discord

© 2025 Kalender Bali API. Dibuat untuk pelestarian budaya Bali.