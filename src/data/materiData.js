export const MATERI_KEGIATAN_EKONOMI = [
  {
    id: 'produksi',
    title: '1. Kegiatan Produksi',
    subtitle: 'Menciptakan & Menambah Nilai Guna Barang / Jasa',
    badgeColor: 'bg-emerald-500',
    accentGradient: 'from-emerald-500 to-teal-700',
    bgLight: 'bg-emerald-50 hover:bg-emerald-100/50',
    icon: 'Factory',
    summary: 'Produksi adalah setiap kegiatan manusia yang menghasilkan barang/jasa atau menambah nilai guna suatu benda untuk memenuhi kebutuhan hidup.',
    sections: [
      {
        heading: '💡 Pengertian & Konsep Produksi',
        content: `Dalam ilmu IPS Ekonomi, **Produksi** tidak hanya diartikan sebagai proses membuat barang dari tidak ada menjadi ada (seperti membuat meja dari kayu). Produksi juga mencakup kegiatan **menambah nilai guna** barang yang sudah ada sehingga lebih bermanfaat (seperti mengubah kain menjadi baju seragam).`,
        keyPoints: [
          '**Produsen**: Orang atau badan/lembaga yang melakukan kegiatan produksi.',
          '**Nilai Guna Bentuk (Form Utility)**: Perubahan bentuk barang membuat nilai gunanya naik (contoh: kayu jadi almari).',
          '**Nilai Guna Tempat (Place Utility)**: Pasir di sungai bernilai tinggi jika dipindahkan ke lokasi pembangunan gedung.',
          '**Nilai Guna Waktu (Time Utility)**: Payung bernilai tinggi saat musim hujan.'
        ]
      },
      {
        heading: '📦 Jenis Hasil Produksi',
        content: 'Berdasarkan wujudnya, hasil produksi dibedakan menjadi dua kategori utama:',
        typeCards: [
          {
            title: 'Produksi Barang',
            desc: 'Menghasilkan benda berwujud fisik yang dapat disentuh dan disimpan.',
            examples: 'Sepatu sekolah, makanan kemasan, meja belajar, laptop, buku IPS.'
          },
          {
            title: 'Produksi Jasa',
            desc: 'Menghasilkan pelayanan atau aktivitas non-fisik yang memberi manfaat.',
            examples: 'Jasa pengajaran guru, layanan dokter, pangkas rambut, bengkel motor, transportasi online.'
          }
        ]
      },
      {
        heading: '🎯 Tujuan Kegiatan Produksi',
        bullets: [
          'Memenuhi kebutuhan konsumen akan barang dan jasa.',
          'Mengganti barang yang rusak atau habis dipakai.',
          'Mendapatkan keuntungan (laba) bagi produsen.',
          'Menjaga keberlangsungan usaha dan membuka lapangan kerja bagi masyarakat.'
        ]
      },
      {
        heading: '⚡ 4 Faktor Produksi (Sumber Daya Produksi)',
        content: 'Untuk menjalankan proses produksi, produsen membutuhkan 4 faktor penting:',
        factors: [
          {
            name: '1. Faktor Alam (Land/Natural)',
            type: 'Asli',
            desc: 'Segala kekayaan alam yang disediakan bumi untuk bahan baku produksi (tanah, air, barang tambang, iklim).'
          },
          {
            name: '2. Faktor Tenaga Kerja (Labor)',
            type: 'Asli',
            desc: 'Kemampuan manusia (jasmani & rohani) dalam mengolah barang. Dibedakan menjadi: Terdidik (Dokter, Guru), Terlatih (Sopir, Montir), dan Tidak Terdidik (Kuli angkut).'
          },
          {
            name: '3. Faktor Modal (Capital)',
            type: 'Turunan',
            desc: 'Segala sarana dan alat yang digunakan untuk mempermudah produksi (mesin, pabrik, uang modal, peralatan).'
          },
          {
            name: '4. Faktor Kewirausahaan / Keahlian (Entrepreneurship)',
            type: 'Turunan',
            desc: 'Kemampuan mengorganisasi dan mengelola 3 faktor produksi lainnya agar berjalan efisien dan menguntungkan.'
          }
        ]
      }
    ],
    quickCheck: {
      question: 'Manakah di bawah ini yang merupakan contoh perubahan Nilai Guna Bentuk (Form Utility)?',
      options: [
        'Menggunakan jas hujan saat cuaca mendung',
        'Mengolah kedelai menjadi tempe yang bergizi',
        'Mengirim beras dari desa ke pasar kota'
      ],
      correctAnswer: 1,
      explanation: 'Mengubah kedelai menjadi tempe mengubah bentuk bahan mentah menjadi makanan jadi bernilai guna tinggi (Form Utility).'
    }
  },
  {
    id: 'distribusi',
    title: '2. Kegiatan Distribusi',
    subtitle: 'Menyalurkan Produk dari Produsen ke Konsumen',
    badgeColor: 'bg-blue-500',
    accentGradient: 'from-blue-500 to-indigo-700',
    bgLight: 'bg-blue-50 hover:bg-blue-100/50',
    icon: 'Truck',
    summary: 'Distribusi adalah seluruh kegiatan menyalurkan barang atau jasa dari produsen sampai ke tangan konsumen dengan tepat waktu dan lokasi.',
    sections: [
      {
        heading: '🚚 Pengertian & Pentingnya Distribusi',
        content: `Tanpa distribusi, barang yang diproduksi di pabrik tidak akan bisa dinikmati oleh konsumen yang berada di lokasi berjauhan. Orang atau lembaga yang melakukan kegiatan distribusi disebut **Distributor**.`
      },
      {
        heading: '🎯 Tujuan Distribusi',
        bullets: [
          'Menyampaikan barang dan jasa ke tangan konsumen tepat waktu.',
          'Menjaga kontinuitas/kelangsungan kegiatan produksi pabrik.',
          'Memeratakan penyebaran barang di seluruh wilayah Indonesia.',
          'Menjaga stabilitas harga barang di pasar.'
        ]
      },
      {
        heading: '🛤️ 3 Saluran Distribusi Utama',
        channels: [
          {
            name: '1. Distribusi Langsung',
            badge: 'Produsen ➔ Konsumen',
            desc: 'Produsen menjual produknya secara langsung tanpa perantara.',
            example: 'Petani menjual sayur segar langsung di pinggir sawah, atau pembuat kue menjual hasil buatannya di toko sendiri.'
          },
          {
            name: '2. Distribusi Semi-Langsung',
            badge: 'Produsen ➔ Perantara Milik Sendiri ➔ Konsumen',
            desc: 'Menyelenggarakan penyaluran melalui outlet/toko resmi milik produsen sendiri.',
            example: 'Pabrik sepatu merek lokal menjual barang melalui toko cabang resmi di mall.'
          },
          {
            name: '3. Distribusi Tidak Langsung',
            badge: 'Produsen ➔ Agen / Grosir ➔ Pengecer ➔ Konsumen',
            desc: 'Melalui rantai perantara pedagang besar (grosir) dan pedagang eceran (warung/supermarket).',
            example: 'Pabrik mie instan menyalurkan produk ke agen besar, lalu ke agen daerah, warung klontong, baru dibeli siswa.'
          }
        ]
      },
      {
        heading: '👥 Lembaga Perantara Distribusi',
        keyPoints: [
          '**Agen**: Perantara yang bertindak atas nama produsen untuk menjual produk.',
          '**Grosir (Pedagang Besar)**: Membeli barang dalam jumlah sangat besar dari produsen lalu menjualnya ke pengecer.',
          '**Pengecer (Retailer)**: Membeli barang dari grosir dan menjualnya dalam satuan kecil langsung ke konsumen akhir (contoh: minimarket, warung).'
        ]
      }
    ],
    quickCheck: {
      question: 'Budi membeli pensil di warung tetangga dekat rumah. Warung tetangga berperan sebagai saluran distribusi...',
      options: [
        'Distribusi Langsung',
        'Distribusi Tidak Langsung melalui Pengecer',
        'Distribusi Semi-Langsung'
      ],
      correctAnswer: 1,
      explanation: 'Warung klontong tetangga adalah Pengecer (Retailer) dalam rantai distribusi tidak langsung dari pabrik pensil.'
    }
  },
  {
    id: 'konsumsi',
    title: '3. Kegiatan Konsumsi',
    subtitle: 'Menggunakan & Menghabiskan Nilai Guna Barang',
    badgeColor: 'bg-purple-500',
    accentGradient: 'from-purple-500 to-pink-700',
    bgLight: 'bg-purple-50 hover:bg-purple-100/50',
    icon: 'ShoppingCart',
    summary: 'Konsumsi adalah kegiatan mengurangi atau menghabiskan nilai guna suatu barang/jasa secara bertahap atau langsung untuk memenuhi kebutuhan.',
    sections: [
      {
        heading: '🛒 Pengertian & Karakteristik Konsumsi',
        content: `Orang atau kelompok yang menggunakan barang/jasa disebut **Konsumen**. Konsumsi tidak hanya berarti memakan makanan, tetapi juga memakai baju, naik angkutan umum, menggunakan listrik, dan menonton bioskop.`
      },
      {
        heading: '🎯 Tujuan Konsumsi',
        bullets: [
          'Memenuhi kebutuhan jasmani (makan, minum, pakaian, olahraga).',
          'Memenuhi kebutuhan rohani (rekreasi, hiburan, menuntut ilmu).',
          'Mencapai kepuasan optimal dan taraf hidup yang layak.'
        ]
      },
      {
        heading: '⚖️ Faktor yang Memengaruhi Konsumsi',
        content: 'Tingkat konsumsi setiap siswa atau keluarga berbeda-beda disebabkan oleh faktor internal dan eksternal:',
        factorsList: [
          {
            category: 'Faktor Internal (Dari Dalam Diri)',
            items: [
              '**Besarnya Pendapatan / Uang Saku**: Makin besar uang saku, cenderung makin tinggi konsumsinya.',
              '**Selera & Kepribadian**: Siswa yang hobi membaca akan lebih banyak mengonsumsi buku.',
              '**Umur & Jenis Kelamin**: Kebutuhan pakaian & porsi makan remaja berkembang cepat.',
              '**Tingkat Pendidikan**: Kebutuhan siswa SMP berbeda dengan anak TK.'
            ]
          },
          {
            category: 'Faktor Eksternal (Dari Lingkungan Luar)',
            items: [
              '**Lingkungan Tempat Tinggal**: Masyarakat pesisir butuh pakaian tipis, masyarakat pegunungan butuh jaket tebal.',
              '**Kemajuan Teknologi & Adat Istiadat**: Tren HP pintar dan tradisi perayaan daerah.',
              '**Harga Barang & Jasa di Pasar**: Jika harga naik, konsumsi cenderung disesuaikan.'
            ]
          }
        ]
      },
      {
        heading: '📊 Skala Prioritas Kebutuhan (Penting untuk Siswa!)',
        content: `Karena uang dan sumber daya terbatas sedangkan keinginan manusia tidak terbatas, siswa harus menyusun **Skala Prioritas**:`,
        priorities: [
          { label: 'Prioritas I (Sangat Penting & Mendesak)', desc: 'Kebutuhan Primer: Makanan pokok, buku sekolah, alat tulis.' },
          { label: 'Prioritas II (Penting tapi Kurang Mendesak)', desc: 'Kebutuhan Sekunder: Sepatu cadangan, dompet pensil bagus.' },
          { label: 'Prioritas III (Kurang Penting / Keinginan)', desc: 'Kebutuhan Tersier: Mainan mahal, aksesori mewah.' }
        ]
      }
    ],
    quickCheck: {
      question: 'Membuat urutan daftar belanja dari yang paling mendesak hingga yang bisa ditunda disebut...',
      options: [
        'Skala Prioritas Kebutuhan',
        'Faktor Produksi Modal',
        'Saluran Distribusi Semi Langsung'
      ],
      correctAnswer: 0,
      explanation: 'Skala Prioritas Kebutuhan membantu kita mengelola uang dengan bijak sesuai tingkat urgenitas kebutuhan!'
    }
  }
];
