const STORAGE_KEY = 'kebutuhanquest_student_data_v2';
const AUTH_USER_KEY = 'kebutuhanquest_auth_user_v1';

export function getCurrentAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get current auth user:', e);
    return null;
  }
}

export function setCurrentAuthUser(user) {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_USER_KEY);
    } else {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to set current auth user:', e);
  }
}

export function clearAuthUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (e) {
    console.error('Failed to clear auth user:', e);
  }
}

function getUserStorageKey(user) {
  const current = user || getCurrentAuthUser();
  if (current && current.username) {
    return `${STORAGE_KEY}_${current.username.toLowerCase()}`;
  }
  return STORAGE_KEY;
}

export const BASE_BADGES = [
  { id: 'b1', title: 'Penyelidik Ekonomi', icon: '🔍', desc: 'Selesaikan scan foto AI pertama', unlocked: false },
  { id: 'b2', title: 'Pelajar Rajin', icon: '📚', desc: 'Selesaikan 3 kuis kegiatan ekonomi', unlocked: false },
  { id: 'b3', title: 'Manajer Keuangan', icon: '💰', desc: 'Kumpulkan 200 Koin Edukasi', unlocked: false },
  { id: 'b4', title: 'Master Produksi', icon: '🏭', desc: 'Jawab sempurna kuis bab Produksi', unlocked: false },
  { id: 'b5', title: 'Pahlawan Distribusi', icon: '🚚', desc: 'Selesaikan 5 misi foto Distribusi', unlocked: false },
  { id: 'b6', title: 'Konsumen Bijak', icon: '🛒', desc: 'Beli item sesuai skala prioritas utama', unlocked: false },
  { id: 'b7', title: 'Master Ekonomi IPS', icon: '👑', desc: 'Selesaikan seluruh tugas di 7 pulau ekonomi', unlocked: false }
];

export const INITIAL_STUDENT_DATA = {
  name: "Budi Pratama",
  username: "user1",
  role: "siswa",
  schoolClass: 'Kelas 7A - SMP Negeri 1',
  level: 1,
  xp: 0,
  xpToNextLevel: 1000,
  coins: 0, // Mulai dari 0
  points: 0, // Poin Belajar mulai dari 0
  dailyStreak: 1,
  lastLogin: new Date().toISOString(),
  equipped: {
    skinTone: '#f5c396',
    hairstyle: 'hair-rambut-laki',
    hairColor: '#2b2b2b',
    top: 'top-kaos-ips',
    bottom: 'bottom-jeans-biru',
    shoes: 'shoes-sneakers-putih',
    accessory: 'hair-rambut-laki',
    accessories: 'hair-rambut-laki'
  },
  inventory: [
    'top-kaos-ips',
    'bottom-jeans-biru',
    'shoes-sneakers-putih',
    'hair-rambut-laki'
  ],
  stats: {
    quizzesCompleted: 0,
    quizScoreSum: 0,
    aiScansVerified: 0,
    itemsBought: 0
  },
  badges: BASE_BADGES.map(b => ({ ...b, unlocked: false })),
  completedTasks: [],
  geminiApiKey: 'sk-aba05541f9164d44-bhi1xh-a5e4130e'
};

export function buildInitialDataForUser(user) {
  if (!user) return INITIAL_STUDENT_DATA;

  const isAdmin = user.role === 'admin';
  const defaultHair = user.avatar?.hairstyle || 'hair-rambut-laki';

  // Jika admin: sediakan saldo koin & level untuk testing
  if (isAdmin) {
    return {
      ...INITIAL_STUDENT_DATA,
      name: user.name || 'Administrator',
      username: 'admin',
      role: 'admin',
      schoolClass: user.schoolClass || 'Penguji Sistem & Guru Pembina',
      level: 5,
      xp: 2500,
      coins: 5000,
      points: 2500,
      dailyStreak: 10,
      stats: {
        quizzesCompleted: 5,
        quizScoreSum: 500,
        aiScansVerified: 5,
        itemsBought: 3
      },
      badges: BASE_BADGES.map((b, idx) => ({ ...b, unlocked: idx < 4 })),
      equipped: user.avatar ? { ...INITIAL_STUDENT_DATA.equipped, ...user.avatar } : INITIAL_STUDENT_DATA.equipped,
      inventory: [
        'top-kaos-ips',
        'bottom-jeans-biru',
        'shoes-sneakers-putih',
        defaultHair
      ]
    };
  }

  // Akun Siswa (user 1-4): Semua mulai dari awal (0 koin, 0 XP, 0 poin, level 1, lencana terkunci)
  return {
    ...INITIAL_STUDENT_DATA,
    name: user.name || INITIAL_STUDENT_DATA.name,
    username: user.username,
    role: 'siswa',
    schoolClass: user.schoolClass || INITIAL_STUDENT_DATA.schoolClass,
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    coins: 0,
    points: 0,
    dailyStreak: 1,
    stats: {
      quizzesCompleted: 0,
      quizScoreSum: 0,
      aiScansVerified: 0,
      itemsBought: 0
    },
    badges: BASE_BADGES.map(b => ({ ...b, unlocked: false })),
    completedTasks: [],
    equipped: user.avatar ? { ...INITIAL_STUDENT_DATA.equipped, ...user.avatar } : INITIAL_STUDENT_DATA.equipped,
    inventory: [
      'top-kaos-ips',
      'bottom-jeans-biru',
      'shoes-sneakers-putih',
      defaultHair
    ]
  };
}

export function loadStudentData(targetUser = null) {
  try {
    const key = getUserStorageKey(targetUser);
    const dataStr = localStorage.getItem(key);
    const baseInitial = buildInitialDataForUser(targetUser || getCurrentAuthUser());

    if (!dataStr) {
      saveStudentData(baseInitial, targetUser);
      return baseInitial;
    }
    const parsed = JSON.parse(dataStr);
    
    // Pastikan item yang dimiliki mencakup item default jika belum ada
    const inventorySet = new Set([...baseInitial.inventory, ...(parsed.inventory || [])]);
    
    const equipped = { 
      ...baseInitial.equipped, 
      ...(parsed.equipped || {}) 
    };

    // Jika belum ada aksesori/rambut yang dipasang, gunakan default
    if (!equipped.accessories && !equipped.accessory && (equipped.hairstyle === 'none' || !equipped.hairstyle)) {
      equipped.accessories = baseInitial.equipped.accessories || 'hair-rambut-laki';
      equipped.accessory = baseInitial.equipped.accessory || 'hair-rambut-laki';
      equipped.hairstyle = baseInitial.equipped.hairstyle || 'hair-rambut-laki';
    }

    const savedKey = parsed.geminiApiKey;
    const finalApiKey = (!savedKey || savedKey.startsWith('AQ.') || savedKey.startsWith('AIza')) 
      ? baseInitial.geminiApiKey 
      : savedKey;

    return {
      ...baseInitial,
      ...parsed,
      name: parsed.name || baseInitial.name,
      username: baseInitial.username,
      role: baseInitial.role,
      schoolClass: parsed.schoolClass || baseInitial.schoolClass,
      inventory: Array.from(inventorySet),
      equipped,
      completedTasks: parsed.completedTasks || baseInitial.completedTasks,
      geminiApiKey: finalApiKey,
      stats: { ...baseInitial.stats, ...(parsed.stats || {}) }
    };
  } catch (e) {
    console.error('Failed to load student data:', e);
    return buildInitialDataForUser(targetUser || getCurrentAuthUser());
  }
}

export function saveStudentData(data, targetUser = null) {
  try {
    const key = getUserStorageKey(targetUser);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save student data:', e);
  }
}

export function resetStudentData(targetUser = null) {
  const initial = buildInitialDataForUser(targetUser || getCurrentAuthUser());
  saveStudentData(initial, targetUser);
  return initial;
}

export function toggleTaskCompletion(student, taskObj) {
  const currentCompleted = student.completedTasks || [];
  const isAlreadyDone = currentCompleted.includes(taskObj.id);

  let updatedCompleted;
  let newCoins = student.coins;
  let newXp = student.xp;
  let newPoints = student.points;

  if (isAlreadyDone) {
    // Uncheck task
    updatedCompleted = currentCompleted.filter(id => id !== taskObj.id);
  } else {
    // Check task & reward
    updatedCompleted = [...currentCompleted, taskObj.id];
    newCoins += taskObj.rewardCoins !== undefined ? taskObj.rewardCoins : 5;
    newXp += taskObj.rewardXp || 20;
    newPoints += taskObj.rewardXp || 20;
  }

  // Check Master Badge
  let newLevel = student.level;
  let newXpToNext = student.xpToNextLevel;
  if (newXp >= newXpToNext) {
    newLevel += 1;
    newXpToNext += 100;
  }

  const updatedBadges = (student.badges || []).map(b => {
    if (b.id === 'b7' && updatedCompleted.length >= 28) {
      return { ...b, unlocked: true };
    }
    return b;
  });

  return {
    ...student,
    coins: newCoins,
    xp: newXp,
    points: newPoints,
    level: newLevel,
    xpToNextLevel: newXpToNext,
    completedTasks: updatedCompleted,
    badges: updatedBadges
  };
}

