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
      `SELECT e.*, k.*, i.id as invoice_id, i.status as payment_status, i.nominal as invoice_nominal, i.due_date as invoice_due_date
       FROM enrollments e
       JOIN kelas k ON k.id = e.kelas_id
       LEFT JOIN invoices i ON i.enrollment_id = e.id
       WHERE e.ortu_id = $1
       ORDER BY e.created_at DESC`,
      [userId]
    );
    const data = result.rows.map((row) => ({
      ...row,
      is_paid: row.payment_status === 'lunas',
      payment_status: row.payment_status || null,
      invoice: row.invoice_id
        ? { id: row.invoice_id, status: row.payment_status, nominal: row.invoice_nominal, due_date: row.invoice_due_date }
        : null,
    }));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
