import { redirect } from 'next/navigation'
import { auth } from '@/auth';
import { getUserIdByEmail } from '@/actions/GetUser';
import NextTopLoader from 'nextjs-toploader';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/');
  const userId = await getUserIdByEmail(session.user?.email ?? '');


  return <>                <NextTopLoader showSpinner={false} easing="ease" />
    {children}</>
}
