'use client'
import { getUser } from '@/actions/GetUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NameForm from './_components/name-form';

function WelcomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      if (status === 'loading') return;  // Wait until the session is not loading
      const email = session?.user?.email;
      if (!email) {
        // Redirect if there is no email (user not logged in)
        router.push('/');
        return;
      }

      // Fetch user from the database
      const user = getUser(email);

      if (!user) {
        router.push('/');
        return;
      }
    }

    checkUser();
  }, [session, status, router]);

  // Assuming the checks pass, render the welcome message
  return (
    <div className='p-4 m-auto'>
      <div className='items-center'>
        <h1>Welcome to Superducation</h1>
        <p>
          {"We've noticed you haven't created a profile yet. Please fill out the form below to get started."}
        </p>
        <NameForm />
      </div>
    </div>
  );
}

export default WelcomePage;
