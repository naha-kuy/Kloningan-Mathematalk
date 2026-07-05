import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getTokenFromHeader, verifyToken } from '../../../../lib/auth';

function authenticate(request) {
  const token = getTokenFromHeader(request);
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return { userId: decoded.id, userRole: decoded.role };
}

export async function GET(request) {
  try {
    const { userId } = authenticate(request);
    const result = await query(
      'SELECT id, name, email, phone, address, city, province, postal_code, emergency_contact_name, emergency_contact_phone, occupation, notes FROM users WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { userId } = authenticate(request);
    const body = await request.json();
    const allowedFields = ['name', 'email', 'phone', 'address', 'city', 'province', 'postal_code', 'emergency_contact_name', 'emergency_contact_phone', 'occupation', 'notes'];
    const setClauses = [];
    const values = [];
    let idx = 1;
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        setClauses.push(`${field} = $${idx++}`);
        values.push(body[field]);
      }
    }
    if (setClauses.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data yang diupdate' }, { status: 422 });
    }
    setClauses.push(`updated_at = NOW()`);
    values.push(userId);
    await query(`UPDATE users SET ${setClauses.join(', ')} WHERE id = $${idx}`, values);
    return NextResponse.json({ success: true, message: 'Profil berhasil diperbarui' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
