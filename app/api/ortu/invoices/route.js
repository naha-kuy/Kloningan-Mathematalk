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
      `SELECT i.*, k.nama_kelas
       FROM invoices i
       LEFT JOIN kelas k ON k.id = i.kelas_id
       WHERE i.ortu_id = $1
       ORDER BY i.created_at DESC`,
      [userId]
    );
    const total = result.rows.length;
    return NextResponse.json({
      success: true,
      data: { data: result.rows, current_page: 1, last_page: 1, total },
    });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
