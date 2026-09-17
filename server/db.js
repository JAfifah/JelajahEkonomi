import mysql from 'mysql2/promise';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jelajah_ekonomi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(DB_CONFIG);

export async function initDatabase() {
  // First ensure database exists
  const rootConn = await mysql.createConnection({
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    user: DB_CONFIG.user,
    password: DB_CONFIG.password
  });
  
  await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await rootConn.end();

  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(20) DEFAULT 'siswa',
      school_class VARCHAR(100) DEFAULT '',
      level INT DEFAULT 1,
      xp INT DEFAULT 0,
      xp_to_next_level INT DEFAULT 1000,
      coins INT DEFAULT 0,
      points INT DEFAULT 0,
      daily_streak INT DEFAULT 1,
      quizzes_completed INT DEFAULT 0,
      quiz_score_sum INT DEFAULT 0,
      ai_scans_verified INT DEFAULT 0,
      items_bought INT DEFAULT 0,
      equipped JSON,
      inventory JSON,
      badges JSON,
      completed_tasks JSON,
      gemini_api_key VARCHAR(255) DEFAULT 'sk-04ded80af82184d6-xji11m-80ccc120',
      last_login DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_points_level (points DESC, level DESC)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      student_name VARCHAR(100) NOT NULL,
      activity_type VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      xp_earned INT DEFAULT 0,
      coins_earned INT DEFAULT 0,
      points_earned INT DEFAULT 0,
      details JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user_activity (username, created_at DESC)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Seed default users if users table is empty
  const [existingUsers] = await pool.query(`SELECT COUNT(*) as count FROM users;`);
  if (existingUsers[0].count === 0) {
    console.log('Seeding default users into MySQL database...');

    const defaultBadges = [
      { id: 'b1', title: 'Penyelidik Ekonomi', icon: '🔍', desc: 'Selesaikan scan foto AI pertama', unlocked: false },
      { id: 'b2', title: 'Pelajar Rajin', icon: '📚', desc: 'Selesaikan 3 kuis kegiatan ekonomi', unlocked: false },
      { id: 'b3', title: 'Manajer Keuangan', icon: '💰', desc: 'Kumpulkan 200 Koin Edukasi', unlocked: false },
      { id: 'b4', title: 'Master Produksi', icon: '🏭', desc: 'Jawab sempurna kuis bab Produksi', unlocked: false },
      { id: 'b5', title: 'Pahlawan Distribusi', icon: '🚚', desc: 'Selesaikan 5 misi foto Distribusi', unlocked: false },
      { id: 'b6', title: 'Konsumen Bijak', icon: '🛒', desc: 'Beli item sesuai skala prioritas utama', unlocked: false },
      { id: 'b7', title: 'Master Ekonomi IPS', icon: '👑', desc: 'Selesaikan seluruh tugas di 7 pulau ekonomi', unlocked: false }
    ];

    const defaultUsers = [
      {
        username: 'admin',
        password: 'admin',
        name: 'Administrator (Penguji/Guru)',
        role: 'admin',
        school_class: 'Penguji Sistem & Guru Pembina',
        level: 5,
        xp: 2500,
        coins: 5000,
        points: 2500,
        daily_streak: 10,
        quizzes_completed: 5,
        quiz_score_sum: 500,
        ai_scans_verified: 5,
        items_bought: 3,
        equipped: {
          skinTone: '#f5c396',
          hairstyle: 'hair-rambut-laki',
          hairColor: '#1e293b',
          top: 'top-kaos-ips',
          bottom: 'bottom-jeans-biru',
          shoes: 'shoes-sneakers-putih',
          accessory: 'hair-rambut-laki',
          accessories: 'hair-rambut-laki'
        },
        inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-rambut-laki'],
        badges: defaultBadges.map((b, idx) => ({ ...b, unlocked: idx < 4 })),
        completed_tasks: ['wants-t1', 'wants-t2', 'wants-t3']
      },
      {
        username: 'user1',
        password: 'user1',
        name: 'Kelompok 1',
        role: 'siswa',
        school_class: '',
        level: 1,
        xp: 0,
        coins: 0,
        points: 0,
        daily_streak: 1,
        quizzes_completed: 0,
        quiz_score_sum: 0,
        ai_scans_verified: 0,
        items_bought: 0,
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
        inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-rambut-laki'],
        badges: defaultBadges,
        completed_tasks: []
      },
      {
        username: 'user2',
        password: 'user2',
        name: 'Kelompok 2',
        role: 'siswa',
        school_class: '',
        level: 1,
        xp: 0,
        coins: 0,
        points: 0,
        daily_streak: 1,
        quizzes_completed: 0,
        quiz_score_sum: 0,
        ai_scans_verified: 0,
        items_bought: 0,
        equipped: {
          skinTone: '#fce3cf',
          hairstyle: 'hair-rambut-panjang',
          hairColor: '#4a2e18',
          top: 'top-kaos-ips',
          bottom: 'bottom-rok-biru',
          shoes: 'shoes-sneakers-putih',
          accessory: 'hair-rambut-panjang',
          accessories: 'hair-rambut-panjang'
        },
        inventory: ['top-kaos-ips', 'bottom-rok-biru', 'shoes-sneakers-putih', 'hair-rambut-panjang'],
        badges: defaultBadges,
        completed_tasks: []
      },
      {
        username: 'user3',
        password: 'user3',
        name: 'Kelompok 3',
        role: 'siswa',
        school_class: '',
        level: 1,
        xp: 0,
        coins: 0,
        points: 0,
        daily_streak: 1,
        quizzes_completed: 0,
        quiz_score_sum: 0,
        ai_scans_verified: 0,
        items_bought: 0,
        equipped: {
          skinTone: '#d99768',
          hairstyle: 'hair-rambut-pendek',
          hairColor: '#1a1a1a',
          top: 'top-kaos-ips',
          bottom: 'bottom-jeans-biru',
          shoes: 'shoes-sneakers-putih',
          accessory: 'hair-rambut-pendek',
          accessories: 'hair-rambut-pendek'
        },
        inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-rambut-pendek'],
        badges: defaultBadges,
        completed_tasks: []
      },
      {
        username: 'user4',
        password: 'user4',
        name: 'Kelompok 4',
        role: 'siswa',
        school_class: '',
        level: 1,
        xp: 0,
        coins: 0,
        points: 0,
        daily_streak: 1,
        quizzes_completed: 0,
        quiz_score_sum: 0,
        ai_scans_verified: 0,
        items_bought: 0,
        equipped: {
          skinTone: '#c68642',
          hairstyle: 'hair-rambut-mohawk',
          hairColor: '#000000',
          top: 'top-kaos-ips',
          bottom: 'bottom-jeans-biru',
          shoes: 'shoes-sneakers-putih',
          accessory: 'hair-rambut-mohawk',
          accessories: 'hair-rambut-mohawk'
        },
        inventory: ['top-kaos-ips', 'bottom-jeans-biru', 'shoes-sneakers-putih', 'hair-rambut-mohawk'],
        badges: defaultBadges,
        completed_tasks: []
      }
    ];

    for (const u of defaultUsers) {
      await pool.query(
        `INSERT INTO users (
          username, password, name, role, school_class, level, xp, coins, points, daily_streak,
          quizzes_completed, quiz_score_sum, ai_scans_verified, items_bought,
          equipped, inventory, badges, completed_tasks
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          u.username,
          u.password,
          u.name,
          u.role,
          u.school_class,
          u.level,
          u.xp,
          u.coins,
          u.points,
          u.daily_streak,
          u.quizzes_completed,
          u.quiz_score_sum,
          u.ai_scans_verified,
          u.items_bought,
          JSON.stringify(u.equipped),
          JSON.stringify(u.inventory),
          JSON.stringify(u.badges),
          JSON.stringify(u.completed_tasks)
        ]
      );
    }
    console.log('Seeding completed successfully.');
  }
}
