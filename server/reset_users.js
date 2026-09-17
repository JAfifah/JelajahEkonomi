import { pool } from './db.js';

const defaultBadges = [
  { id: 'b1', title: 'Penyelidik Ekonomi', icon: '🔍', desc: 'Selesaikan scan foto AI pertama', unlocked: false },
  { id: 'b2', title: 'Pelajar Rajin', icon: '📚', desc: 'Selesaikan 3 kuis kegiatan ekonomi', unlocked: false },
  { id: 'b3', title: 'Manajer Keuangan', icon: '💰', desc: 'Kumpulkan 200 Koin Edukasi', unlocked: false },
  { id: 'b4', title: 'Master Produksi', icon: '🏭', desc: 'Jawab sempurna kuis bab Produksi', unlocked: false },
  { id: 'b5', title: 'Pahlawan Distribusi', icon: '🚚', desc: 'Selesaikan 5 misi foto Distribusi', unlocked: false },
  { id: 'b6', title: 'Konsumen Bijak', icon: '🛒', desc: 'Beli item sesuai skala prioritas utama', unlocked: false },
  { id: 'b7', title: 'Master Ekonomi IPS', icon: '👑', desc: 'Selesaikan seluruh tugas di 7 pulau ekonomi', unlocked: false }
];

const studentsToReset = [
  {
    username: 'user1',
    name: 'Kelompok 1',
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
    inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-gundul-bebas']
  },
  {
    username: 'user2',
    name: 'Kelompok 2',
    equipped: {
      skinTone: '#fce3cf',
      hairstyle: 'hair-gundul-bebas',
      hairColor: '#4a2e18',
      top: 'top-kaos-ips',
      bottom: 'bottom-rok-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-gundul-bebas',
      accessories: 'hair-gundul-bebas'
    },
    inventory: ['top-kaos-ips', 'bottom-rok-biru', 'shoes-sneakers-putih', 'hair-gundul-bebas']
  },
  {
    username: 'user3',
    name: 'Kelompok 3',
    equipped: {
      skinTone: '#d99768',
      hairstyle: 'hair-gundul-bebas',
      hairColor: '#1a1a1a',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-gundul-bebas',
      accessories: 'hair-gundul-bebas'
    },
    inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-gundul-bebas']
  },
  {
    username: 'user4',
    name: 'Kelompok 4',
    equipped: {
      skinTone: '#c68642',
      hairstyle: 'hair-gundul-bebas',
      hairColor: '#000000',
      top: 'top-kaos-ips',
      bottom: 'bottom-jeans-biru',
      shoes: 'shoes-sneakers-putih',
      accessory: 'hair-gundul-bebas',
      accessories: 'hair-gundul-bebas'
    },
    inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-gundul-bebas']
  }
];

export async function resetAllStudents() {
  console.log('🔄 Memulai proses reset user1-4 ke baseline awal 0...');

  for (const s of studentsToReset) {
    await pool.query(
      `UPDATE users SET
        name = ?,
        level = 1,
        xp = 0,
        xp_to_next_level = 1000,
        coins = 0,
        points = 0,
        daily_streak = 1,
        quizzes_completed = 0,
        quiz_score_sum = 0,
        ai_scans_verified = 0,
        items_bought = 0,
        equipped = ?,
        inventory = ?,
        badges = ?,
        completed_tasks = ?,
        updated_at = NOW()
      WHERE LOWER(username) = LOWER(?)`,
      [
        s.name,
        JSON.stringify(s.equipped),
        JSON.stringify(s.inventory),
        JSON.stringify(defaultBadges),
        JSON.stringify([]),
        s.username
      ]
    );

    // Clear old activity logs for this student
    await pool.query(
      `DELETE FROM activity_logs WHERE LOWER(username) = LOWER(?)`,
      [s.username]
    );

    // Log initialization event
    await pool.query(
      `INSERT INTO activity_logs (username, student_name, activity_type, title, xp_earned, coins_earned, points_earned, details)
       VALUES (?, ?, 'system', 'Akun direset ke awal 0 (Koin: 0, Poin: 0, Level: 1)', 0, 0, 0, ?)`,
      [s.username, s.name, JSON.stringify({ reason: 'Admin reset baseline' })]
    );

    console.log(`✅ ${s.username} (${s.name}) berhasil direset: 0 koin, 0 poin, 0 XP, Level 1`);
  }

  console.log('🎉 Seluruh user1-4 telah berhasil direset ke awal 0!');
}

// Execute if run directly
if (process.argv[1]?.endsWith('reset_users.js')) {
  resetAllStudents()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Gagal mereset siswa:', err);
      process.exit(1);
    });
}
