export const dynamic = 'force-dynamic';

import main from '@/scripts/migrate';
import { NextResponse } from 'next/server';

export async function GET() {
  await main();
  return NextResponse.json({ message: 'success' });
}
