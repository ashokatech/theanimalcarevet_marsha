import crypto from 'crypto';

export function verifyPin(pin: string): boolean {
  const clinicPin = process.env.CLINIC_PIN;
  return !!clinicPin && pin === clinicPin;
}

export function createSessionCookie(): string {
  const secret = process.env.SESSION_SECRET || 'tap_default_secret_2026';
  return crypto.createHmac('sha256', secret).update('session').digest('hex');
}

export function getSessionFromCookies(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const expectedSession = createSessionCookie();
  return cookieHeader.includes(`tap_session=${expectedSession}`);
}
