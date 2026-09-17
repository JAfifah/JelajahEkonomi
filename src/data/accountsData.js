export const DEFAULT_ACCOUNTS = [
  {
    id: 'acc-admin',
    username: 'admin',
    password: 'admin',
    name: 'Administrator (Penguji/Guru)',
    role: 'admin',
    schoolClass: 'Penguji Sistem & Guru Pembina',
    level: 5,
    xp: 2500,
    coins: 5000,
    points: 2500,
    dailyStreak: 10,
    avatar: {
      skinTone: '#f5c396',
      hairstyle: 'hair-rambut-laki',
      hairColor: '#1e293b',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-rambut-laki',
      accessories: 'hair-rambut-laki'
    }
  },
  {
    id: 'acc-user1',
    username: 'user1',
    password: 'user1',
    name: 'Kelompok 1',
    role: 'siswa',
    schoolClass: '',
    level: 1,
    xp: 0,
    coins: 0,
    points: 0,
    dailyStreak: 1,
    avatar: {
      skinTone: '#f5c396',
      hairstyle: 'hair-rambut-laki',
      hairColor: '#2b2b2b',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-rambut-laki',
      accessories: 'hair-rambut-laki'
    }
  },
  {
    id: 'acc-user2',
    username: 'user2',
    password: 'user2',
    name: 'Kelompok 2',
    role: 'siswa',
    schoolClass: '',
    level: 1,
    xp: 0,
    coins: 0,
    points: 0,
    dailyStreak: 1,
    avatar: {
      skinTone: '#ffd9b3',
      hairstyle: 'hair-perempuan-pendek',
      hairColor: '#4a2c11',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-perempuan-pendek',
      accessories: 'hair-perempuan-pendek'
    }
  },
  {
    id: 'acc-user3',
    username: 'user3',
    password: 'user3',
    name: 'Kelompok 3',
    role: 'siswa',
    schoolClass: '',
    level: 1,
    xp: 0,
    coins: 0,
    points: 0,
    dailyStreak: 1,
    avatar: {
      skinTone: '#e0ac69',
      hairstyle: 'hair-rambut-laki',
      hairColor: '#171717',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-rambut-laki',
      accessories: 'hair-rambut-laki'
    }
  },
  {
    id: 'acc-user4',
    username: 'user4',
    password: 'user4',
    name: "Kelompok 4",
    role: 'siswa',
    schoolClass: '',
    level: 1,
    xp: 0,
    coins: 0,
    points: 0,
    dailyStreak: 1,
    avatar: {
      skinTone: '#fcd3b6',
      hairstyle: 'hair-perempuan-pendek',
      hairColor: '#332014',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-perempuan-pendek',
      accessories: 'hair-perempuan-pendek'
    }
  }
];

export function authenticateUser(username, password) {
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  const account = DEFAULT_ACCOUNTS.find(
    (acc) => acc.username.toLowerCase() === cleanUsername && acc.password === cleanPassword
  );

  if (!account) {
    return { success: false, message: 'Username atau password salah. Silakan coba lagi.' };
  }

  return { success: true, user: account };
}
