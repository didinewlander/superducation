import { redirect } from 'next/navigation'
import { findRole } from '@/lib/roles'
import { auth } from '@/auth';
import { getUserIdByEmail } from '@/actions/GetUserByEmail';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/');
  const userId = await getUserIdByEmail(session.user?.email ?? '');


  return <>{children}</>
}
