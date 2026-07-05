import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { name, email, password, password_confirmation, phone } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Nama, email, dan password wajib diisi' }, { status: 422 });
    }
    if (password !== password_confirmation) {
      return NextResponse.json({ message: 'Password dan konfirmasi password tidak cocok' }, { status: 422 });
    }
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 422 });
    }
    const hashedPassword = await hashPassword(password);
    const result = await query(
      'INSERT INTO users (name, email, password, phone, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id, name, email',
      [name, email, hashedPassword, phone || null, 'ortu']
    );
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
