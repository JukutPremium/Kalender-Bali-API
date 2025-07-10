Dokumentasi API Kalender Bali
Deskripsi
API Kalender Bali menyediakan konversi tanggal Masehi ke dalam sistem kalender Bali, termasuk perhitungan wuku, pancawara, saptawara, triwara, tahun Saka, sasih, lintang, pararasan, ingkel, serta identifikasi hari raya dan hari baik (Dewasa Ayu). API ini menggunakan pustaka astronomy-engine untuk akurasi perhitungan fase bulan (Purnama dan Tilem) dan mendukung validasi lokal untuk hari-hari tertentu yang bervariasi antar daerah di Bali.
Persyaratan

Node.js: Versi 14 atau lebih tinggi.
Dependensi:
express: Untuk server HTTP.
astronomy-engine: Untuk perhitungan fase bulan.Instal dependensi dengan perintah:

npm install express astronomy-engine


Port: API berjalan secara default pada port 3000.

Cara Menjalankan

Simpan kode API dalam file (misalnya, app.js).
Instal dependensi menggunakan perintah di atas.
Jalankan server dengan:node app.js


API akan tersedia di http://localhost:3000.

Endpoint API
Berikut adalah daftar semua endpoint yang tersedia beserta deskripsi, format input, dan contoh output.
1. GET /api/bali-calendar/today
Deskripsi: Mendapatkan informasi kalender Bali untuk tanggal hari ini.
Input:

Tidak diperlukan parameter.

Output:

JSON berisi detail kalender Bali untuk hari ini.

Contoh Permintaan:
curl http://localhost:3000/api/bali-calendar/today

Contoh Respons:
{
  "gregorianDate": "2025-07-10",
  "sakaYear": 1947,
  "sasih": "Kadasa",
  "wuku": "Sinta",
  "pancawara": "Umanis",
  "saptawara": "Wraspati",
  "triwara": "Kajeng",
  "lintang": "Perahu",
  "pararasan": "Laku Bintang",
  "ingkel": "Wong",
  "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
  "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
  "isFullMoon": false,
  "isNewMoon": false
}

2. GET /api/bali-calendar/:date
Deskripsi: Mendapatkan informasi kalender Bali untuk tanggal tertentu.
Input:

Parameter URL: date (format YYYY-MM-DD).

Output:

JSON berisi detail kalender Bali untuk tanggal yang diminta.

Contoh Permintaan:
curl http://localhost:3000/api/bali-calendar/2025-07-10

Contoh Respons:(Sama seperti respons /api/bali-calendar/today di atas)
Error:

400: Jika format tanggal tidak valid.{ "error": "Format tanggal tidak valid. Gunakan YYYY-MM-DD" }



3. GET /api/galungan-kuningan/:year
Deskripsi: Mendapatkan daftar tanggal Galungan dan Kuningan dalam tahun tertentu.
Input:

Parameter URL: year (tahun dalam format YYYY, rentang 1900–2100).

Output:

Array JSON berisi tanggal, nama event, dan detail kalender Bali untuk Galungan dan Kuningan.

Contoh Permintaan:
curl http://localhost:3000/api/galungan-kuningan/2025

Contoh Respons:
[
  {
    "date": "2025-03-05",
    "event": "Galungan",
    "baliDate": {
      "gregorianDate": "2025-03-05",
      "sakaYear": 1947,
      "sasih": "Kapitu",
      "wuku": "Dunggulan",
      "pancawara": "Paing",
      "saptawara": "Buda",
      "triwara": "Pasah",
      "lintang": "Lembu",
      "pararasan": "Aras Kembang",
      "ingkel": "Manuk",
      "importantDays": ["Galungan"],
      "requiresLocalValidation": [],
      "isFullMoon": false,
      "isNewMoon": false
    }
  },
  {
    "date": "2025-03-15",
    "event": "Kuningan",
    "baliDate": {
      "gregorianDate": "2025-03-15",
      "sakaYear": 1947,
      "sasih": "Kapitu",
      "wuku": "Kuningan",
      "pancawara": "Kliwon",
      "saptawara": "Saniscara",
      "triwara": "Kajeng",
      "lintang": "Jangur",
      "pararasan": "Laku Bulan",
      "ingkel": "Sato",
      "importantDays": ["Kuningan"],
      "requiresLocalValidation": [],
      "isFullMoon": false,
      "isNewMoon": false
    }
  }
]

Error:

400: Jika tahun tidak valid.{ "error": "Tahun tidak valid" }



4. GET /api/bali-calendar/range/:startDate/:endDate
Deskripsi: Mendapatkan informasi kalender Bali untuk rentang tanggal tertentu.
Input:

Parameter URL:
startDate (format YYYY-MM-DD).
endDate (format YYYY-MM-DD).



Output:

Array JSON berisi detail kalender Bali untuk setiap hari dalam rentang tanggal.

Contoh Permintaan:
curl http://localhost:3000/api/bali-calendar/range/2025-07-01/2025-07-03

Contoh Respons:
[
  {
    "gregorianDate": "2025-07-01",
    "sakaYear": 1947,
    "sasih": "Kadasa",
    "wuku": "Ugu",
    "pancawara": "Kliwon",
    "saptawara": "Soma",
    "triwara": "Beteng",
    "lintang": "Saudara",
    "pararasan": "Laku Surya",
    "ingkel": "Buku",
    "importantDays": [],
    "requiresLocalValidation": [],
    "isFullMoon": false,
    "isNewMoon": false
  },
  {
    "gregorianDate": "2025-07-02",
    "sakaYear": 1947,
    "sasih": "Kadasa",
    "wuku": "Ugu",
    "pancawara": "Umanis",
    "saptawara": "Anggara",
    "triwara": "Kajeng",
    "lintang": "Tangis",
    "pararasan": "Laku Pandita Sakti",
    "ingkel": "Wong",
    "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "isFullMoon": false,
    "isNewMoon": false
  },
  {
    "gregorianDate": "2025-07-03",
    "sakaYear": 1947,
    "sasih": "Kadasa",
    "wuku": "Ugu",
    "pancawara": "Paing",
    "saptawara": "Buda",
    "triwara": "Pasah",
    "lintang": "Salah Wadi",
    "pararasan": "Aras Tuding",
    "ingkel": "Sato",
    "importantDays": [],
    "requiresLocalValidation": [],
    "isFullMoon": false,
    "isNewMoon": false
  }
]

Error:

400: Jika format tanggal tidak valid atau tanggal mulai lebih besar dari tanggal akhir.{ "error": "Format tanggal tidak valid" }

{ "error": "Tanggal mulai harus lebih kecil dari tanggal akhir" }



5. GET /api/important-days/:year/:month
Deskripsi: Mendapatkan daftar hari penting (hari raya dan hari baik) dalam bulan tertentu.
Input:

Parameter URL:
year (tahun dalam format YYYY, rentang 1900–2100).
month (bulan dalam format MM, 1–12).



Output:

Array JSON berisi detail kalender Bali untuk hari-hari dengan importantDays tidak kosong.

Contoh Permintaan:
curl http://localhost:3000/api/important-days/2025/7

Contoh Respons:
[
  {
    "gregorianDate": "2025-07-02",
    "sakaYear": 1947,
    "sasih": "Kadasa",
    "wuku": "Ugu",
    "pancawara": "Umanis",
    "saptawara": "Anggara",
    "triwara": "Kajeng",
    "lintang": "Tangis",
    "pararasan": "Laku Pandita Sakti",
    "ingkel": "Wong",
    "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "isFullMoon": false,
    "isNewMoon": false
  },
  {
    "gregorianDate": "2025-07-10",
    "sakaYear": 1947,
    "sasih": "Kadasa",
    "wuku": "Sinta",
    "pancawara": "Umanis",
    "saptawara": "Wraspati",
    "triwara": "Kajeng",
    "lintang": "Perahu",
    "pararasan": "Laku Bintang",
    "ingkel": "Wong",
    "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
    "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
    "isFullMoon": false,
    "isNewMoon": false
  }
]

Error:

400: Jika tahun atau bulan tidak valid.{ "error": "Tahun atau bulan tidak valid" }



6. GET /api/dewasa-ayu/:year/:month
Deskripsi: Mendapatkan daftar hari baik (Dewasa Ayu) dalam bulan tertentu.
Input:

Parameter URL:
year (tahun dalam format YYYY, rentang 1900–2100).
month (bulan dalam format MM, 1–12).



Output:

Array JSON berisi tanggal, hari baik, dan detail kalender Bali untuk hari-hari dengan Dewasa Ayu.

Contoh Permintaan:
curl http://localhost:3000/api/dewasa-ayu/2025/7

Contoh Respons:
[
  {
    "date": "2025-07-02",
    "auspiciousDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
    "baliDate": {
      "gregorianDate": "2025-07-02",
      "sakaYear": 1947,
      "sasih": "Kadasa",
      "wuku": "Ugu",
      "pancawara": "Umanis",
      "saptawara": "Anggara",
      "triwara": "Kajeng",
      "lintang": "Tangis",
      "pararasan": "Laku Pandita Sakti",
      "ingkel": "Wong",
      "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
      "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)"],
      "isFullMoon": false,
      "isNewMoon": false
    }
  },
  {
    "date": "2025-07-10",
    "auspiciousDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
    "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
    "baliDate": {
      "gregorianDate": "2025-07-10",
      "sakaYear": 1947,
      "sasih": "Kadasa",
      "wuku": "Sinta",
      "pancawara": "Umanis",
      "saptawara": "Wraspati",
      "triwara": "Kajeng",
      "lintang": "Perahu",
      "pararasan": "Laku Bintang",
      "ingkel": "Wong",
      "importantDays": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
      "requiresLocalValidation": ["Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)", "Wraspati Wage (Hari Baik untuk Pendidikan)"],
      "isFullMoon": false,
      "isNewMoon": false
    }
  }
]

Error:

400: Jika tahun atau bulan tidak valid.{ "error": "Tahun atau bulan tidak valid" }



7. GET /api/info
Deskripsi: Mendapatkan informasi tentang sistem kalender Bali dan fitur API.
Input:

Tidak diperlukan parameter.

Output:

JSON berisi deskripsi API, fitur, dependensi, catatan, dan daftar elemen kalender Bali serta hari penting.

Contoh Permintaan:
curl http://localhost:3000/api/info

Contoh Respons:
{
  "description": "API Kalender Bali untuk konversi tanggal Masehi ke sistem kalender Bali",
  "features": [
    "Konversi tanggal ke sistem wuku (30 hari)",
    "Perhitungan pancawara (5 hari), saptawara (7 hari), triwara (3 hari)",
    "Perhitungan lintang, pararasan, dan ingkel",
    "Perhitungan tahun Saka dan sasih",
    "Identifikasi hari raya dan hari baik (Dewasa Ayu) dengan validasi lokal",
    "Pencarian Galungan, Kuningan, dan hari penting lainnya",
    "Perhitungan Purnama dan Tilem menggunakan astronomy-engine"
  ],
  "dependencies": [
    "astronomy-engine: Untuk perhitungan fase bulan yang akurat"
  ],
  "notes": [
    "Beberapa hari raya dan hari baik memerlukan validasi lokal karena variasi antar daerah di Bali.",
    "Konsultasikan dengan ahli wariga atau sumber budaya Bali untuk aturan Dewasa Ayu yang lengkap.",
    "Gunakan kalender Bali resmi untuk acara penting."
  ],
  "wuku": ["Sinta", "Landep", "Ukir", ...],
  "pancawara": ["Umanis", "Paing", "Pon", "Wage", "Kliwon"],
  "saptawara": ["Redite", "Soma", "Anggara", "Buda", "Wraspati", "Sukra", "Saniscara"],
  "triwara": ["Pasah", "Beteng", "Kajeng"],
  "sasih": ["Kasa", "Karo", "Katiga", ...],
  "lintang": ["Tangis", "Salah Wadi", "Perahu", ...],
  "pararasan": ["Laku Pandita Sakti", "Aras Tuding", ...],
  "ingkel": ["Wong", "Sato", "Mina", ...],
  "importantDays": [
    "Galungan", "Kuningan", "Kajeng Kliwon", "Tumpek Landep", "Saraswati",
    "Tumpek Wariga", "Tumpek Krulut", "Tumpek Kandang", "Tumpek Uduh",
    "Tumpek Wayang", "Banyu Pinaruh", "Penampahan Galungan", "Manis Galungan",
    "Nyepi", "Pagerwesi", "Siwa Ratri", "Soma Ribek", "Buda Cemeng Klawu",
    "Anggara Kasih Julungwangi", "Rebo Wekasan", "Anggara Kasih", "Buda Kliwon",
    "Purnama", "Tilem", "Guru Purnama", "Purnama Kapat", "Purnama Kadasa",
    "Tilem Kepitu"
  ],
  "auspiciousDays": [
    "Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)",
    "Soma Pon (Hari Baik untuk Usaha)",
    "Wraspati Wage (Hari Baik untuk Pendidikan)",
    "Sukra Umanis (Hari Baik untuk Acara Sosial)",
    "Redite Umanis (Hari Baik untuk Pernikahan)",
    "Saniscara Paing (Hari Baik untuk Membangun Rumah)"
  ]
}

Catatan Penting

Akurasi Fase Bulan:
API menggunakan astronomy-engine untuk perhitungan Purnama dan Tilem yang akurat. Namun, untuk acara resmi, selalu periksa dengan kalender Bali resmi.


Validasi Lokal:
Hari-hari yang ditandai dalam requiresLocalValidation (misalnya, Tumpek Wariga, Dewasa Ayu) dapat bervariasi antar daerah di Bali. Konsultasikan dengan pemuka agama atau komunitas lokal.


Aturan Dewasa Ayu:
Hari baik (Dewasa Ayu) dalam API adalah subset dari aturan tradisional. Untuk keperluan spesifik (misalnya, pernikahan, pembangunan), konsultasikan dengan ahli wariga.


Kinerja:
Untuk rentang tanggal besar, respons mungkin memakan waktu karena perhitungan per hari. Pertimbangkan caching untuk aplikasi dengan lalu lintas tinggi.


Error Handling:
Semua endpoint menangani kesalahan dengan kode status HTTP (400 untuk input tidak valid, 500 untuk kesalahan server, 404 untuk endpoint tidak ditemukan).



Struktur Data Output
Setiap respons kalender Bali (kecuali /api/info dan /api/galungan-kuningan) mengembalikan objek dengan properti berikut:

gregorianDate: Tanggal Masehi (YYYY-MM-DD).
sakaYear: Tahun Saka.
sasih: Bulan Bali (misalnya, Kadasa).
wuku: Minggu Bali (misalnya, Sinta).
pancawara: Hari dalam siklus 5 hari (misalnya, Umanis).
saptawara: Hari dalam siklus 7 hari (misalnya, Wraspati).
triwara: Hari dalam siklus 3 hari (misalnya, Kajeng).
lintang: Bintang hari (misalnya, Perahu).
pararasan: Karakter hari (misalnya, Laku Bintang).
ingkel: Siklus hewan (misalnya, Wong).
importantDays: Array hari raya atau hari baik (misalnya, ["Galungan", "Kajeng Kliwon"]).
requiresLocalValidation: Array hari yang memerlukan validasi lokal.
isFullMoon: Boolean, apakah tanggal adalah Purnama.
isNewMoon: Boolean, apakah tanggal adalah Tilem.

Contoh Penggunaan

Mencari Hari Raya di Bulan Tertentu:Gunakan /api/important-days/2025/3 untuk menemukan Galungan, Kuningan, atau Nyepi di Maret 2025.
Merencanakan Pernikahan:Gunakan /api/dewasa-ayu/2025/7 untuk menemukan hari baik seperti Redite Umanis, lalu validasi dengan ahli wariga.
Integrasi dengan Aplikasi:Gunakan /api/bali-calendar/range untuk menampilkan kalender Bali bulanan dalam aplikasi web, dengan penanda untuk hari raya.

Kontribusi dan Dukungan

Bug atau Saran: Laporkan masalah atau ajukan fitur baru melalui repository proyek (jika ada).
Validasi Budaya: Untuk memastikan akurasi budaya, kolaborasi dengan ahli wariga atau komunitas Bali sangat dianjurkan.
Sumber Resmi: Gunakan kalender Bali resmi dari Parisada Hindu Dharma Indonesia atau sumber lokal untuk acara penting.

Lisensi
API ini dibuat untuk tujuan pendidikan dan budaya. Pastikan penggunaan sesuai dengan nilai-nilai budaya Bali dan hormati tradisi lokal.