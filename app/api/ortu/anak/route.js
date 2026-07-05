import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getTokenFromHeader, verifyToken, hashPassword } from '../../../../lib/auth';
import crypto from 'crypto';

function authenticate(request) {
  const token = getTokenFromHeader(request);
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return { userId: decoded.id, userRole: decoded.role };
}

export async function GET(request) {
  try {
    const { userId } = authenticate(request);
    const result = await query('SELECT * FROM anak WHERE ortu_id = $1 ORDER BY created_at DESC', [userId]);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId } = authenticate(request);
    const { nama_siswa, jenjang_kelas, sekolah, email, phone, catatan } = await request.json();
    if (!nama_siswa) {
      return NextResponse.json({ message: 'Nama siswa wajib diisi' }, { status: 422 });
    }
    let generatedPassword = null;
    let hashedPwd = null;
    if (email) {
      generatedPassword = crypto.randomBytes(4).toString('hex');
      hashedPwd = await hashPassword(generatedPassword);
    }
    const result = await query(
      `INSERT INTO anak (ortu_id, nama_siswa, jenjang_kelas, sekolah, email, phone, catatan, password, has_login, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [userId, nama_siswa, jenjang_kelas || null, sekolah || null, email || null, phone || null, catatan || null, hashedPwd, email ? true : false]
    );
    return NextResponse.json({
      success: true,
      data: { ...result.rows[0], generated_password: generatedPassword },
    });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
