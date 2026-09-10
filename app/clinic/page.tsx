import { cookies } from 'next/headers';
import Login from './login';
import Clinic from './workspace';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('tap_session');
  
  if (!session?.value) {
    return <Login />;
  }
  
  return <Clinic />;
}
