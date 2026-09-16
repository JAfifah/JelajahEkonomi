export const MATERI_KEGIATAN_EKONOMI = [
  {
    id: 'kebutuhan-kelangkaan',
    title: '1. Kebutuhan & Kelangkaan (Pulau Keinginan)',
    subtitle: 'Pengenalan Kebutuhan Manusia dan Kelangkaan Sumber Daya',
    badgeColor: 'bg-orange-500',
    accentGradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-orange-50 hover:bg-orange-100/50',
    icon: 'Compass',
    summary: 'Kelangkaan terjadi karena kebutuhan manusia tidak terbatas sementara alat pemuas kebutuhan (sumber daya dan uang) bersifat terbatas.',
    sections: [
      {
        heading: '💡 Identifikasi Batasan Alat Pemuas Kebutuhan',
        content: `Dalam ilmu IPS Ekonomi, alat pemuas kebutuhan dapat berupa **barang** (fisik) dan **jasa** (layanan). Alat pemuas kebutuhan ini bersifat **terbatas** karena jumlah sumber daya alam, modal, serta kemampuan produksi manusia terbatas. Di sisi lain, kebutuhan manusia terus meningkat seiring perkembangan waktu.`,
        keyPoints: [
          '**Kelangkaan (Scarcity)**: Kondisi ketidakseimbangan antara kebutuhan manusia yang tak terbatas dan sumber daya yang terbatas.',
          '**Keterbatasan Sumber Daya**: Barang tambang, air bersih, lahan, serta pendapatan uang saku bersifat terbatas.',
          '**Pilihan Ekonomi**: Mengingat sumber daya terbatas, setiap individu harus mengambil keputusan terbaik.'
        ]
      },
      {
        heading: '📊 Kebutuhan Primer, Sekunder, dan Tersier',
        content: 'Berdasarkan intensitas atau tingkat kepentingannya, kebutuhan manusia dibedakan menjadi 3 jenjang:',
        typeCards: [
          {
            title: '1. Kebutuhan Primer (Pokok)',
            desc: 'Kebutuhan mutlak yang harus dipenuhi agar manusia dapat bertahan hidup.',
            examples: 'Pangan (makan/minum), Sandang (pakaian), Papan (tempat tinggal), dan Pendidikan dasar.'
          },
          {
            title: '2. Kebutuhan Sekunder (Pelengkap)',
            desc: 'Kebutuhan yang dipenuhi setelah kebutuhan primer terpenuhi untuk melengkapi kenyamanan hidup.',
            examples: 'Sepatu sekolah cadangan, sepeda, peralatan olahraga, lemari pakaian, buku bacaan.'
          },
          {
            title: '3. Kebutuhan Tersier (Mewah)',
            desc: 'Kebutuhan akan barang-barang mewah untuk meningkatkan status sosial atau prestise.',
            examples: 'Mobil mewah, perhiasan mahal, liburan ke luar negeri, aksesoris kolektor.'
          }
        ]
      },
      {
        heading: '⚖️ Menyusun Skala Prioritas Kebutuhan Pribadi',
        content: `Agar uang saku yang terbatas dapat memenuhi kebutuhan terpenting, seorang siswa harus menyusun **Skala Prioritas Kebutuhan**:`,
        priorities: [
          { label: 'Prioritas I (Sangat Mendesak & Penting)', desc: 'Makanan pokok kantin, buku IPS, alat tulis sekolah.' },
          { label: 'Prioritas II (Penting tapi Kurang Mendesak)', desc: 'Sepatu cadangan, dompet pensil baru.' },
          { label: 'Prioritas III (Kurang Penting / Keinginan)', desc: 'Game konsol mahal, aksesoris avatar kemewahan.' }
        ]
      }
    ],
    quickCheck: {
      question: 'Manakah di bawah ini yang merupakan Kebutuhan Primer bagi seorang pelajar SMP?',
      options: [
        'Membeli mainan video game terbaru',
        'Membeli buku paket sekolah dan alat tulis',
        'Membeli perhiasan emas'
      ],
      correctAnswer: 1,
      explanation: 'Buku pelajaran dan alat tulis adalah Kebutuhan Primer untuk mendukung aktivitas pendidikan dasar.'
    }
  },
  {
    id: 'faktor-alam',
    title: '2. Faktor Alam & Produksi (Pulau Sumber Daya)',
    subtitle: 'Eksplorasi Kekayaan Alam Asli untuk Kegiatan Produksi',
    badgeColor: 'bg-emerald-500',
    accentGradient: 'from-emerald-500 to-teal-700',
    bgLight: 'bg-emerald-50 hover:bg-emerald-100/50',
    icon: 'Trees',
    summary: 'Faktor alam adalah seluruh kekayaan bumi yang disediakan alam secara langsung untuk diolah menjadi barang pemuas kebutuhan.',
    sections: [
      {
        heading: '🌿 5 Faktor Alam Lokal untuk Produksi',
        content: `Indonesia kaya akan sumber daya alam yang melimpah. Faktor produksi alam (Land/Natural Resources) meliputi:`,
        bullets: [
          '**Tanah**: Lahan untuk pertanian, perkebunan, mendirikan pabrik, dan bangunan.',
          '**Air**: Untuk irigasi sawah, sumber daya pembangkit listrik (PLTA), serta konsumsi pabrik.',
          '**Udara & Iklim**: Menentukan masa tanam tanaman pangan dan mendukung energi angin.',
          '**Tumbuhan & Hewan**: Bahan baku industri makanan, tekstil (kapas/wol), dan obat-obatan.',
          '**Barang Tambang**: Bahan mentah industri manufaktur dan energi dasar.'
        ]
      },
      {
        heading: '⛏️ Pemanfaatan Bahan Tambang & Energi',
        content: `Bahan tambang dibedakan menjadi tambang energi (batu bara, minyak bumi, gas alam) dan tambang logam (biji besi, tembaga, emas, nikel). Bahan energi menggerakkan mesin-mesin industri modern.`,
        keyPoints: [
          '**Minyak Bumi & Gas**: Bahan bakar transportasi logistik dan daya pabrik.',
          '**Nikel & Tembaga**: Bahan utama baterai kendaraan listrik dan perangkat elektronik.',
          '**Batu Bara**: Sumber energi utama pembangkit listrik tenaga uap (PLTU).'
        ]
      },
      {
        heading: '🐾 Peran Makhluk Hidup dalam Produksi',
        content: 'Tumbuhan menyediakan kapas untuk benang kain, kayu untuk konstruksi mebel, dan padi untuk pangan. Hewan menyediakan daging, susu, kulit untuk sepatu, serta wol untuk pakaian.'
      }
    ],
    quickCheck: {
      question: 'Tanah, air, dan barang tambang tergolong ke dalam faktor produksi...',
      options: [
        'Faktor Modal Turunan',
        'Faktor Alam (Asli)',
        'Faktor Kewirausahaan'
      ],
      correctAnswer: 1,
      explanation: 'Faktor Alam adalah kekayaan langsung dari bumi yang belum diolah manusia (Faktor Produksi Asli).'
    }
  },
  {
    id: 'distribusi',
    title: '3. Perdagangan & Distribusi (Pelabuhan Perdagangan)',
    subtitle: 'Menyalurkan Produk dari Produsen ke Konsumen',
    badgeColor: 'bg-blue-500',
    accentGradient: 'from-blue-500 to-indigo-700',
    bgLight: 'bg-blue-50 hover:bg-blue-100/50',
    icon: 'Truck',
    summary: 'Distribusi adalah kegiatan menyalurkan barang dan jasa dari pabrik/produsen hingga ke tangan pembeli tepat waktu dan lokasi.',
    sections: [
      {
        heading: '🛤️ 3 Saluran Distribusi Utama',
        channels: [
          {
            name: '1. Distribusi Langsung',
            badge: 'Produsen ➔ Konsumen',
            desc: 'Produsen menjual barang langsung kepada konsumen tanpa perantara.',
            example: 'Petani menjual buah hasil panen langsung di pinggir jalan sawah.'
          },
          {
            name: '2. Distribusi Semi-Langsung',
            badge: 'Produsen ➔ Outlet Resmi ➔ Konsumen',
            desc: 'Penyaluran produk melalui perantara toko/cabang resmi milik produsen sendiri.',
            example: 'Pabrik sepatu merek lokal menjual melalui toko cabang resmi di mall.'
          },
          {
            name: '3. Distribusi Tidak Langsung',
            badge: 'Produsen ➔ Grosir ➔ Pengecer ➔ Konsumen',
            desc: 'Melalui perantara pedagang besar (grosir), agen, dan warung eceran.',
            example: 'Pabrik mie instan ➔ Agen besar ➔ Warung tetangga ➔ Pembeli.'
          }
        ]
      },
      {
        heading: '👥 Lembaga Perantara Distribusi',
        keyPoints: [
          '**Grosir (Pedagang Besar)**: Membeli barang dalam jumlah besar dari pabrik dan menjualnya kembali ke toko eceran.',
          '**Agen**: Perantara yang bertindak atas nama produsen untuk menyalurkan barang ke daerah tertentu.',
          '**Pengecer (Retailer)**: Membeli barang dari grosir dan menjualnya dalam satuan kecil langsung ke masyarakat (contoh: warung, minimarket).'
        ]
      }
    ],
    quickCheck: {
      question: 'Siswa membeli alat tulis di warung dekat sekolah. Warung tersebut berperan sebagai...',
      options: [
        'Grosir / Pedagang Besar',
        'Pengecer (Retailer)',
        'Agen Tunggal Produsen'
      ],
      correctAnswer: 1,
      explanation: 'Warung menjual dalam satuan eceran kecil langsung kepada konsumen akhir (Pengecer).'
    }
  },
  {
    id: 'pola-konsumen-pasar',
    title: '4. Pola Konsumen & Pasar (Misi Pasar)',
    subtitle: 'Analisis Kebutuhan Pasar Konsumen & Nilai Guna Barang',
    badgeColor: 'bg-yellow-500',
    accentGradient: 'from-amber-500 to-yellow-600',
    bgLight: 'bg-amber-50 hover:bg-amber-100/50',
    icon: 'Store',
    summary: 'Pasar adalah tempat bertemunya permintaan pembeli dan penawaran penjual. Konsumen membeli barang berdasarkan Nilai Guna (Utility).',
    sections: [
      {
        heading: '🛒 3 Kebutuhan Utama Pasar Konsumen',
        content: `Konsumen di pasar memiliki 3 ekspektasi utama saat membeli barang atau jasa:`,
        bullets: [
          '**Harga Terjangkau & Sesuai Kualitas**: Konsumen mencari nilai harga (value for money) terbaik.',
          '**Kualitas & Keamanan Produk**: Barang harus berfungsi baik, tahan lama, dan aman digunakan.',
          '**Kemudahan Akses & Pelayanan**: Kemudahan menemukan tempat penjual atau transaksi online cepat.'
        ]
      },
      {
        heading: '💎 4 Konsep Nilai Guna Barang (Utility)',
        keyPoints: [
          '**Form Utility (Nilai Guna Bentuk)**: Perubahan bentuk menambah kegunaan (kayu jadi meja jahit).',
          '**Place Utility (Nilai Guna Tempat)**: Barang lebih berguna di lokasi tepat (pasir di lokasi pembangunan).',
          '**Time Utility (Nilai Guna Waktu)**: Barang lebih berguna pada waktu tepat (payung saat hujan).',
          '**Ownership Utility (Nilai Guna Kepemilikan)**: Barang berguna setelah dimiliki secara sah (buku cetak setelah dibeli).'
        ]
      },
      {
        heading: '⚖️ Faktor Internal & Eksternal Konsumsi',
        factorsList: [
          {
            category: 'Faktor Internal (Diri Sendiri)',
            items: [
              '**Pendapatan / Uang Saku**: Makin besar uang saku, tingkat konsumsi cenderung meningkat.',
              '**Selera & Kepribadian**: Hobi musik mendorong pembelian alat musik.',
              '**Usia & Gender**: Kebutuhan siswa SMP berbeda dengan anak balita.'
            ]
          },
          {
            category: 'Faktor Eksternal (Lingkungan)',
            items: [
              '**Harga Barang di Pasar**: Kenaikan harga memengaruhi jumlah yang dibeli.',
              '**Lingkungan & Iklim**: Masyarakat pegunungan butuh jaket tebal.',
              '**Tradisi & Kebudayaan**: Hari raya meningkatkan konsumsi bahan kue.'
            ]
          }
        ]
      }
    ],
    quickCheck: {
      question: 'Kayu glondongan diolah menjadi meja belajar hingga nilainya meningkat. Ini contoh nilai guna...',
      options: [
        'Time Utility',
        'Form Utility (Bentuk)',
        'Place Utility'
      ],
      correctAnswer: 1,
      explanation: 'Form Utility adalah kenaikan manfaat barang akibat perubahan bentuk fisik dari bahan mentah.'
    }
  },
  {
    id: 'konservasi-bahan-baku',
    title: '5. Konservasi & Bahan Baku (Hutan Sumberdaya)',
    subtitle: 'Rantai Pasok Hasil Hutan & Keseimbangan Lingkungan',
    badgeColor: 'bg-teal-600',
    accentGradient: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-teal-50 hover:bg-teal-100/50',
    icon: 'Trees',
    summary: 'Hutan menghasilkan kayu jati, rotan, dan getah sebagai bahan baku mebel & industri, namun penggunaannya harus menjaga keseimbangan alam.',
    sections: [
      {
        heading: '🌲 Hasil Hutan Sebagai Bahan Baku Industri',
        content: `Hutan Indonesia menghasilkan bahan baku berkualitas tinggi:`,
        bullets: [
          '**Kayu Jati & Mahoni**: Untuk industri mebel, furnitur rumah, dan konstruksi gedung.',
          '**Rotan**: Untuk kerajinan aneka anyaman dan kursi estetik.',
          '**Getah Karet (Lateks)**: Untuk ban kendaraan dan bahan olahan karet.'
        ]
      },
      {
        heading: '🪵 Rantai Pasok Kayu Menjadi Mebel',
        content: `Perjalanan kayu dari hutan hingga menjadi meja belajar siswa:`,
        priorities: [
          { label: 'Langkah 1: Penebangan Terkontrol', desc: 'Pohon jati ditebang sesuai izin Sistem Verifikasi Legalitas Kayu (SVLK).' },
          { label: 'Langkah 2: Pengolahan di Penggergajian (Sawmill)', desc: 'Batang pohon dipotong menjadi papan kayu standar.' },
          { label: 'Langkah 3: Pengrajin & Industri Mebel', desc: 'Papan dirakit, diampelas, dan diwarnai menjadi meja & kursi.' },
          { label: 'Langkah 4: Toko Furnitur & Distribusi', desc: 'Mebel dijual ke konsumen untuk memenuhi kebutuhan rumah tangga.' }
        ]
      },
      {
        heading: '♻️ Keseimbangan Lingkungan & Produksi Sustainable',
        content: 'Produksi industri kayu wajib menerapkan sistem **Tebang Pilih** dan **Reboisasi** (penanaman kembali) agar hutan tidak gundul dan bencana banjir terhindari.'
      }
    ],
    quickCheck: {
      question: 'Sistem menanam kembali pohon yang telah ditebang di hutan dinamakan...',
      options: [
        'Form Utility',
        'Reboisasi',
        'Distribusi Semi Langsung'
      ],
      correctAnswer: 1,
      explanation: 'Reboisasi adalah upaya konservasi lingkungan dengan menanam kembali pohon di lahan hutan.'
    }
  },
  {
    id: 'modal-keuangan',
    title: '6. Pengelolaan Modal & Keuangan (Bank Investasi)',
    subtitle: 'Faktor Modal Produksi & Perencanaan Anggaran Siswa',
    badgeColor: 'bg-indigo-600',
    accentGradient: 'from-indigo-600 to-purple-600',
    bgLight: 'bg-indigo-50 hover:bg-indigo-100/50',
    icon: 'Landmark',
    summary: 'Modal adalah sarana pendukung produksi (mesin, pabrik, uang). Siswa diajak mengelola uang saku & tabungan secara bijaksana.',
    sections: [
      {
        heading: '🏭 Faktor Modal Produksi (Capital)',
        content: `Modal tergolong Faktor Produksi Turunan yang berfungsi memperlancar proses pembuatan barang.`,
        keyPoints: [
          '**Modal Konkret (Nyata)**: Mesin cetak, gedung pabrik, truk angkut, dan peralatan kerja.',
          '**Modal Abstrak (Tak Berwujud)**: Kepercayaan, hak paten, nama baik merek (goodwill).',
          '**Modal Sendiri vs Modal Pinjaman**: Sumber dana yang berasal dari tabungan pribadi atau pinjaman bank.'
        ]
      },
      {
        heading: '💰 Tabungan & Pengelolaan Koin Edukasi',
        content: `Dalam game dan kehidupan nyata, menyisihkan sebagian koin/pendapatan untuk **menabung** memberi keamanan finansial di masa depan.`
      }
    ],
    quickCheck: {
      question: 'Mesin jahit, gedung pabrik, dan alat pertukangan tergolong ke dalam faktor...',
      options: [
        'Faktor Alam Asli',
        'Faktor Modal Produksi',
        'Faktor Konsumsi Akhir'
      ],
      correctAnswer: 1,
      explanation: 'Peralatan dan gedung pabrik adalah sarana pendukung untuk memperlancar produksi (Faktor Modal).'
    }
  },
  {
    id: 'kewirausahaan-jasa',
    title: '7. Keahlian & Jenis Produksi (Pulau Kewirausahaan)',
    subtitle: 'Faktor Kewirausahaan, Produksi Barang & Jasa',
    badgeColor: 'bg-purple-600',
    accentGradient: 'from-purple-600 to-pink-600',
    bgLight: 'bg-purple-50 hover:bg-purple-100/50',
    icon: 'Award',
    summary: 'Wirausahawan (Entrepreneur) mengelola faktor alam, tenaga kerja, dan modal agar efisien. Hasilnya berupa produksi barang atau jasa.',
    sections: [
      {
        heading: '🚀 Peran Faktor Keahlian (Entrepreneurship)',
        content: `Tanpa jiwa wirausaha, faktor alam, modal, dan tenaga kerja tidak akan berjalan optimal. Seorang wirausahawan memiliki 3 keahlian:`,
        bullets: [
          '**Managerial Skill**: Kemampuan mengelola dan memimpin usaha.',
          '**Technological Skill**: Kemampuan menguasai teknik dan teknologi produksi.',
          '**Organizational Skill**: Kemampuan membagi tugas dan mengorganisasi tim kerja.'
        ]
      },
      {
        heading: '📦 Produksi Barang (Modal vs Konsumsi)',
        content: 'Barang Modal digunakan untuk membuat barang lain (mesin bubut), sedangkan Barang Konsumsi langsung dipakai masyarakat (pakaian, roti).'
      },
      {
        heading: '💆 Produksi Jasa (Kecantikan, Pariwisata, Pengobatan)',
        content: 'Produksi Jasa memberikan pelayanan bermanfaat tanpa wujud fisik: Jasa Kecantikan (salon/barbershop), Jasa Pariwisata (hotel/tour), dan Jasa Pengobatan (dokter/rumah sakit).'
      }
    ],
    quickCheck: {
      question: 'Layanan dokter rumah sakit dan pemandu wisata tergolong ke dalam jenis...',
      options: [
        'Produksi Barang Modal',
        'Produksi Jasa',
        'Distribusi Langsung'
      ],
      correctAnswer: 1,
      explanation: 'Dokter dan pemandu wisata memberikan pelayanan non-fisik yang bernilai guna (Produksi Jasa).'
    }
  }
];
