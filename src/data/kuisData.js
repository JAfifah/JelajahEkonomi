export const QUIZ_LEVELS = [
  {
    id: 'level-1',
    name: 'Level 1: Konsep Dasar Kegiatan Ekonomi',
    description: 'Uji pemahaman dasar mengenai pengertian Produksi, Distribusi, dan Konsumsi.',
    badge: 'Pemula',
    unlockedAtLevel: 1,
    rewardCoins: 50,
    rewardXp: 40,
    questions: [
      {
        id: 'q1-1',
        category: 'Produksi',
        question: 'Seorang penjahit mengubah selembar kain menjadi seragam sekolah yang siap dipakai siswa. Kegiatan penjahit tersebut tergolong dalam kegiatan...',
        options: ['Distribusi', 'Produksi', 'Konsumsi', 'Investasi'],
        correctIndex: 1,
        explanation: 'Penjahit menambah nilai guna barang (kain menjadi seragam) dan menciptakan barang baru, yang merupakan definisi Kegiatan Produksi.'
      },
      {
        id: 'q1-2',
        category: 'Distribusi',
        question: 'Truk ekspedisi mengangkut beras dari hasil panen petani di Karawang menuju pasar-pasar besar di Jakarta. Kegiatan ini adalah bentuk...',
        options: ['Konsumsi', 'Produksi', 'Distribusi', 'Kewirausahaan'],
        correctIndex: 2,
        explanation: 'Mengangkut dan menyalurkan barang dari lokasi produsen ke lokasi konsumen adalah inti dari Kegiatan Distribusi.'
      },
      {
        id: 'q1-3',
        category: 'Konsumsi',
        question: 'Rani membeli nasi goreng di kantin sekolah dan memakannya saat jam istirahat. Aktivitas Rani menyentuh kegiatan...',
        options: ['Produksi Barang', 'Distribusi Langsung', 'Konsumsi', 'Faktor Modal'],
        correctIndex: 2,
        explanation: 'Rani memakan nasi goreng untuk mengurangi/menghabiskan nilai guna makanan untuk memenuhi kebutuhan lapar (Konsumsi).'
      },
      {
        id: 'q1-4',
        category: 'Produksi',
        question: 'Di bawah ini yang termasuk dalam kelompok Faktor Produksi Alam adalah...',
        options: ['Mesin jahit dan pabrik', 'Tanah, air, dan barang tambang', 'Tenaga kerja terdidik', 'Modal uang rupiah'],
        correctIndex: 1,
        explanation: 'Tanah, air, dan barang tambang merupakan kekayaan alam yang disediakan bumi tanpa buatan manusia (Faktor Produksi Alam).'
      },
      {
        id: 'q1-5',
        category: 'Distribusi',
        question: 'Petani memetik buah mangga dari pohonnya lalu menjual mangga tersebut langsung kepada pembeli yang lewat di depan rumahnya. Bentuk distribusi ini adalah...',
        options: ['Distribusi Tidak Langsung', 'Distribusi Langsung', 'Distribusi Semi Langsung', 'Distribusi Agen'],
        correctIndex: 1,
        explanation: 'Penyaluran dari produsen (petani) ke konsumen tanpa menggunakan perantara pedagang lain dinamakan Distribusi Langsung.'
      }
    ]
  },
  {
    id: 'level-2',
    name: 'Level 2: Analisis Faktor & Saluran Ekonomi',
    description: 'Analisis mendalam faktor produksi, saluran distribusi, dan penyebab perbedaan tingkat konsumsi.',
    badge: 'Menengah',
    unlockedAtLevel: 2,
    rewardCoins: 100,
    rewardXp: 80,
    questions: [
      {
        id: 'q2-1',
        category: 'Produksi',
        question: 'Dokter spesialis dan Guru mata pelajaran IPS tergolong ke dalam kelompok Tenaga Kerja...',
        options: ['Tidak Terdidik dan Tidak Terlatih', 'Terlatih saja', 'Terdidik', 'Faktor Modal'],
        correctIndex: 2,
        explanation: 'Dokter dan Guru menempuh pendidikan formal tinggi untuk memperoleh keahliannya, sehingga dikategorikan Tenaga Kerja Terdidik.'
      },
      {
        id: 'q2-2',
        category: 'Distribusi',
        question: 'Pabrik sepatu ternama mendirikan toko cabang resmi (Official Store) milik perusahaan sendiri di berbagai kota untuk menjual produknya. Saluran distribusi ini adalah...',
        options: ['Distribusi Langsung', 'Distribusi Semi-Langsung', 'Distribusi Tidak Langsung', 'Distribusi Bebas'],
        correctIndex: 1,
        explanation: 'Distribusi Semi-Langsung terjadi ketika penyaluran barang dilakukan melalui outlet/perantara yang dimiliki secara resmi oleh produsen sendiri.'
      },
      {
        id: 'q2-3',
        category: 'Konsumsi',
        question: 'Andi yang tinggal di daerah pegunungan dingin membeli banyak jaket tebal, sedangkan Budi yang tinggal di daerah pantai lebih banyak membeli kaos tipis. Hal ini dipengaruhi oleh faktor eksternal...',
        options: ['Tingkat Pendidikan', 'Lingkungan Tempat Tinggal', 'Jumlah Anggota Keluarga', 'Selera Individu'],
        correctIndex: 1,
        explanation: 'Kondisi geografis dan lingkungan tempat tinggal merupakan faktor eksternal yang memengaruhi perbedaan pola konsumsi.'
      },
      {
        id: 'q2-4',
        category: 'Produksi',
        question: 'Mengubah bahan mentah (kayu) menjadi barang jadi (meja belajar) menghasilkan kenaikan nilai guna yang dinamakan...',
        options: ['Time Utility (Nilai Guna Waktu)', 'Place Utility (Nilai Guna Tempat)', 'Form Utility (Nilai Guna Bentuk)', 'Ownership Utility (Nilai Guna Kepemilikan)'],
        correctIndex: 2,
        explanation: 'Form Utility (Nilai Guna Bentuk) adalah peningkatan kemanfaatan barang akibat perubahan bentuk fisik dari bahan mentah menjadi benda jadi.'
      },
      {
        id: 'q2-5',
        category: 'Konsumsi',
        question: 'Siswa kelas 7 diberi uang saku terbatas. Tindakan paling tepat dalam mengelola uang saku sesuai skala prioritas adalah...',
        options: [
          'Membeli mainan mahal dulu baru memikirkan buku',
          'Mendahulukan kebutuhan alat tulis dan makan siang sekolah',
          'Menghabiskan uang untuk menyewa game online',
          'Meminjam uang teman untuk membeli baju barang mewah'
        ],
        correctIndex: 1,
        explanation: 'Alat tulis dan makanan sekolah adalah Kebutuhan Primer (Prioritas Utama) bagi seorang pelajar.'
      }
    ]
  },
  {
    id: 'level-3',
    name: 'Level 3: Studi Kasus Master Kegiatan Ekonomi',
    description: 'Selesaikan studi kasus dunia nyata dan buktikan kamu adalah Master Ekonomi IPS!',
    badge: 'Master Ekonomi',
    unlockedAtLevel: 3,
    rewardCoins: 180,
    rewardXp: 150,
    questions: [
      {
        id: 'q3-1',
        category: 'Studi Kasus Multi-Kegiatan',
        question: 'Pak Hadi membeli tepung (faktor modal), mempekerjakan 3 koki (faktor tenaga kerja), dan menggunakan mesin oven untuk membuat kue tart. Setelah jadi, ia menjualnya melalui warung tetangga dan sebagian dimakan anaknya. Rangkaian kegiatan ini berturut-turut menggambarkan...',
        options: [
          'Konsumsi ➔ Distribusi ➔ Produksi',
          'Produksi ➔ Distribusi & Konsumsi',
          'Distribusi ➔ Produksi ➔ Konsumsi',
          'Hanya Kegiatan Produksi saja'
        ],
        correctIndex: 1,
        explanation: 'Membuat kue tart adalah Produksi, menjual melalui warung tetangga adalah Distribusi, dan memakannya adalah Konsumsi.'
      },
      {
        id: 'q3-2',
        category: 'Produksi & Kewirausahaan',
        question: 'Kemampuan seorang wirausahawan dalam mengombinasikan faktor alam, tenaga kerja, dan modal agar perusahaan menghasilkan laba optimal dinamakan...',
        options: ['Faktor Modal Turunan', 'Faktor Kewirausahaan (Entrepreneurship)', 'Nilai Guna Tempat', 'Distribusi Langsung'],
        correctIndex: 1,
        explanation: 'Faktor Kewirausahaan (Skill/Entrepreneurship) adalah kemampuan manajerial untuk mengelola ketiga faktor produksi lainnya.'
      },
      {
        id: 'q3-3',
        category: 'Distribusi Global',
        question: 'Pedagang grosir membeli mi instan puluhan dus dari pabrik produsen, kemudian menyalurkan ke toko-toko eceran, lalu eceran menjual 1 bungkus ke siswa. Urutan saluran distribusi tidak langsung ini adalah...',
        options: [
          'Produsen ➔ Grosir ➔ Pengecer ➔ Konsumen',
          'Produsen ➔ Konsumen ➔ Grosir ➔ Pengecer',
          'Grosir ➔ Produsen ➔ Pengecer ➔ Agen',
          'Produsen ➔ Agen ➔ Konsumen ➔ Grosir'
        ],
        correctIndex: 0,
        explanation: 'Urutan saluran distribusi tidak langsung standar adalah: Produsen ➔ Grosir/Pedagang Besar ➔ Pengecer ➔ Konsumen Akhir.'
      },
      {
        id: 'q3-4',
        category: 'Faktor Konsumsi',
        question: 'Manakah di bawah ini yang tergolong dalam Faktor Internal yang memengaruhi pola konsumsi seseorang?',
        options: [
          'Tingkat pendapatan uang saku & selera pribadi',
          'Kondisi iklim dan cuaca daerah',
          'Perkembangan tren iklan di televisi',
          'Harga barang di pasar tradisional'
        ],
        correctIndex: 0,
        explanation: 'Pendapatan dan selera berasal dari kondisi dalam diri individu (Faktor Internal).'
      },
      {
        id: 'q3-5',
        category: 'Evaluasi Kebutuhan',
        question: 'Alat pemuas kebutuhan manusia bersifat terbatas, sedangkan kebutuhan manusia tidak terbatas. Kondisi mendasar dalam ilmu ekonomi ini disebut...',
        options: ['Kelangkaan (Scarcity)', 'Kelebihan Produksi (Surplus)', 'Kemakmuran Bebas', 'Distribusi Sempurna'],
        correctIndex: 0,
        explanation: 'Kelangkaan (Scarcity) adalah masalah inti ekonomi di mana alat pemuas kebutuhan terbatas sementara kebutuhan manusia tidak terbatas.'
      }
    ]
  }
];
