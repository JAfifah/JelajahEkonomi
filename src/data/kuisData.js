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
  }
];
