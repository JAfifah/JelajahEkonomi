export const QUIZ_LEVELS = [
  {
    id: 'kuis-kelangkaan',
    name: 'Kuis Konsep Kelangkaan (Pulau Keinginan)',
    description: 'Uji pemahamanmu mengenai keterbatasan sumber daya dan skala prioritas.',
    badge: 'Detektif Kelangkaan',
    unlockedAtLevel: 1,
    rewardCoins: 60,
    rewardXp: 50,
    questions: [
      {
        id: 'qk-1',
        category: 'Kelangkaan',
        question: 'Masalah mendasar dalam ilmu ekonomi di mana kebutuhan manusia tidak terbatas sementara alat pemuas kebutuhan bersifat terbatas disebut...',
        options: ['Surplus Produksi', 'Kelangkaan (Scarcity)', 'Distribusi Langsung', 'Monopoli Pasar'],
        correctIndex: 1,
        explanation: 'Kelangkaan (Scarcity) adalah kondisi di mana sumber daya terbatas tidak cukup untuk memenuhi semua kebutuhan manusia yang tak terbatas.'
      },
      {
        id: 'qk-2',
        category: 'Kebutuhan',
        question: 'Buku tulis, seragam sekolah, dan makan siang kantin bagi seorang siswa kelas 7 tergolong kebutuhan...',
        options: ['Kebutuhan Tersier', 'Kebutuhan Sekunder', 'Kebutuhan Primer', 'Kebutuhan Mewah'],
        correctIndex: 2,
        explanation: 'Pendidikan dasar, pakaian, dan makanan adalah Kebutuhan Primer (Pokok) wajib seorang pelajar.'
      },
      {
        id: 'qk-3',
        category: 'Prioritas',
        question: 'Tindakan paling bijak saat siswa memiliki uang saku terbatas adalah...',
        options: [
          'Membeli mainan mahal dulu lalu berutang untuk buku',
          'Menyusun skala prioritas dan mendahulukan kebutuhan sekolah',
          'Menghabiskan uang saku untuk game online',
          'Membeli aksesoris mewah'
        ],
        correctIndex: 1,
        explanation: 'Skala prioritas membantu mengalokasikan sumber daya terbatas untuk hal terpenting lebih dahulu.'
      }
    ]
  },
  {
    id: 'kuis-distribusi-perusahaan',
    name: 'Kuis Jalur Distribusi Perusahaan (Pelabuhan Perdagangan)',
    description: 'Studi kasus alur pengiriman produk pabrik ke konsumen akhir.',
    badge: 'Ahli Logistik',
    unlockedAtLevel: 1,
    rewardCoins: 70,
    rewardXp: 60,
    questions: [
      {
        id: 'qd-1',
        category: 'Distribusi',
        question: 'Pabrik mie instan menyalurkan barangnya ke pedagang grosir, lalu grosir ke toko eceran, hingga sampai ke pembeli. Saluran ini adalah...',
        options: ['Distribusi Langsung', 'Distribusi Tidak Langsung', 'Distribusi Tanpa Perantara', 'Distribusi Perorangan'],
        correctIndex: 1,
        explanation: 'Menggunakan pedagang besar (grosir) dan pedagang eceran sebagai perantara dinamakan Distribusi Tidak Langsung.'
      },
      {
        id: 'qd-2',
        category: 'Lembaga Distribusi',
        question: 'Pedagang yang membeli barang dalam jumlah besar dari pabrik untuk dijual kembali kepada pemilik warung eceran disebut...',
        options: ['Konsumen Akhir', 'Grosir / Pedagang Besar', 'Produsen Utama', 'Wirausahawan Baru'],
        correctIndex: 1,
        explanation: 'Grosir bertindak sebagai perantara yang membeli dalam jumlah sangat banyak untuk disalurkan ke pengecer.'
      },
      {
        id: 'qd-3',
        category: 'Distribusi Semi-Langsung',
        question: 'Perusahaan sepatu menjual produknya melalui Official Store (toko cabang resmi milik sendiri) di mall. Ini dinamakan...',
        options: ['Distribusi Langsung', 'Distribusi Semi-Langsung', 'Distribusi Bebas', 'Distribusi Internasional'],
        correctIndex: 1,
        explanation: 'Penyaluran lewat toko/outlet milik produsen sendiri dinamakan Distribusi Semi-Langsung.'
      }
    ]
  },
  {
    id: 'master-ekonomi',
    name: 'Kuis Evaluasi Master Ekonomi (Pulau Kewirausahaan)',
    description: 'Ujian akhir integrasi 7 pulau kegiatan ekonomi IPS SMP!',
    badge: 'Master Ekonomi',
    unlockedAtLevel: 2,
    rewardCoins: 150,
    rewardXp: 120,
    questions: [
      {
        id: 'qm-1',
        category: 'Produksi',
        question: 'Pengolahan kayu jati menjadi meja belajar sekolah yang meningkatkan kegunaan benda merupakan contoh...',
        options: ['Time Utility', 'Place Utility', 'Form Utility (Nilai Guna Bentuk)', 'Ownership Utility'],
        correctIndex: 2,
        explanation: 'Form Utility adalah peningkatan manfaat barang akibat perubahan bentuk fisik.'
      },
      {
        id: 'qm-2',
        category: 'Faktor Produksi',
        question: 'Kemampuan seorang pengusaha mengombinasikan faktor alam, tenaga kerja, dan modal agar meraih keuntungan dinamakan...',
        options: ['Faktor Modal', 'Faktor Alam', 'Faktor Kewirausahaan (Entrepreneurship)', 'Faktor Konsumsi'],
        correctIndex: 2,
        explanation: 'Faktor Kewirausahaan adalah skill manajerial dalam mengelola faktor produksi lainnya.'
      },
      {
        id: 'qm-3',
        category: 'Jasa',
        question: 'Dokter di rumah sakit dan salon kecantikan menghasilkan bentuk kegiatan ekonomi berupa...',
        options: ['Produksi Barang Modal', 'Produksi Jasa', 'Distribusi Tidak Langsung', 'Kelangkaan Alam'],
        correctIndex: 1,
        explanation: 'Layanan dokter dan salon tidak menghasilkan benda fisik melainkan layanan bernilai guna (Produksi Jasa).'
      }
    ]
  }
];
