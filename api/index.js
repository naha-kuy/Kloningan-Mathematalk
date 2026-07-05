require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { query, getClient } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'mathematalk-jwt-secret-2026';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Auth Middleware ────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ─── Auth Routes ────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(422).json({ message: 'Email atau password salah' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(422).json({ message: 'Email atau password salah' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email } } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.post('/api/logout', authMiddleware, (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

app.post('/api/auth/change-password', authMiddleware, async (req, res) => {
  try {
    const { current_password, password, password_confirmation } = req.body;
    if (password !== password_confirmation) {
      return res.status(422).json({ message: 'Konfirmasi password tidak cocok', errors: { password_confirmation: 'Konfirmasi password tidak cocok' } });
    }
    const result = await query('SELECT password FROM users WHERE id = $1', [req.userId]);
    const valid = await bcrypt.compare(current_password, result.rows[0].password);
    if (!valid) {
      return res.status(422).json({ message: 'Password saat ini salah', errors: { current_password: 'Password saat ini salah' } });
    }
    const hash = await bcrypt.hash(password, 10);
    await query('UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2', [hash, req.userId]);
    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Ortu Profile ───────────────────────────────────────────────────────
app.get('/api/v1/ortu/profile', authMiddleware, async (req, res) => {
  try {
    const result = await query('SELECT id, name, email, phone, address, city, province, postal_code, emergency_contact_name, emergency_contact_phone, occupation, notes FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.patch('/api/v1/ortu/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address, city, province, postal_code, emergency_contact_name, emergency_contact_phone, occupation, notes } = req.body;
    await query(
      `UPDATE users SET name=$1, email=$2, phone=$3, address=$4, city=$5, province=$6, postal_code=$7, emergency_contact_name=$8, emergency_contact_phone=$9, occupation=$10, notes=$11, updated_at=NOW() WHERE id=$12`,
      [name, email, phone, address, city, province, postal_code, emergency_contact_name, emergency_contact_phone, occupation, notes, req.userId]
    );
    res.json({ success: true, message: 'Profil berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Ortu Anak ──────────────────────────────────────────────────────────
app.get('/api/v1/ortu/anak', authMiddleware, async (req, res) => {
  try {
    const result = await query('SELECT * FROM anak WHERE ortu_id = $1 ORDER BY created_at DESC', [req.userId]);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.post('/api/v1/ortu/anak', authMiddleware, async (req, res) => {
  try {
    const { nama_siswa, jenjang_kelas, sekolah, email, phone, catatan } = req.body;
    if (!nama_siswa) return res.status(422).json({ message: 'Nama siswa wajib diisi' });
    const generatedPassword = email ? Math.random().toString(36).slice(-8) : '';
    const hash = generatedPassword ? await bcrypt.hash(generatedPassword, 10) : '';
    const result = await query(
      `INSERT INTO anak (ortu_id, nama_siswa, jenjang_kelas, sekolah, email, phone, catatan, has_login, password)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.userId, nama_siswa, jenjang_kelas || 'SD', sekolah || '', email || '', phone || '', catatan || '', !!generatedPassword, hash]
    );
    const data = result.rows[0];
    if (generatedPassword) data.password = generatedPassword;
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.patch('/api/v1/ortu/anak/:id', authMiddleware, async (req, res) => {
  try {
    const { nama_siswa, jenjang_kelas, sekolah, catatan } = req.body;
    await query(
      `UPDATE anak SET nama_siswa=$1, jenjang_kelas=$2, sekolah=$3, catatan=$4, updated_at=NOW() WHERE id=$5 AND ortu_id=$6`,
      [nama_siswa, jenjang_kelas, sekolah, catatan, req.params.id, req.userId]
    );
    res.json({ success: true, message: 'Data anak berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.delete('/api/v1/ortu/anak/:id', authMiddleware, async (req, res) => {
  try {
    await query('DELETE FROM anak WHERE id = $1 AND ortu_id = $2', [req.params.id, req.userId]);
    res.json({ success: true, message: 'Data anak berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.post('/api/v1/ortu/anak/:id/upgrade', authMiddleware, async (req, res) => {
  try {
    const { email, phone } = req.body;
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(generatedPassword, 10);
    await query(
      `UPDATE anak SET email=$1, phone=$2, has_login=true, password=$3, updated_at=NOW() WHERE id=$4 AND ortu_id=$5`,
      [email || '', phone || '', hash, req.params.id, req.userId]
    );
    res.json({ success: true, data: { email: email || '', password: generatedPassword } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Ortu Dashboard ─────────────────────────────────────────────────────
app.get('/api/v1/ortu/dashboard', authMiddleware, async (req, res) => {
  try {
    const activeClasses = await query(
      `SELECT k.*, e.id as enrollment_id, e.status as enrollment_status
       FROM enrollments e
       JOIN kelas k ON k.id = e.kelas_id
       WHERE e.ortu_id = $1 AND e.status = 'active'`,
      [req.userId]
    );
    const pendingInvoices = await query(
      `SELECT i.*, k.nama_kelas FROM invoices i
       LEFT JOIN kelas k ON k.id = i.kelas_id
       WHERE i.ortu_id = $1 AND i.status IN ('menunggu', 'terkirim', 'overdue')`,
      [req.userId]
    );
    res.json({
      success: true,
      data: {
        active_classes: activeClasses.rows,
        pending_invoices: pendingInvoices.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Ortu Kelas ─────────────────────────────────────────────────────────
app.get('/api/v1/ortu/kelas', authMiddleware, async (req, res) => {
  try {
    const result = await query(
      `SELECT k.*, e.id as enrollment_id, e.status as enrollment_status,
              i.id as invoice_id, i.status as payment_status, i.total_tagihan, i.nomor_invoice
       FROM enrollments e
       JOIN kelas k ON k.id = e.kelas_id
       LEFT JOIN invoices i ON i.enrollment_id = e.id
       WHERE e.ortu_id = $1
       ORDER BY e.created_at DESC`,
      [req.userId]
    );
    const items = result.rows.map(r => ({
      id: r.id,
      nama_kelas: r.nama_kelas,
      jenjang_kelas: r.jenjang_kelas,
      jenis_kelas: r.jenis_kelas,
      tipe_kelas: r.tipe_kelas,
      guru_nama: r.guru_nama,
      tanggal_mulai: r.tanggal_mulai,
      kapasitas_max: r.kapasitas_max,
      current_students: r.current_students,
      is_paid: r.payment_status === 'lunas' || r.payment_status === null,
      payment_status: r.payment_status || 'no_invoice',
      invoice: r.invoice_id ? {
        id: r.invoice_id,
        nomor_invoice: r.nomor_invoice,
        total_tagihan: r.total_tagihan,
      } : null,
    }));
    res.json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Ortu Invoices ──────────────────────────────────────────────────────
app.get('/api/v1/ortu/invoices', authMiddleware, async (req, res) => {
  try {
    const result = await query(
      `SELECT i.*, json_build_object('nama_kelas', k.nama_kelas, 'guru', json_build_object('name', k.guru_nama)) as kelas
       FROM invoices i
       LEFT JOIN kelas k ON k.id = i.kelas_id
       WHERE i.ortu_id = $1
       ORDER BY i.created_at DESC`,
      [req.userId]
    );
    res.json({
      success: true,
      data: {
        data: result.rows,
        current_page: 1,
        last_page: 1,
        total: result.rows.length,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

app.post('/api/v1/ortu/invoices/:id/pay', authMiddleware, async (req, res) => {
  try {
    // Simulate payment - in production, integrate with DOKU/Payment Gateway
    const invoice = await query('SELECT * FROM invoices WHERE id = $1 AND ortu_id = $2', [req.params.id, req.userId]);
    if (invoice.rows.length === 0) return res.status(404).json({ message: 'Invoice not found' });
    await query('UPDATE invoices SET status = $1, paid_at = NOW(), updated_at = NOW() WHERE id = $2', ['lunas', req.params.id]);
    res.json({ success: true, message: 'Pembayaran berhasil' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Public Routes ──────────────────────────────────────────────────────
app.get('/api/v1/public/provinces', async (req, res) => {
  try {
    const result = await query('SELECT id, name FROM provinces ORDER BY name');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// ─── Health Check ───────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start (local dev) ──────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
