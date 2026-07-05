import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const { name, email, password, password_confirmation, phone } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'Nama lengkap wajib diisi', errors: { name: 'Nama wajib diisi' } }, { status: 422 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ message: 'Email wajib diisi', errors: { email: 'Email wajib diisi' } }, { status: 422 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Format email tidak valid', errors: { email: 'Format email tidak valid' } }, { status: 422 });
    }
    if (!password) {
      return NextResponse.json({ message: 'Password wajib diisi', errors: { password: 'Password wajib diisi' } }, { status: 422 });
    }
    if (password.length < 8) {
      return NextResponse.json({ message: 'Password minimal 8 karakter', errors: { password: 'Minimal 8 karakter' } }, { status: 422 });
    }
    if (password !== password_confirmation) {
      return NextResponse.json({ message: 'Password dan konfirmasi password tidak cocok', errors: { password_confirmation: 'Tidak cocok' } }, { status: 422 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: 'Email sudah terdaftar, silakan gunakan email lain atau masuk', errors: { email: 'Email sudah terdaftar' } }, { status: 422 });
    }

    const hashedPassword = await hashPassword(password);
    const result = await query(
      `INSERT INTO users (name, email, password, phone, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'ortu', NOW(), NOW())
       RETURNING id, name, email`,
      [name.trim(), normalizedEmail, hashedPassword, phone || null]
    );

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan server. Silakan coba lagi.' }, { status: 500 });
  }
}
