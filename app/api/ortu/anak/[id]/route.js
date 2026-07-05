import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/db';
import { getTokenFromHeader, verifyToken, hashPassword } from '../../../../../lib/auth';
import crypto from 'crypto';

function authenticate(request) {
  const token = getTokenFromHeader(request);
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return { userId: decoded.id, userRole: decoded.role };
}

export async function PATCH(request, { params }) {
  try {
    const { userId } = authenticate(request);
    const { id } = params;
    const { nama_siswa, jenjang_kelas, sekolah, catatan } = await request.json();
    const setClauses = [];
    const values = [];
    let idx = 1;
    if (nama_siswa !== undefined) { setClauses.push(`nama_siswa = $${idx++}`); values.push(nama_siswa); }
    if (jenjang_kelas !== undefined) { setClauses.push(`jenjang_kelas = $${idx++}`); values.push(jenjang_kelas); }
    if (sekolah !== undefined) { setClauses.push(`sekolah = $${idx++}`); values.push(sekolah); }
    if (catatan !== undefined) { setClauses.push(`catatan = $${idx++}`); values.push(catatan); }
    if (setClauses.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data yang diupdate' }, { status: 422 });
    }
    setClauses.push(`updated_at = NOW()`);
    values.push(id, userId);
    await query(`UPDATE anak SET ${setClauses.join(', ')} WHERE id = $${idx++} AND ortu_id = $${idx}`, values);
    return NextResponse.json({ success: true, message: 'Data anak berhasil diperbarui' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = authenticate(request);
    const { id } = params;
    await query('DELETE FROM anak WHERE id = $1 AND ortu_id = $2', [id, userId]);
    return NextResponse.json({ success: true, message: 'Data anak berhasil dihapus' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { userId } = authenticate(request);
    const { id } = params;
    const { email, phone } = await request.json();
    if (!email) {
      return NextResponse.json({ message: 'Email wajib diisi' }, { status: 422 });
    }
    const generatedPassword = crypto.randomBytes(4).toString('hex');
    const hashedPwd = await hashPassword(generatedPassword);
    await query(
      'UPDATE anak SET email = $1, phone = $2, has_login = true, password = $3, updated_at = NOW() WHERE id = $4 AND ortu_id = $5',
      [email, phone || null, hashedPwd, id, userId]
    );
    return NextResponse.json({
      success: true,
      data: { email, password: generatedPassword },
    });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
