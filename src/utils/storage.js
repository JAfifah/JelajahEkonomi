const STORAGE_KEY = 'kebutuhanquest_student_data_v1';

export const INITIAL_STUDENT_DATA = {
  name: "Jami'atul Afifah",
  schoolClass: 'Level 3: Agen Ekonomi Pemula',
  level: 3,
  xp: 850,
  xpToNextLevel: 1000,
  coins: 1250, // Koin Edukasi
  points: 850, // Poin Belajar
  dailyStreak: 5,
  lastLogin: new Date().toISOString(),
  equipped: {
    skinTone: '#f5c396',
    hairstyle: 'none',
    hairColor: '#2b2b2b',
    top: 'top-kaos-ips',
    bottom: 'bottom-jeans-biru',
    shoes: 'shoes-sneakers-putih',
    accessory: null
  },
  inventory: [
    'top-kaos-ips',
    'bottom-jeans-biru',
    'shoes-sneakers-putih'
  ],
  stats: {
    quizzesCompleted: 5,
    quizScoreSum: 480,
    aiScansVerified: 4,
    itemsBought: 2
  },
  badges: [
    { id: 'b1', title: 'Penyelidik Ekonomi', icon: '🔍', desc: 'Selesaikan scan foto AI pertama', unlocked: true },
    { id: 'b2', title: 'Pelajar Rajin', icon: '📚', desc: 'Selesaikan 3 kuis kegiatan ekonomi', unlocked: true },
    { id: 'b3', title: 'Manajer Keuangan', icon: '💰', desc: 'Kumpulkan 200 Koin Edukasi', unlocked: true },
    { id: 'b4', title: 'Master Produksi', icon: '🏭', desc: 'Jawab sempurna kuis bab Produksi', unlocked: true },
    { id: 'b5', title: 'Pahlawan Distribusi', icon: '🚚', desc: 'Selesaikan 5 misi foto Distribusi', unlocked: false },
    { id: 'b6', title: 'Konsumen Bijak', icon: '🛒', desc: 'Beli item sesuai skala prioritas utama', unlocked: false }
  ],
  geminiApiKey: ''
};

export function loadStudentData() {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (!dataStr) {
      saveStudentData(INITIAL_STUDENT_DATA);
      return INITIAL_STUDENT_DATA;
    }
    const parsed = JSON.parse(dataStr);
    const equipped = { ...INITIAL_STUDENT_DATA.equipped, ...(parsed.equipped || {}) };
    if (equipped.accessory === 'acc-topi-kebutuhan' || equipped.accessory === 'hair-rambut-laki' || equipped.hairstyle === 'short-casual') {
      equipped.accessory = null;
      equipped.hairstyle = 'none';
    }
    return {
      ...INITIAL_STUDENT_DATA,
      ...parsed,
      equipped,
      stats: { ...INITIAL_STUDENT_DATA.stats, ...(parsed.stats || {}) }
    };
  } catch (e) {
    console.error('Failed to load student data:', e);
    return INITIAL_STUDENT_DATA;
  }
}

export function saveStudentData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save student data:', e);
  }
}

export function resetStudentData() {
  saveStudentData(INITIAL_STUDENT_DATA);
  return INITIAL_STUDENT_DATA;
}
