import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { comparePassword, signToken } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 422 });
    }
    const user = result.rows[0];
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 422 });
    }
    const token = signToken({ id: user.id, role: user.role });
    return NextResponse.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
