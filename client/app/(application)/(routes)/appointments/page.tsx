'use client'

import { getUserIdByEmail } from '@/actions/GetUser';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
    const session = useSession()
    const router = useRouter();
    useEffect(() => {
        async function checkUser() {
            const email = session?.data?.user?.email || "";

            const userId = await getUserIdByEmail(email);
            if (!userId) { return null }
            router.push(`/appointments/${userId}`);
        }
        checkUser();
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <p>Loading</p>
        </div>
    );
}

export default Page;