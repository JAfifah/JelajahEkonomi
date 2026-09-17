import express from 'express';
import cors from 'cors';
import { pool, initDatabase } from './db.js';
import { resetAllStudents } from './reset_users.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper to format student record from MySQL to frontend schema
function formatStudentRecord(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    role: row.role,
    schoolClass: row.school_class,
    level: row.level,
    xp: row.xp,
    xpToNextLevel: row.xp_to_next_level || 1000,
    coins: row.coins,
    points: row.points,
    dailyStreak: row.daily_streak,
    lastLogin: row.last_login,
    stats: {
      quizzesCompleted: row.quizzes_completed || 0,
      quizScoreSum: row.quiz_score_sum || 0,
      aiScansVerified: row.ai_scans_verified || 0,
      itemsBought: row.items_bought || 0
    },
    equipped: typeof row.equipped === 'string' ? JSON.parse(row.equipped) : (row.equipped || {}),
    inventory: typeof row.inventory === 'string' ? JSON.parse(row.inventory) : (row.inventory || []),
    badges: typeof row.badges === 'string' ? JSON.parse(row.badges) : (row.badges || []),
    completedTasks: typeof row.completed_tasks === 'string' ? JSON.parse(row.completed_tasks) : (row.completed_tasks || []),
    geminiApiKey: row.gemini_api_key
  };
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'mysql', timestamp: new Date().toISOString() });
});

// 2. Auth Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username dan kata sandi wajib diisi' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Username tidak ditemukan' });
    }

    const userRow = rows[0];
    if (userRow.password !== password) {
      return res.status(401).json({ success: false, message: 'Kata sandi salah' });
    }

    // Update last_login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [userRow.id]);

    const formatted = formatStudentRecord(userRow);
    const authUser = {
      id: userRow.id,
      username: userRow.username,
      name: userRow.name,
      role: userRow.role,
      schoolClass: userRow.school_class,
      level: userRow.level,
      coins: userRow.coins,
      points: userRow.points
    };

    // Log login activity
    await pool.query(
      `INSERT INTO activity_logs (username, student_name, activity_type, title, details) VALUES (?, ?, ?, ?, ?)`,
      [userRow.username, userRow.name, 'login', 'Masuk ke dalam sistem Jelajah Ekonomi', JSON.stringify({ role: userRow.role })]
    );

    res.json({
      success: true,
      user: authUser,
      studentData: formatted
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat login: ' + err.message });
  }
});

// 3. Get student profile & progress
app.get('/api/student/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
    }

    res.json({ success: true, data: formatStudentRecord(rows[0]) });
  } catch (err) {
    console.error('Fetch student error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Update student profile, points, level, coins & progress
app.put('/api/student/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const data = req.body;

    const [rows] = await pool.query(
      'SELECT id, name FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Siswa tidak ditemukan' });
    }

    const userId = rows[0].id;

    await pool.query(
      `UPDATE users SET
        name = COALESCE(?, name),
        school_class = COALESCE(?, school_class),
        level = COALESCE(?, level),
        xp = COALESCE(?, xp),
        xp_to_next_level = COALESCE(?, xp_to_next_level),
        coins = COALESCE(?, coins),
        points = COALESCE(?, points),
        daily_streak = COALESCE(?, daily_streak),
        quizzes_completed = COALESCE(?, quizzes_completed),
        quiz_score_sum = COALESCE(?, quiz_score_sum),
        ai_scans_verified = COALESCE(?, ai_scans_verified),
        items_bought = COALESCE(?, items_bought),
        equipped = COALESCE(?, equipped),
        inventory = COALESCE(?, inventory),
        badges = COALESCE(?, badges),
        completed_tasks = COALESCE(?, completed_tasks),
        gemini_api_key = COALESCE(?, gemini_api_key),
        updated_at = NOW()
      WHERE id = ?`,
      [
        data.name,
        data.schoolClass,
        data.level,
        data.xp,
        data.xpToNextLevel,
        data.coins,
        data.points,
        data.dailyStreak,
        data.stats?.quizzesCompleted,
        data.stats?.quizScoreSum,
        data.stats?.aiScansVerified,
        data.stats?.itemsBought,
        data.equipped ? JSON.stringify(data.equipped) : null,
        data.inventory ? JSON.stringify(data.inventory) : null,
        data.badges ? JSON.stringify(data.badges) : null,
        data.completedTasks ? JSON.stringify(data.completedTasks) : null,
        data.geminiApiKey,
        userId
      ]
    );

    res.json({ success: true, message: 'Data berhasil disimpan ke MySQL database' });
  } catch (err) {
    console.error('Save student error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Activity Logging (Tracks every process: Quiz, Photo AI, Materi, Shop)
app.post('/api/activities/log', async (req, res) => {
  try {
    const { username, studentName, activityType, title, xpEarned, coinsEarned, pointsEarned, details } = req.body;

    if (!username || !activityType || !title) {
      return res.status(400).json({ success: false, message: 'Username, activityType, dan title wajib diisi' });
    }

    await pool.query(
      `INSERT INTO activity_logs (username, student_name, activity_type, title, xp_earned, coins_earned, points_earned, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        studentName || username,
        activityType,
        title,
        xpEarned || 0,
        coinsEarned || 0,
        pointsEarned || xpEarned || 0,
        details ? JSON.stringify(details) : null
      ]
    );

    res.json({ success: true, message: 'Aktivitas berhasil dicatat di database' });
  } catch (err) {
    console.error('Log activity error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Admin Leaderboard API
app.get('/api/admin/leaderboard', async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'points'; // 'points', 'level', 'coins', 'quizzes'

    let orderByClause = 'points DESC, level DESC, xp DESC';
    if (sortBy === 'level') {
      orderByClause = 'level DESC, points DESC, xp DESC';
    } else if (sortBy === 'coins') {
      orderByClause = 'coins DESC, points DESC';
    } else if (sortBy === 'quizzes') {
      orderByClause = 'quizzes_completed DESC, points DESC';
    }

    const [rows] = await pool.query(`
      SELECT 
        id, username, name, role, school_class, level, xp, coins, points, daily_streak,
        quizzes_completed, quiz_score_sum, ai_scans_verified, items_bought,
        equipped, badges, completed_tasks, last_login, created_at, updated_at
      FROM users
      WHERE role = 'siswa'
      ORDER BY ${orderByClause}
    `);

    const leaderboard = rows.map((row, index) => {
      const formatted = formatStudentRecord(row);
      return {
        rank: index + 1,
        ...formatted
      };
    });

    // Summary statistics for Admin
    const [summaryRows] = await pool.query(`
      SELECT 
        COUNT(*) as totalStudents,
        COALESCE(MAX(points), 0) as maxPoints,
        COALESCE(MAX(level), 0) as maxLevel,
        COALESCE(AVG(level), 1) as avgLevel,
        COALESCE(SUM(quizzes_completed), 0) as totalQuizzes,
        COALESCE(SUM(ai_scans_verified), 0) as totalAiScans
      FROM users
      WHERE role = 'siswa'
    `);

    res.json({
      success: true,
      summary: summaryRows[0],
      leaderboard
    });
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 7. Admin Activity Logs Audit Trail
app.get('/api/admin/activities', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '50', 10);
    const [rows] = await pool.query(
      `SELECT id, username, student_name, activity_type, title, xp_earned, coins_earned, points_earned, details, created_at
       FROM activity_logs
       ORDER BY created_at DESC
       LIMIT ?`,
      [limit]
    );

    const formatted = rows.map(r => ({
      ...r,
      details: typeof r.details === 'string' ? JSON.parse(r.details) : r.details
    }));

    res.json({ success: true, activities: formatted });
  } catch (err) {
    console.error('Admin activities error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 8. Admin Reset All Students (user1 - user4)
app.post('/api/admin/reset-students', async (req, res) => {
  try {
    await resetAllStudents();
    res.json({ success: true, message: 'Seluruh akun siswa (user1-4) berhasil direset ke baseline awal 0' });
  } catch (err) {
    console.error('Reset students error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start Server
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Jelajah Ekonomi Backend API running on http://localhost:${PORT}`);
      console.log(`📊 Connected to MySQL database on localhost:3306 (database: jelajah_ekonomi)`);
    });
  } catch (err) {
    console.error('Failed to initialize database and start server:', err);
  }
}

start();
