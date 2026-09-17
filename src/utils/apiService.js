/**
 * API Service for Jelajah Ekonomi Backend (MySQL)
 */

const BASE_URL = ''; // Relative URL leverages Vite proxy (/api)

export async function loginUserApi(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API login failed, falling back to local:', err);
    return null;
  }
}

export async function fetchStudentDataApi(username) {
  try {
    const res = await fetch(`${BASE_URL}/api/student/${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.warn(`Failed to fetch student data for ${username} from MySQL:`, err);
    return null;
  }
}

export async function saveStudentDataApi(data, username) {
  if (!username && !data?.username) return false;
  const targetUser = username || data.username;

  try {
    const res = await fetch(`${BASE_URL}/api/student/${encodeURIComponent(targetUser)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    return json.success;
  } catch (err) {
    console.warn(`Failed to save student data to MySQL for ${targetUser}:`, err);
    return false;
  }
}

export async function logActivityApi({ username, studentName, activityType, title, xpEarned, coinsEarned, pointsEarned, details }) {
  try {
    await fetch(`${BASE_URL}/api/activities/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        studentName,
        activityType,
        title,
        xpEarned: xpEarned || 0,
        coinsEarned: coinsEarned || 0,
        pointsEarned: pointsEarned || xpEarned || 0,
        details
      })
    });
  } catch (err) {
    console.warn('Failed to log activity to MySQL:', err);
  }
}

export async function fetchLeaderboardApi(sortBy = 'points') {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leaderboard?sortBy=${encodeURIComponent(sortBy)}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Failed to fetch leaderboard from MySQL:', err);
    return null;
  }
}

export async function fetchAdminActivitiesApi(limit = 50) {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/activities?limit=${limit}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.success ? json.activities : [];
  } catch (err) {
    console.error('Failed to fetch activity logs from MySQL:', err);
    return [];
  }
}

export async function resetAllStudentsApi() {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/reset-students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Failed to reset students in MySQL:', err);
    return { success: false, message: err.message };
  }
}
