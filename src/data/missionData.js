export const MISSIONS_DATA = [
  {
    id: 'pulau-keinginan',
    islandKey: 'wants',
    locationName: 'Pulau Keinginan',
    title: 'Misi Pengenalan Kebutuhan & Kelangkaan',
    icon: 'Compass',
    badgeColor: 'bg-orange-500',
    accentColor: 'orange',
    accentGradient: 'from-amber-500 to-orange-500',
    cardBorderHover: 'hover:border-orange-400',
    targetTab: 'materi',
    materiId: 'kebutuhan-kelangkaan',
    quizId: 'kuis-kelangkaan',
    description: 'Pahami perbedaan kebutuhan manusia dan konsep kelangkaan barang pemuas kebutuhan dalam kehidupan sehari-hari.',
    tasks: [
      {
        id: 'wants-t1',
        text: 'Identifikasi Batasan Alat Pemuas Kebutuhan',
        type: 'materi',
        detail: 'Pelajari mengapa sumber daya alam dan uang saku bersifat terbatas dalam ekonomi.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'wants-t2',
        text: 'Bedakan Kebutuhan Primer, Sekunder, dan Tersier',
        type: 'materi',
        detail: 'Kelompokkan benda-benda di sekitarmu menjadi Kebutuhan Pokok, Pelengkap, dan Mewah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'wants-t3',
        text: 'Susun Skala Prioritas Kebutuhan Pribadi',
        type: 'shop',
        detail: 'Gunakan Toko Karakter untuk memilih item kebutuhan sekolah di atas keinginan aksesoris.',
        rewardCoins: 30,
        rewardXp: 25
      },
      {
        id: 'wants-t4',
        text: 'Selesaikan Kuis Konsep Kelangkaan',
        type: 'quiz',
        detail: 'Uji pengetahuanmu tentang Scarcity (Kelangkaan) di menu Kuis IPS.',
        rewardCoins: 40,
        rewardXp: 35
      }
    ]
  },
  {
    id: 'pulau-sumber-daya',
    islandKey: 'resources',
    locationName: 'Pulau Sumber Daya',
    title: 'Misi Eksplorasi Faktor Alam',
    icon: 'Trees',
    badgeColor: 'bg-emerald-500',
    accentColor: 'emerald',
    accentGradient: 'from-emerald-500 to-teal-600',
    cardBorderHover: 'hover:border-emerald-400',
    targetTab: 'ai-mission',
    materiId: 'faktor-alam',
    aiMissionId: 'sumber-daya-alam',
    description: 'Jelajahi kekayaan faktor alam asli yang disediakan bumi sebagai bahan utama kegiatan produksi.',
    tasks: [
      {
        id: 'res-t1',
        text: 'Daftar 5 Faktor Alam Lokal untuk Produksi',
        type: 'materi',
        detail: 'Pelajari tanah, air, udara, iklim, dan bahan mentah di Indonesia.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'res-t2',
        text: 'Analisis Pemanfaatan Bahan Tambang & Energi',
        type: 'materi',
        detail: 'Pahami penggunaan batu bara, minyak bumi, dan gas alam untuk daya pabrik.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'res-t3',
        text: 'Pahami Peran Makhluk Hidup dalam Produksi',
        type: 'materi',
        detail: 'Pelajari kontribusi tumbuhan dan hewan pada industri pangan & tekstil.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'res-t4',
        text: 'Foto Objek Sumber Daya Alam dengan AI Scanner',
        type: 'ai-scan',
        detail: 'Ambil foto tanaman, tanah, atau bahan alam sekitar dengan Google Gemini AI Scanner.',
        rewardCoins: 40,
        rewardXp: 35
      }
    ]
  },
  {
    id: 'pelabuhan-perdagangan',
    islandKey: 'trade',
    locationName: 'Pelabuhan Perdagangan',
    title: 'Misi Perdagangan & Distribusi',
    icon: 'Ship',
    badgeColor: 'bg-sky-500',
    accentColor: 'sky',
    accentGradient: 'from-sky-500 to-blue-600',
    cardBorderHover: 'hover:border-sky-400',
    targetTab: 'materi',
    materiId: 'distribusi',
    quizId: 'kuis-distribusi-perusahaan',
    aiMissionId: 'distribusi',
    description: 'Pelajari alur penyaluran barang dari produsen pabrik hingga sampai ke tangan pembeli.',
    tasks: [
      {
        id: 'trade-t1',
        text: 'Pelajari 3 Saluran Distribusi (Langsung, Semi, Tidak Langsung)',
        type: 'materi',
        detail: 'Pahami perbedaan penjualan tanpa perantara, toko resmi produsen, dan rantai grosir.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'trade-t2',
        text: 'Pahami Peran Lembaga Distribusi (Grosir, Agen, Pengecer)',
        type: 'materi',
        detail: 'Analisis perbedaan tugas pedagang besar, agen tunggal, dan warung retailer.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'trade-t3',
        text: 'Foto Aktivitas Logistik / Warung Sekitar',
        type: 'ai-scan',
        detail: 'Foto kurir paket, truk ekspedisi, atau warung klontong terdekat untuk diverifikasi AI.',
        rewardCoins: 40,
        rewardXp: 35
      },
      {
        id: 'trade-t4',
        text: 'Selesaikan Kuis Jalur Distribusi Perusahaan',
        type: 'quiz',
        detail: 'Uji kemampuanmu memecahkan studi kasus alur pengiriman produk barang.',
        rewardCoins: 40,
        rewardXp: 35
      }
    ]
  },
  {
    id: 'misi-pasar',
    islandKey: 'marketplace',
    locationName: 'Misi Pasar',
    title: 'Misi Pola Konsumen & Pasar',
    icon: 'Store',
    badgeColor: 'bg-yellow-500',
    accentColor: 'amber',
    accentGradient: 'from-amber-500 to-yellow-500',
    cardBorderHover: 'hover:border-amber-400',
    targetTab: 'materi',
    materiId: 'pola-konsumen-pasar',
    description: 'Analisis perilaku pembeli di pasar dan konsep Nilai Guna (Utility) suatu barang.',
    tasks: [
      {
        id: 'mkt-t1',
        text: 'Identifikasi 3 Kebutuhan Pasar Konsumen',
        type: 'materi',
        detail: 'Pahami apa yang dicari pembeli: harga terjangkau, kualitas baik, dan kemudahan akses.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'mkt-t2',
        text: 'Pahami Konsep Nilai Guna Barang',
        type: 'materi',
        detail: 'Pelajari Form Utility, Place Utility, Time Utility, dan Ownership Utility.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'mkt-t3',
        text: 'Analisis Faktor Internal (Motivasi & Selera) Pembeli',
        type: 'materi',
        detail: 'Pelajari bagaimana selera, usia, dan pendapatan memengaruhi konsumsi seseorang.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'mkt-t4',
        text: 'Analisis Faktor Eksternal (Harga & Kebudayaan) Konsumsi',
        type: 'materi',
        detail: 'Pahami pengaruh iklim geografis, tradisi daerah, dan tren iklan pada pasar.',
        rewardCoins: 25,
        rewardXp: 20
      }
    ]
  },
  {
    id: 'hutan-sumberdaya',
    islandKey: 'forest',
    locationName: 'Hutan Sumberdaya',
    title: 'Misi Konservasi & Bahan Baku',
    icon: 'Trees',
    badgeColor: 'bg-teal-600',
    accentColor: 'teal',
    accentGradient: 'from-emerald-600 to-teal-700',
    cardBorderHover: 'hover:border-teal-400',
    targetTab: 'ai-mission',
    materiId: 'konservasi-bahan-baku',
    aiMissionId: 'kayu-mebel',
    description: 'Pahami rantai pasok pengolahan hasil hutan menjadi mebel serta pentingnya menjaga kelestarian lingkungan.',
    tasks: [
      {
        id: 'fst-t1',
        text: 'Identifikasi Hasil Hutan sebagai Bahan Baku Industri',
        type: 'materi',
        detail: 'Pelajari kayu jati, rotan, getah karet, dan damar untuk industri manufaktur.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'fst-t2',
        text: 'Pahami Rantai Pasok Pengolahan Kayu Menjadi Mebel',
        type: 'materi',
        detail: 'Telusuri perjalanan dari pohon di hutan ➔ penggergajian ➔ pengrajin mebel ➔ toko furnitur.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'fst-t3',
        text: 'Analisis Keseimbangan Lingkungan dan Produksi',
        type: 'materi',
        detail: 'Pelajari prinsip reboisasi dan tebang pilih agar produksi tetap ramah lingkungan.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'fst-t4',
        text: 'Scan Produk Olahan Kayu dengan AI Scanner',
        type: 'ai-scan',
        detail: 'Gunakan kamera AI Scanner untuk mefoto meja kayu, kursi, pensil, atau barang olahan kayu.',
        rewardCoins: 40,
        rewardXp: 35
      }
    ]
  },
  {
    id: 'bank-investasi',
    islandKey: 'investment',
    locationName: 'Bank Investasi',
    title: 'Misi Pengelolaan Modal & Keuangan',
    icon: 'Landmark',
    badgeColor: 'bg-indigo-600',
    accentColor: 'indigo',
    accentGradient: 'from-indigo-600 to-purple-600',
    cardBorderHover: 'hover:border-indigo-400',
    targetTab: 'shop',
    materiId: 'modal-keuangan',
    description: 'Kelola faktor modal produksi dan lakukan simulasi tabungan & perencanaan anggaran belanja yang bijak.',
    tasks: [
      {
        id: 'inv-t1',
        text: 'Pahami Faktor Modal Produksi (Uang, Mesin, Gedung)',
        type: 'materi',
        detail: 'Pelajari jenis modal konkret (mesin, pabrik) dan modal abstrak (kepercayaan, merek).',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'inv-t2',
        text: 'Simulasi Pengelolaan Koin Edukasi & Tabungan',
        type: 'shop',
        detail: 'Tabung Koin Edukasi dari hasil kuis untuk membeli perlengkapan sekolah karakter.',
        rewardCoins: 30,
        rewardXp: 25
      },
      {
        id: 'inv-t3',
        text: 'Pelajari Peran Modal dalam Memperlancar Produksi',
        type: 'materi',
        detail: 'Pahami bagaimana modal modern mempercepat dan meningkatkan kualitas barang.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'inv-t4',
        text: 'Evaluasi Anggaran Pembelian Item di Toko Karakter',
        type: 'shop',
        detail: 'Lakukan transaksi pembelian item Kebutuhan Primer di Avatar Wardrobe.',
        rewardCoins: 35,
        rewardXp: 30
      }
    ]
  },
  {
    id: 'pulau-kewirausahaan',
    islandKey: 'entrepreneur',
    locationName: 'Pulau Kewirausahaan',
    title: 'Misi Keahlian & Jenis Produksi',
    icon: 'Award',
    badgeColor: 'bg-purple-600',
    accentColor: 'purple',
    accentGradient: 'from-purple-600 to-pink-600',
    cardBorderHover: 'hover:border-purple-400',
    targetTab: 'materi',
    materiId: 'kewirausahaan-jasa',
    quizId: 'master-ekonomi',
    description: 'Kuasai faktor keahlian wirausaha, jenis produksi barang & jasa, serta raih predikat tertinggi Master Ekonomi IPS!',
    tasks: [
      {
        id: 'ent-t1',
        text: 'Pahami Peran Faktor Keahlian (Entrepreneurship)',
        type: 'materi',
        detail: 'Pelajari 3 keahlian utama wirausaha: Managerial Skill, Technological Skill, & Organizational Skill.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'ent-t2',
        text: 'Analisis Jenis Produksi Barang (Modal & Konsumsi)',
        type: 'materi',
        detail: 'Bedakan barang modal (mesin pabrik) dan barang konsumsi (makanan & baju).',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'ent-t3',
        text: 'Analisis Jenis Produksi Jasa (Kecantikan, Pariwisata, Pengobatan)',
        type: 'materi',
        detail: 'Pelajari ragam sektor jasa di Indonesia seperti salon, hotel, travel, dan rumah sakit.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'ent-t4',
        text: 'Raih Gelar Master Ekonomi & Selesaikan Semua Misi',
        type: 'master',
        detail: 'Selesaikan seluruh daftar tugas di 7 pulau untuk mengukir namamu sebagai Master Ekonomi IPS!',
        rewardCoins: 100,
        rewardXp: 100
      }
    ]
  }
];
