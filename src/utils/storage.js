import { saveStudentDataApi, logActivityApi } from './apiService';

const STORAGE_KEY = 'kebutuhanquest_student_data_v4';
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
  name: "Kelompok 1",
  username: "user1",
  role: "siswa",
  schoolClass: '',
  level: 1,
  xp: 0,
  xpToNextLevel: 1000,
  coins: 0, // Mulai dari 0
  points: 0, // Poin Belajar mulai dari 0
  dailyStreak: 1,
  lastLogin: new Date().toISOString(),
  equipped: {
    skinTone: '#f5c396',
    hairstyle: 'hair-gundul-bebas',
    hairColor: '#2b2b2b',
    top: 'top-kaos-ips',
    bottom: 'bottom-jeans-biru',
    shoes: 'shoes-sneakers-putih',
    accessory: 'hair-gundul-bebas',
    accessories: 'hair-gundul-bebas'
  },
  inventory: [
    'top-kaos-ips',
    'bottom-jeans-biru',
    'shoes-sneakers-putih',
    'hair-gundul-bebas'
  ],
  stats: {
    quizzesCompleted: 0,
    quizScoreSum: 0,
    aiScansVerified: 0,
    itemsBought: 0
  },
  badges: BASE_BADGES.map(b => ({ ...b, unlocked: false })),
  completedTasks: [],
  completedIslands: [],
  geminiApiKey: 'sk-04ded80af82184d6-xji11m-80ccc120'
};

export function buildInitialDataForUser(user) {
  if (!user) return INITIAL_STUDENT_DATA;

  const isAdmin = user.role === 'admin';
  const defaultHair = user.avatar?.hairstyle || (isAdmin ? 'hair-rambut-laki' : 'hair-gundul-bebas');

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
      ],
      completedTasks: [],
      completedIslands: []
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
    completedIslands: [],
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
    if (!equipped.accessories && !equipped.accessory && !equipped.hairstyle) {
      equipped.accessories = baseInitial.equipped.accessories || 'hair-gundul-bebas';
      equipped.accessory = baseInitial.equipped.accessory || 'hair-gundul-bebas';
      equipped.hairstyle = baseInitial.equipped.hairstyle || 'hair-gundul-bebas';
    }

    const savedKey = parsed.geminiApiKey;
    const finalApiKey = (!savedKey || savedKey.startsWith('AQ.') || savedKey.startsWith('AIza') || savedKey === 'sk-aba05541f9164d44-bhi1xh-a5e4130e') 
      ? baseInitial.geminiApiKey 
      : savedKey;

    const legacyNames = ['Budi Pratama', 'Citra Lestari', 'Dimas Anggara', 'Ambatuskul'];
    const currentName = (legacyNames.includes(parsed.name) || !parsed.name)
      ? (targetUser?.name || baseInitial.name)
      : parsed.name;

    return {
      ...baseInitial,
      ...parsed,
      name: currentName,
      username: baseInitial.username,
      role: baseInitial.role,
      schoolClass: parsed.schoolClass || baseInitial.schoolClass,
      inventory: Array.from(inventorySet),
      equipped,
      completedTasks: parsed.completedTasks || baseInitial.completedTasks,
      completedIslands: parsed.completedIslands || [],
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
    console.error('Failed to save student data locally:', e);
  }

  // Asynchronously persist to MySQL database
  const uname = targetUser?.username || data?.username;
  if (uname) {
    saveStudentDataApi(data, uname).catch(err => {
      console.warn('Background sync to MySQL failed:', err);
    });
  }
}

export function resetStudentData(targetUser = null) {
  const initial = buildInitialDataForUser(targetUser || getCurrentAuthUser());
  saveStudentData(initial, targetUser);
  return initial;
}

/**
 * Menyelesaikan satu task individu dengan proteksi reward satu kali.
 * Jika task sudah selesai sebelumnya, koin dan XP TIDAK AKAN bertambah lagi.
 */
export function completeIndividualTask(student, taskObj, parentMission = null) {
  if (!student || !taskObj) return { updatedStudent: student, isNew: false };
  const currentCompleted = student.completedTasks || [];

  // Proteksi: Jangan beri reward ganda jika sudah tercatat selesai
  if (currentCompleted.includes(taskObj.id)) {
    return { updatedStudent: student, isNew: false };
  }

  const updatedCompleted = [...currentCompleted, taskObj.id];
  const rewardCoins = taskObj.rewardCoins !== undefined ? taskObj.rewardCoins : 10;
  const rewardXp = taskObj.rewardXp !== undefined ? taskObj.rewardXp : 25;

  let newCoins = (student.coins || 0) + rewardCoins;
  let newXp = (student.xp || 0) + rewardXp;
  let newPoints = (student.points || 0) + rewardXp;
  let newLevel = student.level || 1;
  let newXpToNext = student.xpToNextLevel || 1000;

  while (newXp >= newXpToNext) {
    newLevel += 1;
    newXpToNext += 100;
  }

  // Cek apakah dengan selesainya task ini, seluruh task pulau juga tuntas
  let updatedCompletedIslands = [...(student.completedIslands || [])];
  let islandBonusAwarded = false;
  let completedIslandInfo = null;

  if (parentMission && parentMission.tasks) {
    const isAllIslandTasksDone = parentMission.tasks.every(t => updatedCompleted.includes(t.id));
    if (isAllIslandTasksDone && !updatedCompletedIslands.includes(parentMission.id)) {
      updatedCompletedIslands.push(parentMission.id);
      const ISLAND_BONUS_COINS = 50;
      const ISLAND_BONUS_XP = 50;
      newCoins += ISLAND_BONUS_COINS;
      newXp += ISLAND_BONUS_XP;
      newPoints += ISLAND_BONUS_XP;

      while (newXp >= newXpToNext) {
        newLevel += 1;
        newXpToNext += 100;
      }
      islandBonusAwarded = true;
      completedIslandInfo = parentMission;
    }
  }

  // Lencana master jika semua 21 tugas selesai
  const updatedBadges = (student.badges || []).map(b => {
    if (b.id === 'b7' && updatedCompleted.length >= 21) {
      return { ...b, unlocked: true };
    }
    return b;
  });

  const updatedStudent = {
    ...student,
    coins: newCoins,
    xp: newXp,
    points: newPoints,
    level: newLevel,
    xpToNextLevel: newXpToNext,
    completedTasks: updatedCompleted,
    completedIslands: updatedCompletedIslands,
    badges: updatedBadges
  };

  saveStudentData(updatedStudent);

  // Log ke MySQL
  logActivityApi({
    username: student.username,
    studentName: student.name,
    activityType: 'task',
    title: `Selesai Tugas: ${taskObj.text}`,
    xpEarned: rewardXp,
    coinsEarned: rewardCoins,
    pointsEarned: rewardXp,
    details: { taskId: taskObj.id, parentMissionId: parentMission?.id }
  });

  if (islandBonusAwarded && completedIslandInfo) {
    logActivityApi({
      username: student.username,
      studentName: student.name,
      activityType: 'island_completed',
      title: `Tuntas 100% Seluruh Misi: ${completedIslandInfo.locationName || completedIslandInfo.title}`,
      xpEarned: 50,
      coinsEarned: 50,
      pointsEarned: 50,
      details: { islandId: completedIslandInfo.id }
    });
  }

  return { updatedStudent, isNew: true, islandBonusAwarded, completedIslandInfo };
}

/**
 * Pengecekan otomatis jika ada pulau yang seluruh task-nya sudah selesai
 * namun bonus penyelesaian pulau belum tercatat (proteksi reward 1x per pulau).
 */
export function checkAndAwardCompletedIslands(student, missionsList = []) {
  if (!student || !missionsList || missionsList.length === 0) {
    return { updatedStudent: student, newlyCompletedIslands: [] };
  }

  const currentCompleted = student.completedTasks || [];
  let updatedCompletedIslands = [...(student.completedIslands || [])];
  let newCoins = student.coins || 0;
  let newXp = student.xp || 0;
  let newPoints = student.points || 0;
  let newLevel = student.level || 1;
  let newXpToNext = student.xpToNextLevel || 1000;
  const newlyCompletedIslands = [];

  missionsList.forEach(mission => {
    const mTasks = mission.tasks || [];
    if (mTasks.length > 0 && mTasks.every(t => currentCompleted.includes(t.id))) {
      if (!updatedCompletedIslands.includes(mission.id)) {
        updatedCompletedIslands.push(mission.id);
        const ISLAND_BONUS_COINS = 50;
        const ISLAND_BONUS_XP = 50;
        newCoins += ISLAND_BONUS_COINS;
        newXp += ISLAND_BONUS_XP;
        newPoints += ISLAND_BONUS_XP;

        while (newXp >= newXpToNext) {
          newLevel += 1;
          newXpToNext += 100;
        }

        newlyCompletedIslands.push(mission);
      }
    }
  });

  if (newlyCompletedIslands.length === 0) {
    return { updatedStudent: student, newlyCompletedIslands: [] };
  }

  const updatedStudent = {
    ...student,
    coins: newCoins,
    xp: newXp,
    points: newPoints,
    level: newLevel,
    xpToNextLevel: newXpToNext,
    completedIslands: updatedCompletedIslands
  };

  saveStudentData(updatedStudent);

  newlyCompletedIslands.forEach(mission => {
    logActivityApi({
      username: student.username,
      studentName: student.name,
      activityType: 'island_completed',
      title: `Tuntas 100% Seluruh Misi: ${mission.locationName || mission.title}`,
      xpEarned: 50,
      coinsEarned: 50,
      pointsEarned: 50,
      details: { islandId: mission.id }
    });
  });

  return { updatedStudent, newlyCompletedIslands };
}

/**
 * Backward compatibility untuk toggleTaskCompletion dengan proteksi tidak berulang
 */
export function toggleTaskCompletion(student, taskObj) {
  const result = completeIndividualTask(student, taskObj);
  return result.updatedStudent;
}

