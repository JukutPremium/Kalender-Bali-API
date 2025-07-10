const express = require('express');
const astronomy = require('astronomy-engine');
const app = express();

app.use(express.json());

const WUKU = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg', 'Wariga',
    'Warigadian', 'Julungwangi', 'Sungsang', 'Dunggulan', 'Kuningan',
    'Langkir', 'Medangsia', 'Pujut', 'Pahang', 'Krulut', 'Merakih',
    'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail', 'Prangbakat',
    'Bala', 'Ugu', 'Wayang', 'Klawu', 'Dukut', 'Watugunung'
];

const SASIH = [
    'Kasa', 'Karo', 'Katiga', 'Kapat', 'Kalima', 'Kanem',
    'Kapitu', 'Kawolu', 'Kasanga', 'Kadasa', 'Jiyestha', 'Sadha'
];

const PANCAWARA = ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'];
const SAPTAWARA = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara'];
const TRIWARA = ['Pasah', 'Beteng', 'Kajeng'];
const LINTANG = ['Tangis', 'Salah Wadi', 'Perahu', 'Lembu', 'Jangur', 'Pepe', 'Saudara'];
const PARARASAN = ['Laku Pandita Sakti', 'Aras Tuding', 'Aras Kembang', 'Laku Bintang', 'Laku Bulan', 'Laku Surya'];
const INGKEL = ['Wong', 'Sato', 'Mina', 'Manuk', 'Taru', 'Buku'];

const REFERENCE_DATE = new Date(2000, 0, 1);
const REFERENCE_WUKU = 0;
const REFERENCE_PANCAWARA = 2;
const REFERENCE_SAPTAWARA = 6;

class BaliCalendar {
    constructor() {
        this.sakaEpoch = new Date(78, 2, 22);
    }

    getDaysDifference(date) {
        const timeDiff = date.getTime() - REFERENCE_DATE.getTime();
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    }

    getWuku(date) {
        const days = this.getDaysDifference(date);
        const wukuIndex = (REFERENCE_WUKU + days) % 30;
        return WUKU[wukuIndex < 0 ? wukuIndex + 30 : wukuIndex];
    }

    getPancawara(date) {
        const days = this.getDaysDifference(date);
        const pancawaraIndex = (REFERENCE_PANCAWARA + days) % 5;
        return PANCAWARA[pancawaraIndex < 0 ? pancawaraIndex + 5 : pancawaraIndex];
    }

    getSaptawara(date) {
        const days = this.getDaysDifference(date);
        const saptawaraIndex = (REFERENCE_SAPTAWARA + days) % 7;
        return SAPTAWARA[saptawaraIndex < 0 ? saptawaraIndex + 7 : saptawaraIndex];
    }

    getTriwara(date) {
        const days = this.getDaysDifference(date);
        const triwaraIndex = days % 3;
        return TRIWARA[triwaraIndex < 0 ? triwaraIndex + 3 : triwaraIndex];
    }

    getLintang(date) {
        const days = this.getDaysDifference(date);
        const lintangIndex = days % 7;
        return LINTANG[lintangIndex < 0 ? lintangIndex + 7 : lintangIndex];
    }

    getPararasan(date) {
        const days = this.getDaysDifference(date);
        const pararasanIndex = days % 6;
        return PARARASAN[pararasanIndex < 0 ? pararasanIndex + 6 : pararasanIndex];
    }

    getIngkel(date) {
        const pancawara = this.getPancawara(date);
        const saptawara = this.getSaptawara(date);
        const pancaIndex = PANCAWARA.indexOf(pancawara);
        const saptaIndex = SAPTAWARA.indexOf(saptawara);
        const ingkelIndex = (pancaIndex + saptaIndex) % 6;
        return INGKEL[ingkelIndex];
    }

    getSakaYear(date) {
        const currentYear = date.getFullYear();
        return currentYear - 78;
    }

    getSasih(date) {
        const sakaYear = this.getSakaYear(date);
        const startOfSakaYear = new Date(date.getFullYear() - (date.getMonth() < 2 ? 1 : 0), 2, 22);
        const daysSinceStart = Math.floor((date - startOfSakaYear) / (1000 * 60 * 60 * 24));
        const sasihIndex = Math.floor(daysSinceStart / 29.5) % 12;
        return SASIH[sasihIndex];
    }

    isFullMoon(date) {
        const illum = astronomy.Illumination('Moon', date);
        return illum.phase_fraction >= 0.98;
    }

    isNewMoon(date) {
        const illum = astronomy.Illumination('Moon', date);
        return illum.phase_fraction <= 0.02;
    }

    isNyepi(date) {
        return this.isNewMoon(date) && this.getSasih(date) === 'Kapitu';
    }

    getImportantDays(date) {
        const wuku = this.getWuku(date);
        const pancawara = this.getPancawara(date);
        const saptawara = this.getSaptawara(date);
        const triwara = this.getTriwara(date);
        const sasih = this.getSasih(date);
        const lintang = this.getLintang(date);
        const pararasan = this.getPararasan(date);
        const ingkel = this.getIngkel(date);
        const importantDays = [];
        const requiresLocalValidation = [];

        if (wuku === 'Dunggulan' && saptawara === 'Buda') {
            importantDays.push('Galungan');
        }
        if (wuku === 'Kuningan' && saptawara === 'Saniscara') {
            importantDays.push('Kuningan');
        }
        if (pancawara === 'Kliwon' && triwara === 'Kajeng') {
            importantDays.push('Kajeng Kliwon');
        }
        if (wuku === 'Landep' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Landep');
        }
        if (wuku === 'Uye' && saptawara === 'Saniscara') {
            importantDays.push('Saraswati');
        }
        if (wuku === 'Wariga' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Wariga');
            requiresLocalValidation.push('Tumpek Wariga');
        }
        if (wuku === 'Krulut' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Krulut');
        }
        if (wuku === 'Matal' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Kandang');
            requiresLocalValidation.push('Tumpek Kandang');
        }
        if (wuku === 'Warigadian' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Uduh');
            requiresLocalValidation.push('Tumpek Uduh');
        }
        if (wuku === 'Wayang' && saptawara === 'Saniscara') {
            importantDays.push('Tumpek Wayang');
            requiresLocalValidation.push('Tumpek Wayang');
        }
        if (wuku === 'Julungwangi' && saptawara === 'Saniscara') {
            importantDays.push('Banyu Pinaruh');
        }
        if (wuku === 'Dunggulan' && saptawara === 'Anggara') {
            importantDays.push('Penampahan Galungan');
        }
        if (wuku === 'Dunggulan' && saptawara === 'Wraspati') {
            importantDays.push('Manis Galungan');
        }
        if (this.isNyepi(date)) {
            importantDays.push('Nyepi');
        }
        if (wuku === 'Sinta' && saptawara === 'Buda') {
            importantDays.push('Pagerwesi');
        }
        if (wuku === 'Medangsia' && saptawara === 'Anggara') {
            importantDays.push('Siwa Ratri');
        }
        if (wuku === 'Sungsang' && saptawara === 'Soma') {
            importantDays.push('Soma Ribek');
        }
        if (wuku === 'Klawu' && saptawara === 'Buda') {
            importantDays.push('Buda Cemeng Klawu');
        }
        if (wuku === 'Julungwangi' && saptawara === 'Anggara') {
            importantDays.push('Anggara Kasih Julungwangi');
        }
        if (wuku === 'Watugunung' && saptawara === 'Buda') {
            importantDays.push('Rebo Wekasan');
        }
        if (saptawara === 'Anggara' && pancawara === 'Kliwon') {
            importantDays.push('Anggara Kasih');
            requiresLocalValidation.push('Anggara Kasih');
        }
        if (saptawara === 'Buda' && pancawara === 'Kliwon') {
            importantDays.push('Buda Kliwon');
            requiresLocalValidation.push('Buda Kliwon');
        }
        if (this.isFullMoon(date)) {
            importantDays.push(`Purnama ${sasih}`);
        }
        if (this.isNewMoon(date)) {
            importantDays.push(`Tilem ${sasih}`);
        }
        if (this.isFullMoon(date) && sasih === 'Jiyestha') {
            importantDays.push('Guru Purnama');
        }
        if (this.isFullMoon(date) && sasih === 'Kapat') {
            importantDays.push('Purnama Kapat');
        }
        if (this.isFullMoon(date) && sasih === 'Kadasa') {
            importantDays.push('Purnama Kadasa');
        }
        if (this.isNewMoon(date) && sasih === 'Kapitu') {
            importantDays.push('Tilem Kepitu');
        }

        if (pancawara === 'Umanis' && triwara === 'Kajeng') {
            importantDays.push('Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)');
            requiresLocalValidation.push('Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)');
        }
        if (saptawara === 'Soma' && pancawara === 'Pon' && lintang === 'Saudara') {
            importantDays.push('Soma Pon (Hari Baik untuk Usaha)');
            requiresLocalValidation.push('Soma Pon (Hari Baik untuk Usaha)');
        }
        if (saptawara === 'Wraspati' && pancawara === 'Wage' && pararasan === 'Laku Bintang') {
            importantDays.push('Wraspati Wage (Hari Baik untuk Pendidikan)');
            requiresLocalValidation.push('Wraspati Wage (Hari Baik untuk Pendidikan)');
        }
        if (saptawara === 'Sukra' && pancawara === 'Umanis' && ingkel === 'Wong') {
            importantDays.push('Sukra Umanis (Hari Baik untuk Acara Sosial)');
            requiresLocalValidation.push('Sukra Umanis (Hari Baik untuk Acara Sosial)');
        }
        if (saptawara === 'Redite' && pancawara === 'Umanis' && ['Sinta', 'Landep', 'Ukir'].includes(wuku) && lintang === 'Perahu') {
            importantDays.push('Redite Umanis (Hari Baik untuk Pernikahan)');
            requiresLocalValidation.push('Redite Umanis (Hari Baik untuk Pernikahan)');
        }
        if (saptawara === 'Saniscara' && pancawara === 'Paing' && wuku === 'Tolu' && ingkel === 'Sato') {
            importantDays.push('Saniscara Paing (Hari Baik untuk Membangun Rumah)');
            requiresLocalValidation.push('Saniscara Paing (Hari Baik untuk Membangun Rumah)');
        }

        return { importantDays, requiresLocalValidation };
    }

    getBaliDate(date) {
        const { importantDays, requiresLocalValidation } = this.getImportantDays(date);
        return {
            gregorianDate: date.toISOString().split('T')[0],
            sakaYear: this.getSakaYear(date),
            sasih: this.getSasih(date),
            wuku: this.getWuku(date),
            pancawara: this.getPancawara(date),
            saptawara: this.getSaptawara(date),
            triwara: this.getTriwara(date),
            lintang: this.getLintang(date),
            pararasan: this.getPararasan(date),
            ingkel: this.getIngkel(date),
            importantDays,
            requiresLocalValidation,
            isFullMoon: this.isFullMoon(date),
            isNewMoon: this.isNewMoon(date)
        };
    }

    getGalunganKuningan(year) {
        const results = [];
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const { importantDays } = this.getImportantDays(d);
            if (importantDays.includes('Galungan') || importantDays.includes('Kuningan')) {
                results.push({
                    date: new Date(d).toISOString().split('T')[0],
                    event: importantDays.find(day => day === 'Galungan' || day === 'Kuningan'),
                    baliDate: this.getBaliDate(new Date(d))
                });
            }
        }

        return results;
    }
}

const baliCalendar = new BaliCalendar();

// Routes API
app.get('/api/bali-calendar/today', (req, res) => {
    console.log('Request received for /api/bali-calendar/today', {
        query: req.query,
        params: req.params,
        url: req.originalUrl
    });
    try {
        const today = new Date();
        today.setHours(today.getHours() + 8);
        console.log('Today\'s date (WITA):', today.toISOString());
        const baliDate = baliCalendar.getBaliDate(today);
        console.log('Bali date calculated:', baliDate);
        res.json(baliDate);
    } catch (error) {
        console.error('Error in /api/bali-calendar/today:', error.stack);
        res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
});

app.get('/api/bali-calendar/:date', (req, res) => {
    console.log('Request received for /api/bali-calendar/:date', {
        date: req.params.date,
        url: req.originalUrl
    });
    try {
        const inputDate = new Date(req.params.date);
        if (isNaN(inputDate)) {
            return res.status(400).json({ error: 'Format tanggal tidak valid. Gunakan YYYY-MM-DD' });
        }
        const baliDate = baliCalendar.getBaliDate(inputDate);
        res.json(baliDate);
    } catch (error) {
        console.error('Error in /api/bali-calendar/:date:', error.stack);
        res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
});

app.get('/api/galungan-kuningan/:year', (req, res) => {
    console.log('Request received for /api/galungan-kuningan/:year', {
        year: req.params.year
    });
    try {
        const year = parseInt(req.params.year);
        if (isNaN(year) || year < 1900 || year > 2100) {
            return res.status(400).json({ error: 'Tahun tidak valid' });
        }
        const events = baliCalendar.getGalunganKuningan(year);
        res.json(events);
    } catch (error) {
        console.error('Error in /api/galungan-kuningan/:year:', error.stack);
        res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
});

app.get('/api/bali-calendar/range/:startDate/:endDate', (req, res) => {
    console.log('Request received for /api/bali-calendar/range', {
        startDate: req.params.startDate,
        endDate: req.params.endDate
    });
    try {
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate);
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ error: 'Format tanggal tidak valid' });
        }
        if (startDate > endDate) {
            return res.status(400).json({ error: 'Tanggal mulai harus lebih kecil dari tanggal akhir' });
        }
        const results = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const baliDate = baliCalendar.getBaliDate(new Date(d));
            results.push(baliDate);
        }
        res.json(results);
    } catch (error) {
        console.error('Error in /api/bali-calendar/range:', error.stack);
        res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
});

app.get('/api/important-days/:year/:month', (req, res) => {
    console.log('Request received for /api/important-days', {
        year: req.params.year,
        month: req.params.month
    });
    try {
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: 'Tahun atau bulan tidak valid' });
        }
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const importantDays = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const baliDate = baliCalendar.getBaliDate(new Date(d));
            if (baliDate.importantDays.length > 0) {
                importantDays.push(baliDate);
            }
        }
        res.json(importantDays);
    } catch (error) {
        console.error('Error in /api/important-days/:year/:month:', error.stack);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/dewasa-ayu/:year/:month', (req, res) => {
    console.log('Request received for /api/dewasa-ayu/:year/:month', {
        year: req.params.year,
        month: req.params.month
    });
    try {
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ error: 'Tahun atau bulan tidak valid' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const dewasaAyuDays = [];

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const baliDate = baliCalendar.getBaliDate(new Date(d));
            const auspiciousDays = baliDate.importantDays.filter(day => day.includes('Hari Baik'));
            if (auspiciousDays.length > 0) {
                dewasaAyuDays.push({
                    date: baliDate.gregorianDate,
                    auspiciousDays,
                    requiresLocalValidation: baliDate.requiresLocalValidation.filter(day => day.includes('Hari Baik')),
                    baliDate
                });
            }
        }

        res.json(dewasaAyuDays);
    } catch (error) {
        console.error('Error in /api/dewasa-ayu/:year/:month:', error.stack);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/info', (req, res) => {
    console.log('Request received for /api/info');
    res.json({
        description: 'API Kalender Bali untuk konversi tanggal Masehi ke sistem kalender Bali',
        features: [
            'Konversi tanggal ke sistem wuku (30 hari)',
            'Perhitungan pancawara (5 hari), saptawara (7 hari), triwara (3 hari)',
            'Perhitungan lintang, pararasan, dan ingkel',
            'Perhitungan tahun Saka dan sasih',
            'Identifikasi hari raya dan hari baik (Dewasa Ayu) dengan validasi lokal',
            'Pencarian Galungan, Kuningan, dan hari penting lainnya',
            'Perhitungan Purnama dan Tilem menggunakan astronomy-engine'
        ],
        dependencies: [
            'astronomy-engine: Untuk perhitungan fase bulan yang akurat'
        ],
        notes: [
            'Beberapa hari raya dan hari baik memerlukan validasi lokal karena variasi antar daerah di Bali.',
            'Konsultasikan dengan ahli wariga atau sumber budaya Bali untuk aturan Dewasa Ayu.',
            'Gunakan kalender Bali resmi untuk acara penting.'
        ],
        wuku: WUKU,
        pancawara: PANCAWARA,
        saptawara: SAPTAWARA,
        triwara: TRIWARA,
        sasih: SASIH,
        lintang: LINTANG,
        pararasan: PARARASAN,
        ingkel: INGKEL,
        importantDays: [
            'Galungan', 'Kuningan', 'Kajeng Kliwon', 'Tumpek Landep', 'Saraswati',
            'Tumpek Wariga', 'Tumpek Krulut', 'Tumpek Kandang', 'Tumpek Uduh',
            'Tumpek Wayang', 'Banyu Pinaruh', 'Penampahan Galungan', 'Manis Galungan',
            'Nyepi', 'Pagerwesi', 'Siwa Ratri', 'Soma Ribek', 'Buda Cemeng Klawu',
            'Anggara Kasih Julungwangi', 'Rebo Wekasan', 'Anggara Kasih', 'Buda Kliwon',
            'Purnama', 'Tilem', 'Guru Purnama', 'Purnama Kapat', 'Purnama Kadasa',
            'Tilem Kepitu'
        ],
        auspiciousDays: [
            'Kajeng Kliwon Umanis (Hari Baik untuk Upacara Kecil)',
            'Soma Pon (Hari Baik untuk Usaha)',
            'Wraspati Wage (Hari Baik untuk Pendidikan)',
            'Sukra Umanis (Hari Baik untuk Acara Sosial)',
            'Redite Umanis (Hari Baik untuk Pernikahan)',
            'Saniscara Paing (Hari Baik untuk Membangun Rumah)'
        ]
    });
});

app.use((err, req, res, next) => {
    console.error('Global error:', err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
});

app.use((req, res) => {
    console.log('404 - Endpoint not found:', req.originalUrl);
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

module.exports = app;