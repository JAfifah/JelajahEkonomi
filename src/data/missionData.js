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
    aiMissionId: 'kebutuhan-kelangkaan',
    description: 'Pahami perbedaan kebutuhan manusia dan konsep kelangkaan barang pemuas kebutuhan dalam kehidupan sehari-hari.',
    tasks: [
      {
        id: 'wants-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Pengenalan Kebutuhan & Kelangkaan hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'wants-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Konsep Kelangkaan.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'wants-t3',
        text: 'Menyelesaikan Misi Foto: Misi Pengenalan Kebutuhan & Kelangkaan',
        type: 'ai-scan',
        detail: 'Pindai objek alat pemuas kebutuhan dasar manusia dengan AI Scanner.',
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
    targetTab: 'materi',
    materiId: 'faktor-alam',
    quizId: 'kuis-faktor-alam',
    aiMissionId: 'sumber-daya-alam',
    description: 'Jelajahi kekayaan faktor alam asli yang disediakan bumi sebagai bahan utama kegiatan produksi.',
    tasks: [
      {
        id: 'res-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Eksplorasi Faktor Alam hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'res-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Faktor Alam.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'res-t3',
        text: 'Menyelesaikan Misi Foto: Misi Eksplorasi Faktor Alam',
        type: 'ai-scan',
        detail: 'Pindai kekayaan alam lokal (tanah, tanaman, air, bebatuan) dengan AI Scanner.',
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
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Perdagangan & Distribusi hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'trade-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Distribusi Perusahaan.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'trade-t3',
        text: 'Menyelesaikan Misi Foto: Misi Perdagangan & Distribusi',
        type: 'ai-scan',
        detail: 'Pindai aktivitas kurir, truk logistik, atau warung kelontong dengan AI Scanner.',
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
    quizId: 'kuis-pola-konsumen',
    aiMissionId: 'konsumsi',
    description: 'Analisis perilaku pembeli di pasar dan konsep Nilai Guna (Utility) suatu barang.',
    tasks: [
      {
        id: 'mkt-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Pola Konsumen & Pasar hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'mkt-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Pola Konsumen.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'mkt-t3',
        text: 'Menyelesaikan Misi Foto: Misi Pola Konsumen & Pasar',
        type: 'ai-scan',
        detail: 'Foto barang konsumsi harian seperti buku IPS, makanan, atau sepatu dengan AI Scanner.',
        rewardCoins: 40,
        rewardXp: 35
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
    targetTab: 'materi',
    materiId: 'konservasi-bahan-baku',
    quizId: 'kuis-konservasi',
    aiMissionId: 'kayu-mebel',
    description: 'Pahami rantai pasok pengolahan hasil hutan menjadi mebel serta pentingnya menjaga kelestarian lingkungan.',
    tasks: [
      {
        id: 'fst-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Konservasi & Bahan Baku hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'fst-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Konservasi & Bahan Baku.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'fst-t3',
        text: 'Menyelesaikan Misi Foto: Misi Konservasi & Bahan Baku',
        type: 'ai-scan',
        detail: 'Pindai meja kayu, kursi, pensil, atau produk olahan kayu dengan AI Scanner.',
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
    targetTab: 'materi',
    materiId: 'modal-keuangan',
    quizId: 'kuis-modal-keuangan',
    aiMissionId: 'modal-keuangan',
    description: 'Kelola faktor modal produksi dan lakukan simulasi tabungan & perencanaan anggaran belanja yang bijak.',
    tasks: [
      {
        id: 'inv-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Pengelolaan Modal & Keuangan hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'inv-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Pengelolaan Modal & Keuangan.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'inv-t3',
        text: 'Menyelesaikan Misi Foto: Misi Pengelolaan Modal & Keuangan',
        type: 'ai-scan',
        detail: 'Pindai benda penunjang modal (peralatan kerja/mesin) dengan AI Scanner.',
        rewardCoins: 40,
        rewardXp: 35
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
    aiMissionId: 'bebas',
    description: 'Kuasai faktor keahlian wirausaha, jenis produksi barang & jasa, serta raih predikat tertinggi Master Ekonomi IPS!',
    tasks: [
      {
        id: 'ent-t1',
        text: 'Menyelesaikan Materi',
        type: 'materi',
        detail: 'Pelajari modul Keahlian & Jenis Produksi hingga titik terbawah.',
        rewardCoins: 25,
        rewardXp: 20
      },
      {
        id: 'ent-t2',
        text: 'Menyelesaikan Kuis Adaptif',
        type: 'quiz',
        detail: 'Jawab seluruh pertanyaan pada Kuis Adaptif Keahlian & Jenis Produksi.',
        rewardCoins: 35,
        rewardXp: 30
      },
      {
        id: 'ent-t3',
        text: 'Menyelesaikan Misi Foto: Misi Keahlian & Jenis Produksi',
        type: 'ai-scan',
        detail: 'Pindai hasil proses produksi barang/jasa dengan AI Scanner.',
        rewardCoins: 40,
        rewardXp: 35
      }
    ]
  }
];
