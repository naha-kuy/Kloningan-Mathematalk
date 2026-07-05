import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/db';
import { getTokenFromHeader, verifyToken } from '../../../../../lib/auth';

function authenticate(request) {
  const token = getTokenFromHeader(request);
  if (!token) throw new Error('Unauthorized');
  const decoded = verifyToken(token);
  return { userId: decoded.id, userRole: decoded.role };
}

export async function POST(request, { params }) {
  try {
    const { userId } = authenticate(request);
    const { id } = params;
    const invoice = await query('SELECT * FROM invoices WHERE id = $1 AND ortu_id = $2', [id, userId]);
    if (invoice.rows.length === 0) {
      return NextResponse.json({ message: 'Invoice tidak ditemukan' }, { status: 404 });
    }
    await query('UPDATE invoices SET status = $1, paid_at = NOW() WHERE id = $2', ['lunas', id]);
    return NextResponse.json({ success: true, message: 'Pembayaran berhasil dikonfirmasi' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
