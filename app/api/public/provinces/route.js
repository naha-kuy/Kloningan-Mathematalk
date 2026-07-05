import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT id, name FROM provinces ORDER BY name');
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 });
  }
}
