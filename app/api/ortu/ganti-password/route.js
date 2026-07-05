import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getTokenFromHeader, verifyToken, comparePassword, hashPassword } from '../../../../lib/auth';

function authenticate(request) {
  const token = getTokenFromHeader(request);
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return { userId: decoded.id, userRole: decoded.role };
}

export async function POST(request) {
  try {
    const { userId } = authenticate(request);
    const { current_password, password, password_confirmation } = await request.json();
    if (!current_password || !password || !password_confirmation) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 422 });
    }
    if (password !== password_confirmation) {
      return NextResponse.json({ message: 'Password dan konfirmasi password tidak cocok' }, { status: 422 });
    }
    const user = await query('SELECT password FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }
    const valid = await comparePassword(current_password, user.rows[0].password);
    if (!valid) {
      return NextResponse.json({ message: 'Password saat ini salah' }, { status: 422 });
    }
    const hashedPassword = await hashPassword(password);
    await query('UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2', [hashedPassword, userId]);
    return NextResponse.json({ success: true, message: 'Password berhasil diubah' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
