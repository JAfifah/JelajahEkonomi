export const QUIZ_LEVELS = [
  {
    id: 'kuis-kelangkaan',
    name: 'Kuis Misi Pengenalan Kebutuhan & Kelangkaan (Pulau Keinginan)',
    description: 'Uji pemahaman mengenai situasi kebutuhan manusia, kelangkaan, dan alokasi sumber daya.',
    badge: 'Detektif Kelangkaan',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk1-1',
        category: 'Kebutuhan & Kelangkaan',
        question: 'Apa yang selalu dihadapi manusia setiap harinya berkaitan dengan situasi kebutuhan mereka?',
        options: [
          'Kebutuhan manusia hampir tidak terbatas, sedangkan alat pemuas kebutuhan terbatas',
          'Kebutuhan manusia sangat terbatas dan alat pemuasnya berlimpah',
          'Kebutuhan dan alat pemuas kebutuhan selalu seimbang',
          'Manusia tidak memiliki kebutuhan sama sekali'
        ],
        correctIndex: 0,
        explanation: 'Inti masalah ekonomi adalah kebutuhan manusia yang tak terbatas berhadapan dengan ketersediaan alat pemuas kebutuhan yang terbatas.'
      },
      {
        id: 'qk1-2',
        category: 'Kegiatan Ekonomi',
        question: 'Mengapa manusia harus melakukan kegiatan ekonomi setiap hari?',
        options: [
          'Demi mengisi waktu luang',
          'Demi memenuhi kebutuhan hidup',
          'Karena diperintah oleh perusahaan besar',
          'Untuk mencari ketenaran semata'
        ],
        correctIndex: 1,
        explanation: 'Manusia melakukan kegiatan ekonomi (produksi, distribusi, konsumsi) demi memenuhi berbagai kebutuhan hidupnya.'
      },
      {
        id: 'qk1-3',
        category: 'Kelangkaan',
        question: 'Apa arti dari situasi di mana jumlah alat pemuas kebutuhan terbatas dibandingkan kebutuhan yang sangat banyak?',
        options: [
          'Kelimpahan',
          'Kemakmuran mutlak',
          'Kelangkaan',
          'Kesejahteraan'
        ],
        correctIndex: 2,
        explanation: 'Kelangkaan (Scarcity) adalah kondisi ketidakseimbangan antara kebutuhan yang tak terbatas dengan sumber daya yang terbatas.'
      },
      {
        id: 'qk1-4',
        category: 'Jenis Kegiatan Ekonomi',
        question: 'Kegiatan yang dilakukan manusia dalam rangka memenuhi kebutuhannya secara garis besar dibagi menjadi berapa jenis?',
        options: [
          'Dua jenis',
          'Tiga jenis (produksi, distribusi, konsumsi)',
          'Empat jenis',
          'Lima jenis'
        ],
        correctIndex: 1,
        explanation: '3 pokok kegiatan ekonomi adalah Produksi (menghasilkan), Distribusi (menyalurkan), dan Konsumsi (menggunakan).'
      },
      {
        id: 'qk1-5',
        category: 'Sifat Kebutuhan',
        question: 'Manakah di bawah ini yang mencerminkan sifat kebutuhan manusia?',
        options: [
          'Sangat sedikit dan mudah habis',
          'Selalu tetap sepanjang masa',
          'Hampir tidak terbatas',
          'Bisa dihentikan kapan saja'
        ],
        correctIndex: 2,
        explanation: 'Kebutuhan manusia terus bertambah dan berkembang seiring waktu sehingga bersifat tidak terbatas.'
      },
      {
        id: 'qk1-6',
        category: 'Pengelolaan Sumber Daya',
        question: 'Jika alat pemuas kebutuhan tidak diimbangi dengan cara pengelolaan yang tepat, apa akibatnya bagi manusia?',
        options: [
          'Terjadinya ketidakcukupan dalam memenuhi kebutuhan',
          'Semua orang akan menjadi kaya raya',
          'Kegiatan ekonomi akan berhenti total',
          'Harga barang menjadi gratis'
        ],
        correctIndex: 0,
        explanation: 'Tanpa pengelolaan yang bijak, keterbatasan sumber daya akan menyebabkan ketidakcukupan pemenuhan kebutuhan.'
      },
      {
        id: 'qk1-7',
        category: 'Penyebab Aktivitas Ekonomi',
        question: 'Dalam konteks ekonomi, apa dasar utama penyebab munculnya berbagai aktivitas ekonomi?',
        options: [
          'Keinginan untuk menguasai pasar dunia',
          'Keterbatasan alat pemuas kebutuhan di tengah kebutuhan yang tak terbatas',
          'Adanya mesin-mesin otomatis di pabrik',
          'Peraturan ketat dari pemerintah pusat'
        ],
        correctIndex: 1,
        explanation: 'Aktivitas ekonomi muncul sebagai upaya mengatasi kelangkaan demi mencukupi kebutuhan manusia.'
      },
      {
        id: 'qk1-8',
        category: 'Tujuan Kegiatan Ekonomi',
        question: 'Apa tujuan akhir dari manusia saat melakukan berbagai kegiatan ekonomi dalam hidupnya?',
        options: [
          'Memenuhi kebutuhan untuk mencapai kelangsungan hidup dan kemakmuran',
          'Menimbun kekayaan sebanyak-banyaknya tanpa batas',
          'Menghabiskan seluruh sumber daya alam yang ada',
          'Mengurangi jumlah penduduk di suatu wilayah'
        ],
        correctIndex: 0,
        explanation: 'Tujuan akhir kegiatan ekonomi adalah mencapai kemakmuran dan menjaga kelangsungan hidup manusia.'
      },
      {
        id: 'qk1-9',
        category: 'Keterbatasan Alat Pemuas',
        question: 'Manakah contoh situasi yang menunjukkan adanya keterbatasan alat pemuas kebutuhan?',
        options: [
          'Air bersih melimpah tanpa batas di semua tempat',
          'Minyak bumi dan bahan bakar yang lama-kelamaan bisa habis jika terus dieksploitasi',
          'Udara di pegunungan yang dihirup secara gratis',
          'Sinar matahari yang menyinari bumi setiap pagi'
        ],
        correctIndex: 1,
        explanation: 'Bahan bakar fosil bersifat terbatas dan tidak dapat diperbarui sehingga menunjukkan fenomena kelangkaan.'
      },
      {
        id: 'qk1-10',
        category: 'Skala Prioritas',
        question: 'Mengapa pemahaman mengenai konsep kebutuhan dan keterbatasan sangat penting bagi manusia?',
        options: [
          'Agar manusia dapat mengatur skala prioritas dan mengelola sumber daya dengan bijak',
          'Agar manusia bisa hidup tanpa bekerja sama sekali',
          'Supaya manusia dapat membeli semua barang mewah di dunia',
          'Untuk menghindari segala bentuk interaksi sosial'
        ],
        correctIndex: 0,
        explanation: 'Pemahaman kelangkaan melatih manusia menyusun skala prioritas untuk mengalokasikan sumber daya secara bijak.'
      }
    ]
  },
  {
    id: 'kuis-faktor-alam',
    name: 'Kuis Misi Eksplorasi Faktor Alam (Pulau Sumber Daya)',
    description: 'Uji pemahaman mengenai pemanfaatan dan kedudukan faktor produksi alam.',
    badge: 'Penyelidik Alam',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk2-1',
        category: 'Faktor Alam',
        question: 'Apa yang dimaksud dengan faktor alam dalam proses produksi?',
        options: [
          'Semua mesin modern yang dibeli dari luar negeri',
          'Semua hasil alam berupa benda dan makhluk hidup yang digunakan dalam proses produksi',
          'Tenaga kerja terdidik yang bekerja di kantor',
          'Jumlah uang tunai yang disimpan di bank'
        ],
        correctIndex: 1,
        explanation: 'Faktor alam mencakup tanah, air, udara, barang tambang, serta tumbuhan dan hewan yang disediakan alam.'
      },
      {
        id: 'qk2-2',
        category: 'Contoh Faktor Alam',
        question: 'Manakah di bawah ini yang merupakan contoh nyata dari faktor produksi alam?',
        options: [
          'Komputer dan meja kantor',
          'Sayuran, buah-buahan, gas alam, batu bara, dan hutan',
          'Keterampilan manajer dalam memimpin perusahaan',
          'Mesin pabrik otomatis buatan jepang'
        ],
        correctIndex: 1,
        explanation: 'Sayuran, buah, gas, batu bara, dan kayu hutan merupakan kekayaan mentah ciptaan alam.'
      },
      {
        id: 'qk2-3',
        category: 'Peran Faktor Alam',
        question: 'Mengapa faktor alam memegang peranan yang sangat penting dalam kegiatan produksi?',
        options: [
          'Karena tanpa alam, bahan baku utama untuk menghasilkan barang tidak akan tersedia',
          'Karena alam dapat menghasilkan uang secara instan',
          'Karena faktor alam bisa menggantikan seluruh tenaga kerja manusia',
          'Karena faktor alam tidak memerlukan biaya perawatan'
        ],
        correctIndex: 0,
        explanation: 'Faktor alam menyediakan bahan baku mentah paling awal yang diolah dalam proses manufaktur.'
      },
      {
        id: 'qk2-4',
        category: 'Pemanfaatan Tambang',
        question: 'Kegiatan menambang minyak bumi untuk kebutuhan bahan bakar termasuk dalam pemanfaatan faktor...',
        options: [
          'Modal',
          'Keahlian',
          'Alam',
          'Konsumsi'
        ],
        correctIndex: 2,
        explanation: 'Minyak bumi adalah barang tambang yang tergolong dalam faktor produksi alam.'
      },
      {
        id: 'qk2-5',
        category: 'Faktor Alam Hayati',
        question: 'Menanam dan memanen padi serta sayur-sayuran memanfaatkan komponen dari...',
        options: [
          'Faktor tenaga kerja semata',
          'Faktor alam (makhluk hidup dan tumbuhan)',
          'Faktor modal uang tunai',
          'Faktor distribusi langsung'
        ],
        correctIndex: 1,
        explanation: 'Tanaman pangan merupakan pemanfaatan komponen tumbuhan/makhluk hidup dari alam.'
      },
      {
        id: 'qk2-6',
        category: 'Kedudukan Faktor Alam',
        question: 'Apa kedudukan faktor alam jika dibandingkan dengan faktor-faktor produksi lainnya?',
        options: [
          'Menjadi fondasi dasar penyedia bahan mentah atau sumber daya pendukung utama',
          'Hanya sebagai pelengkap yang tidak terlalu penting',
          'Sebagai pengganti fungsi mesin pabrik',
          'Sebagai alat ukur keuntungan perusahaan'
        ],
        correctIndex: 0,
        explanation: 'Faktor alam berposisi sebagai fondasi penyedia bahan baku mentah (Faktor Produksi Asli).'
      },
      {
        id: 'qk2-7',
        category: 'Bahan Baku Kayu',
        question: 'Pemanfaatan hutan sebagai sumber kayu untuk bahan baku mebel merupakan bentuk pemanfaatan dari...',
        options: [
          'Faktor modal tetap',
          'Faktor alam',
          'Faktor keahlian manajerial',
          'Faktor distribusi konsumen'
        ],
        correctIndex: 1,
        explanation: 'Kayu dari hutan adalah hasil alam yang dimanfaatkan sebagai bahan mentah mebel.'
      },
      {
        id: 'qk2-8',
        category: 'Pengolahan Bahan Alam',
        question: 'Manakah kegiatan berikut yang paling tepat memanfaatkan faktor alam dalam prosesnya?',
        options: [
          'Mengolah tanah liat menjadi batu bata atau gerabah',
          'Mengetik dokumen laporan keuangan di komputer',
          'Mengirimkan paket barang menggunakan truk logistik',
          'Menjual pulsa elektrik di konter seluler'
        ],
        correctIndex: 0,
        explanation: 'Tanah liat merupakan faktor alam yang diubah menjadi batu bata/gerabah.'
      },
      {
        id: 'qk2-9',
        category: 'Risiko Eksploitasi',
        question: 'Apa risiko utama jika faktor alam dieksploitasi secara berlebihan tanpa perhitungan yang matang?',
        options: [
          'Perusahaan akan mengalami kelangkaan bahan baku dan kerusakan lingkungan',
          'Jumlah tenaga kerja akan meningkat drastis',
          'Harga barang di pasar menjadi sangat murah',
          'Kegiatan konsumsi masyarakat akan berhenti'
        ],
        correctIndex: 0,
        explanation: 'Eksploitasi alam tak terkendali memicu kerusakan ekosistem dan kelangkaan bahan baku masa depan.'
      },
      {
        id: 'qk2-10',
        category: 'Hubungan Alam & Kemakmuran',
        question: 'Hubungan antara faktor alam dan pencapaian kemakmuran adalah...',
        options: [
          'Faktor alam diolah sedemikian rupa untuk menghasilkan barang/jasa demi mencapai kemakmuran manusia',
          'Faktor alam dibiarkan begitu saja tanpa disentuh manusia',
          'Kemakmuran hanya bergantung pada jumlah uang, bukan faktor alam',
          'Faktor alam tidak memengaruhi tingkat kesejahteraan'
        ],
        correctIndex: 0,
        explanation: 'Manusia mengolah faktor alam menjadi barang/jasa bernilai guna demi memenuhi kebutuhan hidup.'
      }
    ]
  },
  {
    id: 'kuis-distribusi-perusahaan',
    name: 'Kuis Misi Perdagangan & Distribusi (Pelabuhan Perdagangan)',
    description: 'Uji pemahaman mengenai alur distribusi langsung, semilangsung, dan tidak langsung.',
    badge: 'Ahli Logistik',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk3-1',
        category: 'Definisi Distribusi',
        question: 'Apa definisi dari kegiatan distribusi dalam ilmu ekonomi?',
        options: [
          'Kegiatan menghasilkan barang baru',
          'Kegiatan menyalurkan barang dari produsen kepada konsumen',
          'Kegiatan menghabiskan nilai guna suatu barang',
          'Kegiatan membeli bahan mentah dari alam'
        ],
        correctIndex: 1,
        explanation: 'Distribusi adalah aktivitas menyampaikan hasil produksi dari produsen ke tangan konsumen.'
      },
      {
        id: 'qk3-2',
        category: 'Pentingnya Distribusi',
        question: 'Apa yang akan terjadi jika hasil produksi tidak didistribusikan kepada konsumen?',
        options: [
          'Kegiatan produksi tidak akan ada gunanya',
          'Keuntungan produsen akan meningkat drastis',
          'Konsumen bisa membuat barang sendiri dengan mudah',
          'Barang akan bertahan selamanya di gudang pabrik'
        ],
        correctIndex: 0,
        explanation: 'Tanpa distribusi, barang hasil produksi tidak sampai ke konsumen sehingga kegiatan produksi menjadi tak berguna.'
      },
      {
        id: 'qk3-3',
        category: 'Tujuan Distribusi',
        question: 'Manakah yang bukan merupakan tujuan utama dari kegiatan distribusi?',
        options: [
          'Sebagai agen penyalur hasil produksi ke konsumen',
          'Agar hasil produksi dapat dimanfaatkan masyarakat secara maksimal',
          'Untuk menimbun barang agar harganya menjadi sangat mahal di pasar gelap',
          'Menjaga keberlangsungan produksi perusahaan'
        ],
        correctIndex: 2,
        explanation: 'Menimbun barang secara ilegal bukan merupakan tujuan distribusi melainkan pelanggaran hukum ekonomi.'
      },
      {
        id: 'qk3-4',
        category: 'Distribusi Langsung',
        question: 'Apa yang dimaksud dengan bentuk distribusi langsung?',
        options: [
          'Kegiatan distribusi yang melalui banyak perantara dagang',
          'Kegiatan distribusi antara produsen dan konsumen tanpa perantara',
          'Kegiatan distribusi lewat toko resmi milik produsen semata',
          'Kegiatan menyalurkan barang antarnegara'
        ],
        correctIndex: 1,
        explanation: 'Distribusi langsung terjadi saat produsen menjual barang secara langsung ke pembeli tanpa pihak ketiga.'
      },
      {
        id: 'qk3-5',
        category: 'Contoh Distribusi Langsung',
        question: 'Perusahaan roti menjual roti buatannya langsung kepada pembeli di toko miliknya tanpa perantara. Ini adalah contoh...',
        options: [
          'Distribusi langsung',
          'Distribusi semilangsung',
          'Distribusi tidak langsung',
          'Produksi jasa murni'
        ],
        correctIndex: 0,
        explanation: 'Penjualan langsung dari pabrik/toko pembuat roti ke konsumen dinamakan Distribusi Langsung.'
      },
      {
        id: 'qk3-6',
        category: 'Distribusi Semilangsung',
        question: 'Produsen ponsel pintar mendistribusikan produknya kepada konsumen melalui toko resmi miliknya sendiri. Bentuk distribusi ini dinamakan...',
        options: [
          'Distribusi langsung',
          'Distribusi semilangsung',
          'Distribusi tidak langsung',
          'Distribusi eksternal'
        ],
        correctIndex: 1,
        explanation: 'Distribusi lewat cabang/toko resmi terpisah milik produsen dinamakan Distribusi Semilangsung.'
      },
      {
        id: 'qk3-7',
        category: 'Distribusi Tidak Langsung',
        question: 'Apa ciri utama dari bentuk distribusi tidak langsung?',
        options: [
          'Produsen menyerahkan barang langsung ke tangan pembeli pertama',
          'Penyaluran barang dan jasa melibatkan perantara seperti agen, minimarket, pasar, dan pedagang kecil',
          'Tidak memerlukan sarana transportasi sama sekali',
          'Hanya dilakukan oleh perorangan tanpa badan usaha'
        ],
        correctIndex: 1,
        explanation: 'Distribusi tidak langsung melibatkan rantai perantara dagang (grosir, agen, retailer).'
      },
      {
        id: 'qk3-8',
        category: 'Pelaku Distribusi',
        question: 'Siapa saja yang dapat melakukan kegiatan distribusi di tengah masyarakat?',
        options: [
          'Hanya perusahaan multinasional besar',
          'Hanya pemerintah pusat',
          'Perorangan maupun lembaga distribusi',
          'Hanya konsumen akhir'
        ],
        correctIndex: 2,
        explanation: 'Distribusi dapat dilakukan perorangan (kurir, pedagang keliling) maupun lembaga (PT logistik, agen).'
      },
      {
        id: 'qk3-9',
        category: 'Pola Penjahit Pakaian',
        question: 'Penjahit yang menyerahkan pakaian pesanan langsung kepada pelanggannya tanpa perantara menerapkan pola...',
        options: [
          'Distribusi langsung',
          'Distribusi tidak langsung',
          'Distribusi agen tunggal',
          'Konsumsi massal'
        ],
        correctIndex: 0,
        explanation: 'Penjahit membuat dan memberikan baju langsung kepada pemesan tanpa perantara.'
      },
      {
        id: 'qk3-10',
        category: 'Peran Lembaga Distribusi',
        question: 'Mengapa lembaga atau perantara distribusi diperlukan dalam sistem ekonomi modern?',
        options: [
          'Untuk menjembatani jarak yang jauh antara produsen dan konsumen agar barang sampai tepat sasaran',
          'Untuk memperlambat perputaran arus barang di pasaran',
          'Untuk mengurangi jumlah barang yang beredar di masyarakat',
          'Supaya produsen tidak perlu memikirkan keuntungan'
        ],
        correctIndex: 0,
        explanation: 'Lembaga distribusi membantu menjembatani ruang, jarak, dan waktu antara produsen dan konsumen.'
      }
    ]
  },
  {
    id: 'kuis-pola-konsumen',
    name: 'Kuis Misi Pola Konsumen & Pasar (Misi Pasar)',
    description: 'Uji pemahaman mengenai tujuan konsumsi, faktor internal/eksternal, dan kebutuhan rohani/estetika.',
    badge: 'Analis Pasar',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk4-1',
        category: 'Definisi Konsumsi',
        question: 'Apa arti dari kegiatan konsumsi dalam kehidupan sehari-hari?',
        options: [
          'Kegiatan menambah manfaat atau menciptakan barang baru',
          'Kegiatan menyalurkan barang dari pabrik ke toko',
          'Kegiatan menghabiskan atau mengurangi manfaat suatu barang untuk memenuhi kebutuhan',
          'Kegiatan mencari bahan baku di dalam hutan'
        ],
        correctIndex: 2,
        explanation: 'Konsumsi adalah aktivitas memanfaatkan atau mengurangi nilai guna barang/jasa demi memenuhi kebutuhan.'
      },
      {
        id: 'qk4-2',
        category: 'Tujuan Utama Konsumsi',
        question: 'Apa tujuan utama manusia melakukan kegiatan konsumsi?',
        options: [
          'Memenuhi kebutuhan dan menjaga kelangsungan hidup',
          'Mencari keuntungan finansial yang besar sebagai produsen',
          'Menyalurkan barang ke daerah-daerah terpencil',
          'Mengolah tanah liat menjadi barang kerajinan'
        ],
        correctIndex: 0,
        explanation: 'Tujuan dasar konsumsi adalah pemenuhan kebutuhan fisik & mental demi bertahan hidup.'
      },
      {
        id: 'qk4-3',
        category: 'Tujuan Khusus Konsumsi',
        question: 'Manakah di bawah ini yang termasuk dalam tujuan khusus konsumsi?',
        options: [
          'Menjaga status sosial di masyarakat dengan produk kebutuhan tersier',
          'Memproduksi barang modal secara massal',
          'Menambah jumlah tenaga kerja di perusahaan',
          'Mencari bahan tambang di dalam bumi'
        ],
        correctIndex: 0,
        explanation: 'Tujuan khusus konsumsi dapat mencakup prestise, kenyamanan, atau kenaikan status sosial.'
      },
      {
        id: 'qk4-4',
        category: 'Konsumsi Kesehatan',
        question: 'Mengonsumsi vitamin dan makanan bergizi seimbang bertujuan untuk...',
        options: [
          'Menjaga kesehatan tubuh',
          'Menaikkan harga barang di pasar',
          'Memenuhi kebutuhan rohani semata',
          'Memperluas jalur distribusi perusahaan'
        ],
        correctIndex: 0,
        explanation: 'Makanan bergizi & vitamin dikonsumsi untuk menjaga stamina dan pemenuhan Kebutuhan Primer fisik.'
      },
      {
        id: 'qk4-5',
        category: 'Faktor Konsumsi',
        question: 'Apa saja kelompok faktor yang memengaruhi perbedaan tingkat konsumsi setiap orang?',
        options: [
          'Faktor internal dan faktor eksternal',
          'Faktor modal dan faktor keahlian',
          'Faktor alam dan faktor tenaga kerja',
          'Faktor produksi dan faktor distribusi'
        ],
        correctIndex: 0,
        explanation: 'Faktor konsumsi dibagi menjadi faktor internal (dalam diri) dan faktor eksternal (lingkungan).'
      },
      {
        id: 'qk4-6',
        category: 'Faktor Internal',
        question: 'Faktor apa saja yang termasuk ke dalam faktor internal yang memengaruhi konsumsi seseorang?',
        options: [
          'Pekerjaan, harga barang, dan kebudayaan',
          'Motivasi, sikap, dan selera',
          'Pendapatan nasional dan iklim',
          'Kebijakan pajak pemerintah'
        ],
        correctIndex: 1,
        explanation: 'Motivasi, selera, kepribadian, dan sikap mental berasal dari dalam diri individu.'
      },
      {
        id: 'qk4-7',
        category: 'Faktor Eksternal',
        question: 'Manakah unsur yang tergolong dalam faktor eksternal yang memengaruhi perbedaan konsumsi?',
        options: [
          'Motivasi dan selera pribadi',
          'Pekerjaan, harga barang atau jasa, dan kebudayaan',
          'Sikap mental seseorang terhadap suatu produk',
          'Keinginan batin individu'
        ],
        correctIndex: 1,
        explanation: 'Pekerjaan, tingkat harga di pasar, dan tradisi budaya merupakan pengaruh dari luar diri.'
      },
      {
        id: 'qk4-8',
        category: 'Perbedaan Pola Konsumsi',
        question: 'Mengapa pola konsumsi antara satu orang dengan orang lainnya bisa berbeda-beda?',
        options: [
          'Karena dipengaruhi oleh perbedaan faktor internal (seperti selera) dan eksternal (seperti pendapatan/pekerjaan)',
          'Karena diatur secara mutlak oleh undang-undang negara',
          'Karena semua manusia memiliki kebutuhan yang persis sama',
          'Karena ketersediaan barang di bumi selalu terbatas'
        ],
        correctIndex: 0,
        explanation: 'Variasi pendapatan, pekerjaan, selera, dan usia membuat tingkat konsumsi tiap individu unik.'
      },
      {
        id: 'qk4-9',
        category: 'Kebutuhan Rohani',
        question: 'Mengonsumsi buku bacaan rohani atau beribadah berkaitan dengan pemenuhan kebutuhan...',
        options: [
          'Jasmani semata',
          'Rohani',
          'Estetika murni',
          'Tersier dan mewah'
        ],
        correctIndex: 1,
        explanation: 'Buku keagamaan dan ibadah memenuhi Kebutuhan Rohani (jiwa/mental).'
      },
      {
        id: 'qk4-10',
        category: 'Kebutuhan Estetika',
        question: 'Membeli karya seni atau pakaian dengan desain estetis tertentu ditujukan untuk memenuhi kebutuhan akan...',
        options: [
          'Estetika',
          'Bahan bakar mesin',
          'Transportasi logistik',
          'Produksi massal'
        ],
        correctIndex: 0,
        explanation: 'Karya seni memenuhi nilai keindahan dan rasa seni (Estetika).'
      }
    ]
  },
  {
    id: 'kuis-konservasi',
    name: 'Kuis Misi Konservasi & Bahan Baku (Hutan Sumberdaya)',
    description: 'Uji pemahaman mengenai proses produksi, nilai guna, dan pentingnya konservasi.',
    badge: 'Pahlawan Konservasi',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk5-1',
        category: 'Konsep Produksi',
        question: 'Apa arti dari kegiatan produksi dalam kaitan penambahan nilai suatu objek?',
        options: [
          'Kegiatan untuk menambah manfaat suatu barang atau menciptakan barang baru demi memenuhi kebutuhan',
          'Kegiatan menghabiskan nilai guna suatu produk secara instan',
          'Kegiatan mengirimkan paket logistik antarwilayah',
          'Kegiatan memilih barang di pasar tradisional'
        ],
        correctIndex: 0,
        explanation: 'Produksi adalah proses menciptakan atau meningkatkan nilai guna (utility) suatu barang/jasa.'
      },
      {
        id: 'qk5-2',
        category: 'Contoh Produksi Sederhana',
        question: 'Manakah kegiatan berikut yang termasuk ke dalam proses produksi?',
        options: [
          'Seorang ibu memasak nasi dan menggoreng telur untuk sarapan keluarga',
          'Seseorang menikmati makanan di restoran mewah',
          'Kurir mengantar barang pesanan pembeli ke rumah',
          'Toko kelontong menjual sabun kepada warga'
        ],
        correctIndex: 0,
        explanation: 'Memasak mengubah bahan mentah (beras & telur mentah) menjadi hidangan matang bernilai guna.'
      },
      {
        id: 'qk5-3',
        category: 'Cakupan Produksi',
        question: 'Apakah kegiatan produksi hanya terbatas pada perusahaan besar yang menggunakan mesin otomatis?',
        options: [
          'Ya, hanya pabrik besar yang bisa disebut produksi',
          'Tidak, produksi memiliki makna yang lebih luas mencakup penambangan, pertanian, pertukangan, dll.',
          'Ya, karena perorangan tidak bisa menghasilkan barang',
          'Tidak sama sekali, produksi adalah kegiatan menghabiskan barang'
        ],
        correctIndex: 1,
        explanation: 'Produksi mencakup usaha mikro, pertanian, perkebunan, hingga industri manufaktur besar.'
      },
      {
        id: 'qk5-4',
        category: 'Produksi Penambahan Manfaat',
        question: 'Kegiatan menjahit kain menjadi baju atau mengolah tanah liat menjadi batu bata merupakan contoh...',
        options: [
          'Kegiatan konsumsi masyarakat',
          'Kegiatan distribusi barang',
          'Kegiatan produksi yang menambah manfaat atau menciptakan barang baru',
          'Kegiatan perdagangan internasional'
        ],
        correctIndex: 2,
        explanation: 'Menjahit atau mengolah tanah liat menambah nilai guna bentuk (Form Utility).'
      },
      {
        id: 'qk5-5',
        category: 'Tujuan Umum Produksi',
        question: 'Apa tujuan utama dari kegiatan produksi secara umum?',
        options: [
          'Memenuhi kebutuhan manusia dalam rangka mencapai kemakmuran',
          'Menghabiskan seluruh persediaan bahan baku alam',
          'Mempersulit peredaran barang di masyarakat',
          'Menambah beban pengeluaran konsumen'
        ],
        correctIndex: 0,
        explanation: 'Secara umum, produksi bertujuan memenuhi kebutuhan hidup manusia demi kesejahteraan.'
      },
      {
        id: 'qk5-6',
        category: 'Tujuan Khusus Produsen',
        question: 'Secara khusus, apa tujuan yang ingin dicapai oleh produsen atau perusahaan dalam melakukan kegiatan produksi?',
        options: [
          'Meningkatkan keuntungan bagi produsen atau perusahaan',
          'Memberikan seluruh barang secara cuma-cuma',
          'Mengurangi jumlah tenaga kerja secara drastis',
          'Menutup pabrik dalam waktu dekat'
        ],
        correctIndex: 0,
        explanation: 'Produsen secara khusus berproduksi untuk memperoleh laba/keuntungan usaha.'
      },
      {
        id: 'qk5-7',
        category: 'Konsep Kemakmuran',
        question: 'Apa yang dimaksud dengan kondisi kemakmuran dalam ilmu ekonomi?',
        options: [
          'Keadaan ketika jumlah alat pemuas kebutuhan cukup dan dapat digunakan untuk memenuhi kebutuhan manusia',
          'Situasi di mana semua orang tidak mau bekerja',
          'Kondisi kelangkaan ekstrem di seluruh wilayah',
          'Saat harga barang melambung sangat tinggi'
        ],
        correctIndex: 0,
        explanation: 'Kemakmuran dicapai saat sebagian besar kebutuhan hidup manusia dapat terpenuhi dengan baik.'
      },
      {
        id: 'qk5-8',
        category: 'Kesadaran Konservasi',
        question: 'Mengapa pemanfaatan bahan baku dari alam harus diimbangi dengan kesadaran pelestarian (konservasi)?',
        options: [
          'Agar ketersediaan bahan baku untuk proses produksi di masa depan tetap terjaga',
          'Supaya produsen tidak perlu membayar pajak',
          'Agar harga bahan mentah menjadi sangat mahal',
          'Untuk menghentikan seluruh kegiatan pabrik'
        ],
        correctIndex: 0,
        explanation: 'Konservasi lingkungan menjamin ketersediaan sumber daya berkelanjutan (sustainable production).'
      },
      {
        id: 'qk5-9',
        category: 'Jenis Produksi Barang',
        question: 'Manakah di bawah ini bentuk kegiatan yang mengubah sifat maupun bentuk suatu benda untuk menghasilkan barang?',
        options: [
          'Produksi barang (seperti roti, mebel, dan pakaian)',
          'Produksi jasa pengobatan medis',
          'Konsumsi makanan siap saji',
          'Distribusi semilangsung perusahaan'
        ],
        correctIndex: 0,
        explanation: 'Produksi barang menghasilkan wujud fisik baru dari bahan mentah.'
      },
      {
        id: 'qk5-10',
        category: 'Dampak Positif Produksi',
        question: 'Apa dampak positif dari kegiatan produksi yang dikelola dengan baik terhadap pasokan kebutuhan masyarakat?',
        options: [
          'Kebutuhan masyarakat akan barang dan jasa dapat terpenuhi dengan baik',
          'Masyarakat akan mengalami kekurangan barang secara terus-menerus',
          'Peredaran uang di pasar akan dihentikan',
          'Hubungan dagang antarwilayah menjadi putus'
        ],
        correctIndex: 0,
        explanation: 'Produksi yang efisien memastikan ketersediaan pasokan produk untuk masyarakat.'
      }
    ]
  },
  {
    id: 'kuis-modal-keuangan',
    name: 'Kuis Misi Pengelolaan Modal & Keuangan (Bank Investasi)',
    description: 'Uji pemahaman mengenai fungsi faktor modal, sarana pendukung produksi, dan efisiensi.',
    badge: 'Manajer Keuangan',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk6-1',
        category: 'Faktor Modal',
        question: 'Apa pemahaman yang tepat mengenai faktor modal dalam proses produksi?',
        options: [
          'Faktor modal hanya berupa uang tunai di dalam brankas',
          'Faktor modal meliputi semua barang yang digunakan untuk memperlancar dan memaksimalkan proses produksi',
          'Faktor modal sama persis dengan bahan mentah alam',
          'Faktor modal adalah tenaga kerja kasar di pabrik'
        ],
        correctIndex: 1,
        explanation: 'Modal mencakup uang tunai, gedung, mesin, dan peralatan penunjang proses produksi.'
      },
      {
        id: 'qk6-2',
        category: 'Bentuk Modal Non-Uang',
        question: 'Manakah di bawah ini yang termasuk ke dalam bentuk faktor modal selain uang tunai?',
        options: [
          'Peralatan, mesin, gedung, dan benda penunjang produksi lainnya',
          'Sayuran segar dan batu bara di dalam tanah',
          'Keahlian manajemen pimpinan perusahaan',
          'Semangat kerja operator mesin'
        ],
        correctIndex: 0,
        explanation: 'Mesin, alat pertukangan, dan bangunan gedung tergolong Modal Konkret (Nyata).'
      },
      {
        id: 'qk6-3',
        category: 'Fungsi Utama Modal',
        question: 'Apa fungsi utama dari faktor modal dalam operasional sebuah perusahaan?',
        options: [
          'Memperlancar dan memaksimalkan jalannya proses produksi barang dan jasa',
          'Menggantikan seluruh fungsi manusia di tempat kerja',
          'Menentukan harga jual produk di pasar internasional',
          'Mengurangi jumlah bahan baku yang terbuang'
        ],
        correctIndex: 0,
        explanation: 'Modal berfungsi mempercepat, memperlancar, dan memaksimalkan kapasitas produksi.'
      },
      {
        id: 'qk6-4',
        category: 'Wujud Modal',
        question: 'Apakah faktor modal dalam produksi terbatas pada bentuk uang tunai semata?',
        options: [
          'Ya, modal harus selalu berupa uang tunai',
          'Tidak, modal meliputi berbagai barang penunjang seperti mesin, alat, dan gedung',
          'Ya, karena peralatan dibeli tanpa menggunakan uang',
          'Tidak, modal adalah tenaga manusia itu sendiri'
        ],
        correctIndex: 1,
        explanation: 'Modal berupa fisik (mesin/gedung) dan non-fisik (hak paten/merek).'
      },
      {
        id: 'qk6-5',
        category: 'Aset Perusahaan Garmen',
        question: 'Jika sebuah perusahaan garmen memiliki gedung pabrik, mesin jahit elektrik, dan meja potong kain, maka aset tersebut dikategorikan sebagai...',
        options: [
          'Faktor alam',
          'Faktor modal',
          'Faktor keahlian',
          'Faktor konsumsi langsung'
        ],
        correctIndex: 1,
        explanation: 'Gedung dan mesin jahit adalah sarana penunjang pembuatan pakaian (Faktor Modal).'
      },
      {
        id: 'qk6-6',
        category: 'Pengelolaan Keuangan',
        question: 'Bagaimana peranan pengelolaan keuangan dan modal yang baik bagi kelangsungan perusahaan?',
        options: [
          'Memastikan ketersediaan sarana pendukung produksi berjalan lancar tanpa hambatan dana atau alat',
          'Menyebabkan perusahaan cepat mengalami kebangkrutan',
          'Menutup seluruh akses permodalan dari bank',
          'Menghentikan pembelian bahan baku alam'
        ],
        correctIndex: 0,
        explanation: 'Manajemen modal yang baik menjaga kelancaran pasokan alat & dana usaha.'
      },
      {
        id: 'qk6-7',
        category: 'Modal & Peralatan',
        question: 'Manakah pernyataan yang benar mengenai hubungan antara modal dan alat penunjang produksi?',
        options: [
          'Peralatan dan mesin pabrik merupakan bagian integral dari faktor modal',
          'Gedung perusahaan tidak ada hubungannya dengan modal usaha',
          'Modal hanya berfungsi saat awal pendirian perusahaan saja',
          'Uang tunai adalah satu-satunya bentuk modal yang diakui'
        ],
        correctIndex: 0,
        explanation: 'Peralatan dan mesin produksi merupakan komponen utama dalam modal kerja fisik.'
      },
      {
        id: 'qk6-8',
        category: 'Dampak Kekurangan Modal',
        question: 'Apa yang terjadi jika sebuah perusahaan kekurangan faktor modal berupa peralatan dan mesin pendukung?',
        options: [
          'Proses produksi akan terhambat dan tidak berjalan maksimal',
          'Kualitas barang yang dihasilkan akan meningkat otomatis',
          'Jumlah tenaga kerja akan bertambah banyak secara instan',
          'Keuntungan perusahaan melonjak drastis'
        ],
        correctIndex: 0,
        explanation: 'Kekurangan sarana mesin & peralatan membuat produksi melambat dan terhambat.'
      },
      {
        id: 'qk6-9',
        category: 'Gedung Pabrik Sebagai Modal',
        question: 'Dalam konteks faktor produksi, mengapa gedung pabrik dimasukkan sebagai komponen modal?',
        options: [
          'Karena gedung digunakan sebagai tempat berlindung sekaligus wadah kelancaran proses produksi',
          'Karena gedung merupakan hasil langsung dari pertambangan alam',
          'Karena gedung dapat berjalan sendiri tanpa perawatan',
          'Karena gedung berfungsi sebagai tenaga kerja utama'
        ],
        correctIndex: 0,
        explanation: 'Gedung pabrik menyediakan wadah fisik tempat berlangsungnya aktivitas produksi.'
      },
      {
        id: 'qk6-10',
        category: 'Tujuan Pengelolaan Aset',
        question: 'Pengelolaan aset modal yang mencakup peralatan dan mesin bertujuan untuk...',
        options: [
          'Memaksimalkan efisiensi dan hasil keluaran produksi perusahaan',
          'Mengurangi ketergantungan pada konsumen',
          'Menurunkan mutu barang demi menghemat biaya',
          'Menghentikan kegiatan distribusi produk'
        ],
        correctIndex: 0,
        explanation: 'Aset modal dikelola untuk mencapai hasil produksi (output) yang optimal & efisien.'
      }
    ]
  },
  {
    id: 'master-ekonomi',
    name: 'Kuis Misi Keahlian & Jenis Produksi (Pulau Kewirausahaan)',
    description: 'Uji pemahaman mengenai faktor keahlian wirausaha, jenis produksi barang/jasa, dan integrasi faktor produksi.',
    badge: 'Master Ekonomi',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk7-1',
        category: 'Faktor Keahlian',
        question: 'Apa fungsi utama dari faktor keahlian dalam proses produksi?',
        options: [
          'Berfungsi untuk mengontrol dan memastikan faktor-faktor produksi berjalan dengan baik dan menghasilkan produksi maksimal',
          'Menggantikan seluruh kebutuhan bahan baku alam',
          'Menyediakan pasokan uang tunai harian bagi perusahaan',
          'Mengantar barang dagangan ke tangan konsumen akhir'
        ],
        correctIndex: 0,
        explanation: 'Faktor keahlian (wirausaha) bertindak sebagai pengelola dan pengontrol integrasi faktor alam, modal, & tenaga kerja.'
      },
      {
        id: 'qk7-2',
        category: 'Tanpa Keahlian',
        question: 'Apa yang akan terjadi jika perusahaan memiliki faktor alam, tenaga kerja, dan modal yang melimpah, tetapi tidak memiliki faktor keahlian?',
        options: [
          'Semua faktor tersebut tidak akan terkelola secara maksimal',
          'Perusahaan tetap akan meraih kesuksesan besar secara otomatis',
          'Mesin-mesin pabrik akan bekerja sendiri dengan sempurna',
          'Kegiatan distribusi akan berjalan tanpa hambatan'
        ],
        correctIndex: 0,
        explanation: 'Tanpa skill kepemimpinan & manajemen, faktor produksi lain tidak dapat beroperasi secara optimal.'
      },
      {
        id: 'qk7-3',
        category: 'Produksi Barang',
        question: 'Apa yang dimaksud dengan produksi barang dalam kegiatan ekonomi?',
        options: [
          'Kegiatan mengubah sifat maupun bentuk suatu benda',
          'Kegiatan menambah nilai guna tanpa mengubah bentuk benda sama sekali',
          'Kegiatan menghabiskan manfaat suatu produk',
          'Kegiatan menyalurkan barang ke toko ritel'
        ],
        correctIndex: 0,
        explanation: 'Produksi barang merupakan proses pengolahan yang mengubah bentuk atau sifat fisik suatu benda.'
      },
      {
        id: 'qk7-4',
        category: 'Jenis Barang Produksi',
        question: 'Produksi barang dibedakan menjadi dua jenis utama, yaitu...',
        options: [
          'Barang modal dan barang konsumsi',
          'Barang mahal dan barang murah',
          'Barang impor dan barang ekspor',
          'Barang mentah dan barang digital'
        ],
        correctIndex: 0,
        explanation: 'Barang modal digunakan membuat produk lain (mesin), sedangkan barang konsumsi langsung dipakai masyarakat (roti).'
      },
      {
        id: 'qk7-5',
        category: 'Contoh Produksi Barang',
        question: 'Manakah di bawah ini yang merupakan contoh dari produksi barang?',
        options: [
          'Produksi roti, produksi mebel, dan produksi pakaian',
          'Jasa perawatan kecantikan dan jasa pengobatan',
          'Layanan konsultasi hukum dan pariwisata',
          'Jasa transportasi umum massal'
        ],
        correctIndex: 0,
        explanation: 'Roti, mebel, dan pakaian merupakan hasil fisik dari proses produksi barang.'
      },
      {
        id: 'qk7-6',
        category: 'Produksi Jasa',
        question: 'Apa yang dimaksud dengan produksi jasa?',
        options: [
          'Kegiatan menambah nilai guna suatu barang tanpa mengubah bentuknya',
          'Kegiatan mengubah bentuk tanah liat menjadi batu bata',
          'Kegiatan menambang batu bara di dalam perut bumi',
          'Kegiatan menjahit kain mentah menjadi baju jadi'
        ],
        correctIndex: 0,
        explanation: 'Produksi jasa memberikan layanan tak berwujud fisik yang memberi manfaat bagi konsumen.'
      },
      {
        id: 'qk7-7',
        category: 'Contoh Produksi Jasa',
        question: 'Manakah di bawah ini yang merupakan contoh konkret dari produksi jasa?',
        options: [
          'Jasa perawatan kecantikan, jasa pengobatan, dan jasa pariwisata',
          'Pabrik pembuatan sepatu kulit asli',
          'Industri pengolahan kayu lapis mebel',
          'Produksi makanan kaleng siap saji'
        ],
        correctIndex: 0,
        explanation: 'Salon kecantikan, dokter pengobatan, dan hotel/tour pariwisata tergolong Produksi Jasa.'
      },
      {
        id: 'qk7-8',
        category: 'Peran Tenaga Kerja',
        question: 'Apa peran dari faktor tenaga kerja dalam kegiatan produksi perusahaan?',
        options: [
          'Menjalankan kegiatan produksi baik secara langsung maupun tidak langsung menggunakan tenaganya',
          'Menyediakan seluruh modal uang tunai perusahaan',
          'Menentukan kebijakan tertinggi tanpa batas',
          'Membeli semua hasil produksi seorang diri'
        ],
        correctIndex: 0,
        explanation: 'Tenaga kerja mengoperasikan alat & pikiran demi mengolah bahan baku menjadi barang/jasa.'
      },
      {
        id: 'qk7-9',
        category: 'Contoh Tenaga Kerja',
        question: 'Manakah contoh yang mencerminkan faktor tenaga kerja di dalam sebuah pabrik?',
        options: [
          'Staf bagian produksi dan operator mesin produksi',
          'Gedung pabrik dan mesin cetak otomatis',
          'Lahan perkebunan kelapa sawit yang luas',
          'Konsep manajemen manajerial pemilik modal'
        ],
        correctIndex: 0,
        explanation: 'Operator mesin dan staf manufaktur adalah manusia yang bekerja sebagai Faktor Tenaga Kerja.'
      },
      {
        id: 'qk7-10',
        category: 'Integrasi Faktor Produksi',
        question: 'Mengapa kombinasi antara faktor alam, tenaga kerja, modal, dan keahlian sangat diperlukan dalam dunia usaha?',
        options: [
          'Karena keempatnya merupakan faktor produksi esensial yang saling mendukung untuk mencapai kemakmuran',
          'Karena aturan pemerintah mewajibkan keempatnya harus ada',
          'Agar perusahaan bisa beroperasi tanpa mengeluarkan biaya',
          'Supaya kegiatan konsumsi masyarakat dapat dihentikan'
        ],
        correctIndex: 0,
        explanation: 'Keempat faktor produksi saling melengkapi dan dibutuhkan untuk menghasilkan barang/jasa secara efektif.'
      }
    ]
  },
  {
    id: 'kuis-dasar-ekonomi',
    name: 'Kuis Misi Dasar Kegiatan Ekonomi (Tingkat Mudah)',
    description: 'Uji pemahaman dasar mengenai kebutuhan hidup, produksi, alur distribusi, konsumsi, dan faktor keahlian.',
    badge: 'Pelopor Ekonomi',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk8-1',
        category: 'Kebutuhan & Kelangkaan',
        question: 'Apa penyebab utama manusia harus melakukan kegiatan ekonomi setiap hari?',
        options: [
          'Karena kebutuhan manusia hampir tidak terbatas, sedangkan alat pemuas kebutuhan terbatas',
          'Karena diperintah langsung oleh pemerintah pusat',
          'Karena semua barang di dunia ini jumlahnya tak terhingga',
          'Karena manusia tidak memiliki keinginan sama sekali'
        ],
        correctIndex: 0,
        explanation: 'Inti masalah ekonomi adalah kebutuhan manusia yang hampir tidak terbatas, sedangkan alat pemuas kebutuhan terbatas, sehingga manusia perlu berkegiatan ekonomi setiap hari.'
      },
      {
        id: 'qk8-2',
        category: 'Kegiatan Ekonomi',
        question: 'Kegiatan manusia dalam rangka memenuhi kebutuhannya secara garis besar dibagi menjadi tiga jenis, yaitu...',
        options: [
          'Membeli, menabung, dan menjual',
          'Produksi, distribusi, dan konsumsi',
          'Pertanian, perikanan, dan perindustrian',
          'Ekspor, impor, dan perdagangan lokal'
        ],
        correctIndex: 1,
        explanation: 'Tiga jenis pokok kegiatan ekonomi manusia untuk memenuhi kebutuhan hidup adalah produksi, distribusi, dan konsumsi.'
      },
      {
        id: 'qk8-3',
        category: 'Definisi Produksi',
        question: 'Apa arti dari kegiatan produksi?',
        options: [
          'Kegiatan menghabiskan nilai guna suatu barang',
          'Kegiatan menyalurkan barang dari pabrik ke toko',
          'Kegiatan untuk menambah manfaat suatu barang atau menciptakan barang baru',
          'Kegiatan membeli makanan untuk sarapan pagi'
        ],
        correctIndex: 2,
        explanation: 'Kegiatan produksi adalah kegiatan menambah manfaat suatu barang atau menciptakan barang baru untuk memenuhi kebutuhan.'
      },
      {
        id: 'qk8-4',
        category: 'Faktor Produksi Alam',
        question: 'Manakah di bawah ini yang merupakan contoh dari faktor produksi alam?',
        options: [
          'Mesin pabrik dan gedung kantor',
          'Sayuran, buah-buahan, gas alam, dan batu bara',
          'Uang tunai di dalam rekening bank',
          'Keahlian seorang manajer perusahaan'
        ],
        correctIndex: 1,
        explanation: 'Faktor produksi alam berasal langsung dari ketersediaan alam seperti sayuran, buah-buahan, gas alam, dan batu bara.'
      },
      {
        id: 'qk8-5',
        category: 'Definisi Distribusi',
        question: 'Apa definisi dari kegiatan distribusi?',
        options: [
          'Kegiatan menyalurkan barang dari produsen kepada konsumen',
          'Kegiatan mengubah bentuk kain mentah menjadi baju',
          'Kegiatan memakai pakaian baru saat hari raya',
          'Kegiatan mencari bahan tambang di dalam tanah'
        ],
        correctIndex: 0,
        explanation: 'Distribusi didefinisikan sebagai kegiatan menyalurkan barang dan jasa dari produsen kepada konsumen.'
      },
      {
        id: 'qk8-6',
        category: 'Bentuk Distribusi',
        question: 'Perusahaan roti menjual langsung roti buatannya kepada pembeli tanpa melalui perantara. Cara ini dinamakan distribusi...',
        options: [
          'Tidak langsung',
          'Semilangsung',
          'Langsung',
          'Internasional'
        ],
        correctIndex: 2,
        explanation: 'Distribusi langsung adalah penyaluran barang hasil produksi secara langsung ke tangan konsumen tanpa perantara.'
      },
      {
        id: 'qk8-7',
        category: 'Definisi Konsumsi',
        question: 'Apa arti dari kegiatan konsumsi?',
        options: [
          'Kegiatan menghabiskan atau mengurangi manfaat suatu barang untuk memenuhi kebutuhan',
          'Kegiatan memproduksi mesin-mesin canggih di pabrik',
          'Kegiatan mengirim paket menggunakan truk pengangkut barang',
          'Kegiatan menanam padi di sawah oleh petani'
        ],
        correctIndex: 0,
        explanation: 'Konsumsi merupakan kegiatan menghabiskan atau mengurangi manfaat suatu barang/jasa untuk memenuhi kebutuhan hidup.'
      },
      {
        id: 'qk8-8',
        category: 'Faktor Internal Konsumsi',
        question: 'Faktor dari dalam diri seseorang yang memengaruhi perbedaan konsumsi (faktor internal) meliputi...',
        options: [
          'Pekerjaan, harga barang, dan kebudayaan',
          'Motivasi, sikap, dan selera',
          'Pendapatan bulanan dan tempat tinggal',
          'Kebijakan pemerintah dan cuaca'
        ],
        correctIndex: 1,
        explanation: 'Faktor internal berasal dari kejiwaan dan pribadi seseorang seperti motivasi, sikap, dan selera.'
      },
      {
        id: 'qk8-9',
        category: 'Produksi Jasa',
        question: 'Manakah di bawah ini yang termasuk contoh produksi jasa?',
        options: [
          'Produksi pakaian dan pembuatan sepatu',
          'Jasa perawatan kecantikan dan jasa pengobatan',
          'Pembuatan mebel meja dan kursi kayu',
          'Industri pengolahan makanan kaleng'
        ],
        correctIndex: 1,
        explanation: 'Jasa perawatan kecantikan dan jasa medis/pengobatan merupakan contoh kegiatan produksi jasa yang memberi layanan tanpa wujud barang fisik baru.'
      },
      {
        id: 'qk8-10',
        category: 'Faktor Keahlian',
        question: 'Apa fungsi dari faktor keahlian dalam proses produksi?',
        options: [
          'Menyediakan uang tunai harian untuk karyawan',
          'Mengontrol dan memastikan faktor-faktor produksi berjalan dengan baik',
          'Menggantikan seluruh kebutuhan bahan baku dari alam',
          'Menjual produk jadi langsung ke pasar tradisional'
        ],
        correctIndex: 1,
        explanation: 'Faktor keahlian bertugas mengontrol, memimpin, dan memastikan seluruh faktor produksi (alam, tenaga kerja, modal) berjalan optimal.'
      }
    ]
  },
  {
    id: 'kuis-pemahaman-dasar',
    name: 'Kuis Misi Pemahaman Pokok Ekonomi (Tingkat Mudah)',
    description: 'Uji pemahaman situasi kebutuhan hidup, distribusi semilangsung, tujuan konsumsi, dan peran faktor keahlian.',
    badge: 'Bintang Penjelajah',
    unlockedAtLevel: 1,
    rewardCoins: 15,
    rewardXp: 20,
    questions: [
      {
        id: 'qk9-1',
        category: 'Situasi Kebutuhan Hidup',
        question: 'Apa yang dihadapi oleh manusia setiap harinya terkait dengan situasi kebutuhan hidup mereka?',
        options: [
          'Kebutuhan manusia hampir tidak terbatas, sedangkan alat pemuas kebutuhan terbatas',
          'Kebutuhan manusia sangat sedikit dan semuanya sudah tercukupi',
          'Jumlah alat pemuas kebutuhan jauh lebih banyak daripada keinginan manusia',
          'Manusia tidak memiliki kebutuhan apa pun dalam hidupnya'
        ],
        correctIndex: 0,
        explanation: 'Manusia setiap hari berhadapan dengan kenyataan bahwa kebutuhan hidupnya hampir tidak terbatas, sementara alat pemuas kebutuhannya terbatas.'
      },
      {
        id: 'qk9-2',
        category: 'Kelompok Pokok Ekonomi',
        question: 'Dalam ilmu ekonomi, kegiatan manusia untuk memenuhi kebutuhannya dibagi menjadi tiga kelompok utama, yaitu...',
        options: [
          'Menabung, meminjam, dan berinvestasi',
          'Produksi, distribusi, dan konsumsi',
          'Perdagangan ekspor, impor, dan grosir',
          'Pertanian, peternakan, dan perikanan'
        ],
        correctIndex: 1,
        explanation: 'Tiga kelompok utama kegiatan ekonomi adalah produksi (menghasilkan), distribusi (menyalurkan), dan konsumsi (menggunakan/menghabiskan).'
      },
      {
        id: 'qk9-3',
        category: 'Definisi Produksi',
        question: 'Apa definisi dari kegiatan produksi berdasarkan modul pembelajaran?',
        options: [
          'Kegiatan menghabiskan atau mengurangi manfaat suatu barang',
          'Kegiatan mengirimkan barang dari pabrik ke toko-toko kecil',
          'Kegiatan untuk menambah manfaat suatu barang atau menciptakan barang baru demi memenuhi kebutuhan',
          'Kegiatan membeli makanan dan minuman di pasar malam'
        ],
        correctIndex: 2,
        explanation: 'Kegiatan produksi diartikan sebagai kegiatan untuk menambah manfaat suatu barang atau menciptakan barang baru demi memenuhi kebutuhan manusia.'
      },
      {
        id: 'qk9-4',
        category: 'Komponen Faktor Alam',
        question: 'Manakah di bawah ini yang merupakan contoh dari komponen faktor produksi alam?',
        options: [
          'Mesin cetak otomatis dan komputer kantor',
          'Sayuran, buah-buahan, gas alam, batu bara, dan hutan',
          'Uang tunai di dalam brankas perusahaan',
          'Keahlian manajerial seorang pimpinan'
        ],
        correctIndex: 1,
        explanation: 'Sayuran, buah-buahan, gas alam, batu bara, dan hutan adalah sumber daya yang disediakan langsung oleh alam sebagai faktor produksi.'
      },
      {
        id: 'qk9-5',
        category: 'Arti Kegiatan Distribusi',
        question: 'Apa arti dari kegiatan distribusi dalam proses ekonomi?',
        options: [
          'Kegiatan menyalurkan barang dari produsen kepada konsumen',
          'Kegiatan mengubah bentuk bahan mentah menjadi barang jadi',
          'Kegiatan memakai atau menghabiskan kegunaan suatu produk',
          'Kegiatan menanam bibit tanaman di lahan pertanian'
        ],
        correctIndex: 0,
        explanation: 'Distribusi adalah kegiatan mengantarkan dan menyalurkan barang atau jasa dari pihak produsen kepada pihak konsumen.'
      },
      {
        id: 'qk9-6',
        category: 'Distribusi Semilangsung',
        question: 'Perusahaan ponsel pintar menjual produknya kepada konsumen melalui toko resmi miliknya sendiri. Bentuk distribusi seperti ini disebut...',
        options: [
          'Distribusi langsung',
          'Distribusi semilangsung',
          'Distribusi tidak langsung',
          'Distribusi bebas tanpa aturan'
        ],
        correctIndex: 1,
        explanation: 'Penjualan produk melalui outlet atau toko resmi milik produsen sendiri merupakan contoh bentuk distribusi semilangsung.'
      },
      {
        id: 'qk9-7',
        category: 'Tujuan Kegiatan Konsumsi',
        question: 'Apa tujuan utama manusia melakukan kegiatan konsumsi dalam kehidupan sehari-hari?',
        options: [
          'Menghasilkan barang modal dalam jumlah besar',
          'Memenuhi kebutuhan dan menjaga kelangsungan hidup manusia',
          'Menyalurkan produk dari pabrik ke pasar tradisional',
          'Mencari keuntungan finansial yang sangat tinggi'
        ],
        correctIndex: 1,
        explanation: 'Tujuan pokok kegiatan konsumsi adalah memenuhi berbagai macam kebutuhan fisik maupun rohani demi menjaga kelangsungan hidup manusia.'
      },
      {
        id: 'qk9-8',
        category: 'Faktor Internal Konsumsi',
        question: 'Faktor apa saja yang termasuk ke dalam faktor internal (dari dalam diri seseorang) yang memengaruhi perbedaan konsumsi?',
        options: [
          'Pekerjaan, harga barang atau jasa, dan kebudayaan',
          'Motivasi, sikap, dan selera',
          'Pendapatan bulanan dan tempat tinggal',
          'Kebijakan pemerintah dan kondisi iklim'
        ],
        correctIndex: 1,
        explanation: 'Faktor internal yang berasal dari dalam diri seseorang meliputi motivasi hidup, sikap pribadi, dan selera individu.'
      },
      {
        id: 'qk9-9',
        category: 'Contoh Produksi Jasa',
        question: 'Manakah di bawah ini yang tergolong ke dalam contoh produksi jasa?',
        options: [
          'Produksi pakaian seragam dan pembuatan mebel kursi',
          'Jasa perawatan kecantikan dan jasa pengobatan medis',
          'Industri pengolahan makanan kaleng siap saji',
          'Pembuatan sepatu kulit asli di pabrik'
        ],
        correctIndex: 1,
        explanation: 'Layanan perawatan kecantikan dan jasa pengobatan medis adalah contoh nyata produksi jasa yang memberikan manfaat layanan profesional.'
      },
      {
        id: 'qk9-10',
        category: 'Urgensi Faktor Keahlian',
        question: 'Mengapa faktor keahlian sangat dibutuhkan dalam suatu proses produksi perusahaan?',
        options: [
          'Untuk mengontrol dan memastikan faktor-faktor produksi berjalan dengan baik dan menghasilkan produksi yang maksimal',
          'Untuk menggantikan seluruh kebutuhan tenaga kerja manusia di pabrik',
          'Untuk menyediakan pasokan uang tunai harian secara cuma-cuma',
          'Untuk menjual barang langsung ke tangan pembeli akhir'
        ],
        correctIndex: 0,
        explanation: 'Faktor keahlian sangat penting untuk mengatur, mengontrol, dan memastikan perpaduan faktor produksi lain bekerja optimal menghasilkan output maksimal.'
      }
    ]
  },
  {
    id: 'kuis-analisis-ekonomi-sedang',
    name: 'Kuis Misi Analisis Penerapan Ekonomi (Tingkat Sedang)',
    description: 'Uji kemampuan analitis studi kasus skala prioritas, rantai distribusi, faktor modal, dan manajemen wirausaha.',
    badge: 'Pakar Analisis',
    unlockedAtLevel: 1,
    rewardCoins: 20,
    rewardXp: 25,
    questions: [
      {
        id: 'qk10-1',
        category: 'Skala Prioritas',
        question: 'Manusia selalu dihadapkan pada situasi di mana kebutuhan hampir tidak terbatas sementara alat pemuas kebutuhan sangat terbatas. Tindakan yang paling tepat untuk mengatasi kondisi tersebut adalah...',
        options: [
          'Membeli semua barang yang diinginkan secara bersamaan',
          'Menyusun skala prioritas berdasarkan tingkat kepentingan kebutuhan',
          'Menunggu sampai seluruh barang di pasaran menjadi gratis',
          'Menghentikan semua bentuk kegiatan konsumsi harian'
        ],
        correctIndex: 1,
        explanation: 'Menyusun skala prioritas adalah langkah paling rasional dalam mengalokasikan alat pemuas yang terbatas untuk memenuhi kebutuhan yang paling mendesak terlebih dahulu.'
      },
      {
        id: 'qk10-2',
        category: 'Identifikasi Kegiatan Produksi',
        question: 'Perhatikan kegiatan berikut: (1) Menambang minyak bumi untuk bahan bakar, (2) Mengonsumsi makanan siap saji, (3) Menjahit kain menjadi pakaian jadi, (4) Menyalurkan barang ke toko grosir. Manakah yang termasuk ke dalam kegiatan produksi?',
        options: [
          '(1), (2), dan (3)',
          '(1), dan (3) saja',
          '(2) dan (4) saja',
          'Semuanya merupakan kegiatan produksi'
        ],
        correctIndex: 1,
        explanation: 'Kegiatan (1) menambang minyak dan (3) menjahit kain adalah kegiatan produksi karena menghasilkan atau menambah nilai guna barang. Nomor (2) adalah konsumsi dan (4) adalah distribusi.'
      },
      {
        id: 'qk10-3',
        category: 'Klasifikasi Faktor Modal',
        question: 'Sebuah pabrik mebel menggunakan kayu jati, mesin potong modern, tenaga kerja terampil, serta bangunan pabrik yang luas agar proses pembuatan lemari berjalan lancar. Dalam hal ini, bangunan dan mesin potong yang digunakan dikategorikan sebagai...',
        options: [
          'Faktor produksi alam',
          'Faktor produksi modal',
          'Faktor keahlian manajemen',
          'Faktor tenaga kerja langsung'
        ],
        correctIndex: 1,
        explanation: 'Bangunan pabrik dan mesin pemotong merupakan barang modal fisik (konkret) yang digunakan untuk menunjang kelancaran proses produksi.'
      },
      {
        id: 'qk10-4',
        category: 'Saluran Distribusi',
        question: 'Perhatikan rantai distribusi berikut: Produsen ponsel pintar mengirimkan produknya ke konsumen melalui toko resmi miliknya sendiri. Bentuk saluran distribusi apakah yang sedang diterapkan oleh perusahaan tersebut?',
        options: [
          'Distribusi langsung',
          'Distribusi semilangsung',
          'Distribusi tidak langsung melalui pasar bebas',
          'Distribusi ekspor antarnegara'
        ],
        correctIndex: 1,
        explanation: 'Penyaluran barang dari produsen melalui perantara toko atau cabang resmi yang masih milik produsen sendiri disebut distribusi semilangsung.'
      },
      {
        id: 'qk10-5',
        category: 'Studi Kasus Faktor Keahlian',
        question: 'Pak Budi seorang pengusaha mebel memiliki modal besar, bahan baku kayu berkualitas, dan pekerja yang rajin. Namun, usahanya tetap merugi karena salah dalam mengambil keputusan strategi pemasaran akibat kurangnya kemampuan manajerial. Berdasarkan unsur produksi, faktor apa yang menjadi kelemahan utama perusahaan Pak Budi?',
        options: [
          'Faktor alam',
          'Faktor tenaga kerja',
          'Faktor keahlian',
          'Faktor konsumsi'
        ],
        correctIndex: 2,
        explanation: 'Kelemahan manajerial dan strategi pemasaran merupakan bagian dari faktor keahlian (kewirausahaan) yang bertugas mengelola dan mengarahkan faktor produksi lain.'
      },
      {
        id: 'qk10-6',
        category: 'Signifikansi Distribusi',
        question: 'Mengapa kegiatan distribusi memegang peranan yang sangat penting dan menentukan kelangsungan hidup sebuah perusahaan?',
        options: [
          'Karena hasil produksi tidak akan berguna jika tidak sampai kepada konsumen',
          'Karena distribusi berfungsi untuk menggantikan fungsi mesin pabrik yang rusak',
          'Karena kegiatan distribusi dapat menghapuskan seluruh pajak perusahaan',
          'Karena distribusi menentukan jenis bahan mentah yang diambil dari alam'
        ],
        correctIndex: 0,
        explanation: 'Barang yang telah diproduksi tidak akan memiliki nilai manfaat riil bagi masyarakat dan produsen tidak akan memperoleh pendapatan jika barang tersebut tidak tersalurkan kepada konsumen.'
      },
      {
        id: 'qk10-7',
        category: 'Faktor Eksternal Konsumsi',
        question: 'Perbedaan pola konsumsi antara masyarakat di perkotaan dan pedesaan seringkali dipengaruhi oleh faktor luar diri manusia, seperti kebiasaan lingkungan dan jenis pekerjaan. Dalam modul ekonomi, faktor luar tersebut dinamakan...',
        options: [
          'Faktor internal',
          'Faktor eksternal',
          'Faktor intrinsik',
          'Faktor psikologis murni'
        ],
        correctIndex: 1,
        explanation: 'Faktor eksternal adalah faktor-faktor yang berasal dari luar diri individu konsumen, seperti lingkungan tempat tinggal, kebudayaan, status sosial, dan kondisi geografis.'
      },
      {
        id: 'qk10-8',
        category: 'Perbedaan Produksi Barang & Jasa',
        question: 'Manakah di bawah ini yang paling tepat membedakan antara produksi barang dan produksi jasa?',
        options: [
          'Produksi barang mengubah bentuk benda, sedangkan produksi jasa menambah nilai guna tanpa mengubah bentuk',
          'Produksi barang menghasilkan uang, sedangkan produksi jasa menghasilkan mesin',
          'Produksi barang dilakukan oleh perorangan, sedangkan produksi jasa hanya oleh perusahaan besar',
          'Produksi barang tidak memerlukan bahan baku, sedangkan produksi jasa wajib menggunakan kayu'
        ],
        correctIndex: 0,
        explanation: 'Produksi barang menghasilkan wujud fisik baru dengan mengubah bentuk/sifat benda, sedangkan produksi jasa memberikan manfaat atau nilai guna melalui layanan tanpa mengubah wujud fisik benda.'
      },
      {
        id: 'qk10-9',
        category: 'Tujuan Khusus Konsumsi',
        question: 'Seorang ibu rumah tangga membeli vitamin dan suplemen kesehatan untuk dikonsumsi seluruh keluarganya agar daya tahan tubuh mereka terjaga dengan baik. Tujuan khusus dari kegiatan konsumsi tersebut adalah...',
        options: [
          'Menjaga status sosial di masyarakat',
          'Menjaga kesehatan tubuh dengan gizi seimbang',
          'Memenuhi kebutuhan estetika dan keindahan',
          'Mencari keuntungan finansial dari penjualan obat'
        ],
        correctIndex: 1,
        explanation: 'Membeli dan mengonsumsi vitamin bertujuan untuk pemeliharaan daya tahan fisik dan kesehatan tubuh keluarga dengan asupan gizi seimbang.'
      },
      {
        id: 'qk10-10',
        category: 'Hubungan Produksi & Kemakmuran',
        question: 'Apa hubungan sebab-akibat antara kegiatan produksi khusus (seperti pengolahan bahan alam) dengan tercapainya tujuan kemakmuran masyarakat?',
        options: [
          'Produksi menciptakan kelangkaan ekstrem agar harga barang melambung',
          'Produksi menambah manfaat atau menciptakan barang baru yang cukup untuk memenuhi kebutuhan manusia',
          'Produksi menghentikan seluruh peredaran uang di masyarakat',
          'Produksi membuat manusia tidak lagi memerlukan kegiatan distribusi'
        ],
        correctIndex: 1,
        explanation: 'Kegiatan produksi menghasilkan dan menambah manfaat barang kebutuhan sehingga ketersediaan barang di masyarakat tercukupi demi terwujudnya kemakmuran bersama.'
      }
    ]
  },
  {
    id: 'kuis-strategi-ekonomi-sedang',
    name: 'Kuis Misi Strategi & Dinamika Ekonomi (Tingkat Sedang)',
    description: 'Uji pemahaman analitis mengenai sikap rasional kelangkaan, kebutuhan estetika, dan alur distribusi semilangsung.',
    badge: 'Strategis Muda',
    unlockedAtLevel: 1,
    rewardCoins: 20,
    rewardXp: 25,
    questions: [
      {
        id: 'qk11-1',
        category: 'Sikap Rasional Kelangkaan',
        question: 'Manusia dihadapkan pada situasi di mana kebutuhan hampir tidak terbatas, sementara alat pemuas kebutuhan sangat terbatas. Sikap rasional yang harus diambil seseorang dalam mengelola keterbatasan tersebut adalah...',
        options: [
          'Membeli seluruh barang mewah yang ada di pasaran',
          'Menyusun skala prioritas kebutuhan agar yang paling mendesak didahulukan',
          'Menunggu bantuan pemerintah tanpa melakukan usaha apa pun',
          'Menghabiskan seluruh tabungan untuk memenuhi keinginan sesaat'
        ],
        correctIndex: 1,
        explanation: 'Sikap rasional dalam menghadapi kelangkaan adalah menyusun skala prioritas kebutuhan agar kebutuhan yang paling pokok dan mendesak dipenuhi terlebih dahulu.'
      },
      {
        id: 'qk11-2',
        category: 'Klasifikasi Kegiatan Produksi',
        question: 'Perhatikan kegiatan ekonomi berikut: (1) Menanam padi di sawah, (2) Memakai pakaian seragam baru, (3) Menjahit kain menjadi celana, (4) Mengantar barang ke toko grosir. Kegiatan yang tergolong ke dalam bidang produksi adalah...',
        options: [
          '(1) dan (3)',
          '(2) dan (4)',
          '(1), (2), dan (3)',
          'Semuanya merupakan produksi'
        ],
        correctIndex: 0,
        explanation: 'Menanam padi (1) dan menjahit kain (3) adalah kegiatan produksi (menghasilkan atau menambah nilai guna barang). Nomor (2) adalah konsumsi, dan (4) adalah distribusi.'
      },
      {
        id: 'qk11-3',
        category: 'Unsur Faktor Modal',
        question: 'Sebuah perusahaan gergaji kayu menggunakan mesin potong elektrik, bangunan gudang, serta peralatan penunjang lainnya agar proses pengolahan balok kayu berjalan lancar. Dalam konteks faktor produksi, bangunan dan mesin elektrik tersebut dikategorikan sebagai...',
        options: [
          'Faktor alam',
          'Faktor modal',
          'Faktor keahlian manajemen',
          'Faktor tenaga kerja kasar'
        ],
        correctIndex: 1,
        explanation: 'Mesin potong dan bangunan gudang merupakan sarana fisik penunjang proses produksi yang diklasifikasikan sebagai faktor modal.'
      },
      {
        id: 'qk11-4',
        category: 'Alur Distribusi Semilangsung',
        question: 'Produsen barang elektronik menyalurkan produknya kepada konsumen melalui toko resmi atau cabang miliknya sendiri tanpa melibatkan pedagang luar. Bentuk saluran distribusi apakah yang digunakan dalam ilustrasi tersebut?',
        options: [
          'Distribusi langsung',
          'Distribusi semilangsung',
          'Distribusi tidak langsung',
          'Distribusi massal internasional'
        ],
        correctIndex: 1,
        explanation: 'Penyaluran produk melalui toko atau cabang resmi milik produsen sendiri merupakan contoh bentuk saluran distribusi semilangsung.'
      },
      {
        id: 'qk11-5',
        category: 'Analisis Faktor Keahlian',
        question: 'Pak Andi memiliki modal yang cukup, bahan baku melimpah, dan pekerja yang rajin. Namun, usahanya mengalami kerugian karena salah mengambil keputusan manajerial dalam mengatur strategi penjualan. Unsur produksi manakah yang menjadi kelemahan utama pada kasus Pak Andi?',
        options: [
          'Faktor alam',
          'Faktor tenaga kerja',
          'Faktor keahlian',
          'Faktor konsumsi akhir'
        ],
        correctIndex: 2,
        explanation: 'Kelemahan dalam pengambilan keputusan manajerial dan strategi penjualan merupakan bagian dari faktor keahlian (kewirausahaan).'
      },
      {
        id: 'qk11-6',
        category: 'Urgensi Distribusi Logistik',
        question: 'Mengapa kegiatan distribusi memegang peranan vital dan mutlak diperlukan dalam roda perekonomian?',
        options: [
          'Karena hasil produksi tidak akan berguna jika tidak sampai ke tangan konsumen',
          'Karena distribusi berfungsi menggantikan seluruh tenaga kerja di pabrik',
          'Karena kegiatan distribusi menghapuskan biaya pajak perusahaan',
          'Karena distribusi menentukan jenis bahan mentah di dalam bumi'
        ],
        correctIndex: 0,
        explanation: 'Distribusi mutlak diperlukan karena barang hasil produksi tidak dapat dimanfaatkan dan tidak menghasilkan nilai ekonomis jika tidak tersalurkan kepada konsumen.'
      },
      {
        id: 'qk11-7',
        category: 'Dinamika Faktor Eksternal',
        question: 'Perbedaan pola dan jenis konsumsi antara masyarakat modern di perkotaan dengan masyarakat di pedesaan sering dipengaruhi oleh lingkungan luar seperti pekerjaan dan kebudayaan. Faktor luar tersebut dinamakan...',
        options: [
          'Faktor internal',
          'Faktor eksternal',
          'Faktor intrinsik psikologis',
          'Faktor motivasi batin'
        ],
        correctIndex: 1,
        explanation: 'Faktor yang berasal dari luar individu, seperti kondisi geografis, lingkungan kerja, kebudayaan, dan adat istiadat, dinamakan faktor eksternal.'
      },
      {
        id: 'qk11-8',
        category: 'Karakteristik Produksi Barang & Jasa',
        question: 'Manakah pernyataan di bawah ini yang paling tepat membedakan antara produksi barang dan produksi jasa?',
        options: [
          'Produksi barang mengubah bentuk benda, sedangkan produksi jasa menambah nilai guna tanpa mengubah bentuk',
          'Produksi barang menghasilkan uang tunai, sedangkan produksi jasa menghasilkan mesin pabrik',
          'Produksi barang dilakukan perorangan, sedangkan produksi jasa hanya oleh perusahaan multinasional',
          'Produksi barang tidak memerlukan bahan baku alam, sedangkan produksi jasa wajib menggunakan kayu'
        ],
        correctIndex: 0,
        explanation: 'Produksi barang menghasilkan bentuk fisik baru yang berwujud, sedangkan produksi jasa memberikan layanan nilai guna tanpa mengubah bentuk fisik suatu benda.'
      },
      {
        id: 'qk11-9',
        category: 'Kebutuhan Estetika',
        question: 'Seseorang membeli produk pakaian dengan desain estetis tertentu dan mengunjungi pameran seni rupa. Berdasarkan tujuan konsumsi, kegiatan tersebut ditujukan untuk...',
        options: [
          'Menjaga kesehatan tubuh dengan gizi seimbang',
          'Memenuhi kebutuhan akan estetika',
          'Memproduksi barang modal secara massal',
          'Memperluas jalur distribusi logistik'
        ],
        correctIndex: 1,
        explanation: 'Membeli pakaian berdesain estetis dan menghadiri pameran karya seni bertujuan untuk memuaskan rasa keindahan atau kebutuhan estetika rohani.'
      },
      {
        id: 'qk11-10',
        category: 'Hasil Produksi & Kemakmuran',
        question: 'Bagaimana hubungan sebab-akibat antara kegiatan produksi yang baik dengan pencapaian kemakmuran masyarakat?',
        options: [
          'Produksi menciptakan kelangkaan ekstrem agar harga barang naik',
          'Produksi menambah manfaat atau menciptakan barang baru yang cukup untuk memenuhi kebutuhan manusia',
          'Produksi menghentikan seluruh peredaran uang di masyarakat',
          'Produksi membuat manusia tidak lagi memerlukan interaksi sosial'
        ],
        correctIndex: 1,
        explanation: 'Kegiatan produksi yang efektif menghasilkan kecukupan barang dan jasa bermutu yang dibutuhkan masyarakat untuk mencapai kemakmuran hidup.'
      }
    ]
  },
  {
    id: 'kuis-analisis-kritis-sulit',
    name: 'Kuis Misi Analisis Ekonomi Kritis (Tingkat Sulit)',
    description: 'Uji penalaran tingkat tinggi mengenai skala prioritas produsen, disfungsi faktor produksi, saluran distribusi, dan krisis siklus kegiatan ekonomi.',
    badge: 'Pakar Ekonomi Ulung',
    unlockedAtLevel: 1,
    rewardCoins: 25,
    rewardXp: 35,
    questions: [
      {
        id: 'qk12-1',
        category: 'Skala Prioritas & Kelangkaan',
        question: 'Manusia dihadapkan pada situasi di mana kebutuhan hampir tidak terbatas, sementara alat pemuas kebutuhan sangat terbatas. Jika seorang produsen salah menganalisis skala prioritas dan tetap memproduksi barang tersier di tengah kelangkaan bahan baku primer, apa dampak paling rasional terhadap perusahaan tersebut?',
        options: [
          'Perusahaan akan langsung mendominasi pasar internasional tanpa pesaing',
          'Efisiensi modal meningkat drastis karena tingginya harga jual barang tersier',
          'Terjadi pemborosan sumber daya dan kegagalan pasar karena tidak sesuai dengan urgensi kebutuhan konsumen',
          'Kegiatan distribusi dan konsumsi akan berhenti secara total seketika'
        ],
        correctIndex: 2,
        explanation: 'Di tengah kelangkaan bahan baku primer, memproduksi barang tersier tanpa skala prioritas yang tepat akan memicu pemborosan sumber daya dan kegagalan pasar karena tidak menjawab urgensi kebutuhan utama konsumen.'
      },
      {
        id: 'qk12-2',
        category: 'Faktor Alam & Produksi Barang',
        question: 'Perhatikan serangkaian aktivitas berikut: (1) Perusahaan migas mengekstrak minyak mentah dari perut bumi, (2) Pabrik tekstil memproses kapas menjadi kain mori, (3) Lembaga logistik mengirimkan kontainer ke pulau seberang, (4) Konsumen memakai pakaian saat bekerja. Manakah kombinasi yang secara tepat menunjukkan integrasi antara faktor alam dan proses produksi barang?',
        options: [
          '(1) dan (2)',
          '(2) dan (3)',
          '(3) dan (4)',
          '(1) dan (4)'
        ],
        correctIndex: 0,
        explanation: 'Nomor (1) merupakan pemanfaatan langsung faktor alam (ekstraksi minyak mentah), sedangkan nomor (2) merupakan proses produksi barang (mengolah kapas menjadi kain). Nomor (3) adalah distribusi dan nomor (4) adalah konsumsi.'
      },
      {
        id: 'qk12-3',
        category: 'Disfungsi Elemen Produksi',
        question: 'Sebuah perusahaan multinasional memiliki modal finansial yang kuat, fasilitas pabrik berteknologi tinggi, serta bahan baku alam yang melimpah. Namun, produk yang dihasilkan selalu gagal memenuhi standar pasar karena kesalahan operasional mesin oleh operator dan buruknya pengawasan mutu. Berdasarkan elemen produksi, komponen manakah yang mengalami disfungsi paling krusial?',
        options: [
          'Faktor alam dan modal semata',
          'Sinergi antara faktor tenaga kerja dan faktor keahlian manajerial/pengontrolan',
          'Jalur distribusi langsung dari produsen ke konsumen akhir',
          'Faktor eksternal konsumsi masyarakat perkotaan'
        ],
        correctIndex: 1,
        explanation: 'Kesalahan operasional oleh operator berkaitan erat dengan faktor tenaga kerja, sedangkan lemahnya pengawasan mutu berkaitan dengan faktor keahlian manajerial (controlling). Disfungsi terjadi pada sinergi kedua faktor tersebut.'
      },
      {
        id: 'qk12-4',
        category: 'Saluran Distribusi & Margin',
        question: 'Perusahaan kendaraan listrik mendirikan jaringan showroom resmi di berbagai kota besar dan melarang keras agen luar menjual produknya kecuali melalui toko ritel milik perusahaan tersebut. Analisis bentuk saluran distribusi apakah yang diterapkan dan apa implikasinya terhadap margin keuntungan?',
        options: [
          'Distribusi tidak langsung; margin keuntungan sangat kecil karena dipotong banyak perantara',
          'Distribusi semilangsung; perusahaan dapat mengontrol harga dan menjaga margin keuntungan tetap optimal',
          'Distribusi langsung tanpa perantara sama sekali; biaya logistik ditanggung penuh oleh pembeli',
          'Distribusi bebas; tidak memiliki pengaruh apa pun terhadap stabilitas harga pasar'
        ],
        correctIndex: 1,
        explanation: 'Menjual melalui jaringan toko/showroom resmi milik produsen sendiri merupakan pola distribusi semilangsung. Cara ini memberi kendali penuh atas harga pasar serta memaksimalkan margin keuntungan tanpa potongan perantara independen.'
      },
      {
        id: 'qk12-5',
        category: 'Konservasi & Keberlangsungan Usaha',
        question: 'Pak Harto adalah seorang pengusaha sukses yang menguasai seluruh faktor produksi mulai dari alam, modal, tenaga kerja, hingga keahlian manajerial. Namun, ia mengabaikan prinsip konservasi bahan baku dalam mengeksploitasi hutan untuk industri mebelnya. Apa implikasi jangka panjang yang paling fatal bagi keberlangsungan perusahaannya berdasarkan konsep ekonomi?',
        options: [
          'Perusahaan akan mengalami kelangkaan bahan baku yang berujung pada terhentinya proses produksi',
          'Perusahaan akan mendapat subsidi penuh dari pemerintah secara permanen',
          'Kualitas barang yang dihasilkan akan meningkat secara otomatis tanpa kayu',
          'Jumlah tenaga kerja akan bertambah secara eksponensial'
        ],
        correctIndex: 0,
        explanation: 'Eksploitasi tanpa konservasi menyebabkan kelangkaan dan kepunahan bahan baku alam di masa depan. Akibatnya, perusahaan tidak lagi memiliki bahan untuk diolah sehingga proses produksi terhenti total.'
      },
      {
        id: 'qk12-6',
        category: 'Pergeseran Pola Konsumsi',
        question: 'Perbedaan pola konsumsi antara masyarakat tradisional pedesaan dan masyarakat modern perkotaan tidak hanya dipengaruhi oleh faktor internal (selera dan motivasi), tetapi juga faktor eksternal seperti kebudayaan dan tingkat pendapatan. Jika terjadi modernisasi budaya secara masif di pedesaan, bagaimana pergeseran pola konsumsi masyarakat tersebut?',
        options: [
          'Konsumsi akan kembali ke titik nol karena hilangnya seluruh alat pemuas kebutuhan',
          'Terjadi pergeseran dari kebutuhan primer/sekunder menuju pola konsumsi yang dipengaruhi tren tersier dan gaya hidup modern',
          'Masyarakat berhenti mengonsumsi produk lokal secara permanen',
          'Faktor internal manusia akan hilang sepenuhnya tanpa bekas'
        ],
        correctIndex: 1,
        explanation: 'Modernisasi budaya (faktor eksternal) mengubah gaya hidup masyarakat pedesaan sehingga konsumsi berkembang melampaui pemenuhan primer/sekunder menuju barang tersier dan preferensi modern.'
      },
      {
        id: 'qk12-7',
        category: 'Urgensi Kegiatan Distribusi',
        question: 'Perhatikan pernyataan berikut: "Kegiatan distribusi merupakan jembatan mutlak yang menentukan hidup-matinya sebuah perusahaan manufaktur." Alasan ekonomi yang paling mendasar untuk memperkuat pernyataan tersebut adalah...',
        options: [
          'Karena distribusi berfungsi untuk menggantikan fungsi mesin pabrik yang aus',
          'Karena hasil produksi sehebat apa pun tidak akan memberikan nilai guna atau keuntungan jika gagal sampai ke tangan konsumen',
          'Karena distribusi menghapuskan seluruh beban pajak penghasilan perusahaan',
          'Karena kegiatan distribusi adalah satu-satunya penentu harga bahan mentah di alam'
        ],
        correctIndex: 1,
        explanation: 'Tanpa distribusi yang efektif, produk sebaik apa pun hanya akan menumpuk di gudang, tidak memberikan nilai guna bagi masyarakat, serta tidak mendatangkan pendapatan bagi kelangsungan produsen.'
      },
      {
        id: 'qk12-8',
        category: 'Barang Modal vs Barang Konsumsi',
        question: 'Manakah analisis yang paling komprehensif dalam membedakan antara produksi barang modal dan produksi barang konsumsi?',
        options: [
          'Barang modal digunakan untuk menghasilkan barang lain lebih lanjut (seperti mesin pabrik), sedangkan barang konsumsi langsung dihabiskan manfaatnya oleh konsumen akhir (seperti roti dan pakaian)',
          'Barang modal hanya berupa uang tunai di bank, sedangkan barang konsumsi berupa benda padat',
          'Barang modal dibuat oleh perorangan, sedangkan barang konsumsi dibuat oleh robot otomatis',
          'Tidak ada perbedaan mendasar karena keduanya melalui jalur distribusi yang sama'
        ],
        correctIndex: 0,
        explanation: 'Barang modal (capital goods) adalah sarana produksi untuk menghasilkan output lanjutan, sedangkan barang konsumsi (consumer goods) adalah barang siap pakai yang langsung dinikmati konsumen akhir.'
      },
      {
        id: 'qk12-9',
        category: 'Alokasi Strategis Faktor Produksi',
        question: 'Seorang direktur perusahaan menetapkan kebijakan anggaran operasional dengan mengalokasikan sebagian besar dana untuk memperbarui mesin produksi dan membangun gedung pelatihan keahlian karyawan, alih-alih membagikannya sebagai bonus tunai. Berdasarkan teori faktor produksi, tindakan strategis ini bertujuan untuk...',
        options: [
          'Mengurangi jumlah tenaga kerja secara drastis dalam waktu singkat',
          'Memaksimalkan efisiensi faktor modal dan meningkatkan faktor keahlian demi keluaran produksi yang optimal',
          'Menghilangkan ketergantungan perusahaan terhadap bahan baku alam',
          'Menghentikan seluruh kegiatan distribusi logistik perusahaan'
        ],
        correctIndex: 1,
        explanation: 'Memperbarui mesin meningkatkan kualitas faktor modal, sedangkan pelatihan karyawan meningkatkan faktor keahlian dan kapasitas tenaga kerja, keduanya bersinergi memaksimalkan efisiensi dan output produksi.'
      },
      {
        id: 'qk12-10',
        category: 'Siklus Krisis Kegiatan Ekonomi',
        question: 'Jika suatu negara mengalami kerusakan lingkungan parah akibat eksploitasi faktor alam yang tidak terkendali tanpa diimbangi tindakan konservasi, apa bentuk krisis beruntun yang akan terjadi pada siklus kegiatan ekonomi nasional?',
        options: [
          'Kelangkaan bahan baku → kelumpuhan kegiatan produksi → terhentinya distribusi → penurunan drastis tingkat konsumsi dan kemakmuran masyarakat',
          'Lonjakan jumlah uang beredar → peningkatan kemakmuran secara instan',
          'Penutupan seluruh pasar tradisional → peralihan total ke sistem barter',
          'Peningkatan jumlah tenaga kerja secara otomatis tanpa batas'
        ],
        correctIndex: 0,
        explanation: 'Kerusakan alam memicu efek domino sistemik: kelangkaan bahan mentah melumpuhkan produksi, melumpuhkan distribusi karena tiadanya barang, hingga akhirnya menurunkan daya konsumsi dan kemakmuran masyarakat secara luas.'
      }
    ]
  }
];
