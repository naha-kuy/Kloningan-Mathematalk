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
    const activeClasses = await query(
      `SELECT k.*, e.id as enrollment_id, e.status as enrollment_status
       FROM enrollments e
       JOIN kelas k ON k.id = e.kelas_id
       WHERE e.ortu_id = $1 AND e.status = 'active'`,
      [userId]
    );
    const pendingInvoices = await query(
      `SELECT i.*, k.nama_kelas
       FROM invoices i
       LEFT JOIN kelas k ON k.id = i.kelas_id
       WHERE i.ortu_id = $1 AND i.status IN ('menunggu', 'terkirim', 'overdue')`,
      [userId]
    );
    return NextResponse.json({
      success: true,
      data: { active_classes: activeClasses.rows, pending_invoices: pendingInvoices.rows },
    });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
