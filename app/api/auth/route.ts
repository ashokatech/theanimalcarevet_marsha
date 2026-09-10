import { NextResponse } from 'next/server';
import { verifyPin, createSessionCookie } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    
    if (verifyPin(pin)) {
      const sessionValue = createSessionCookie();
      
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'tap_session',
        value: sessionValue,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 86400 // 24h
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('tap_session');
  return NextResponse.json({ success: true });
}
