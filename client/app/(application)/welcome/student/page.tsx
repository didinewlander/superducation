import { BothForm } from "../_components/both-form"
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from '@/lib/db'


export default async function BothPage() {
    const session = await auth();
    if (!session) redirect('/');

    const institutions = await db.institute.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    if (!institutions) { return redirect('/'); }

    return (
        <div className='p-4 m-auto'>
            <div className='items-center'>
                <h1>Welcome to Superducation</h1>
                <p>
                    Here you will fill all the additional data about yourself as a student and a teacher
                </p>
                <BothForm institutions={institutions} />
            </div>
        </div>
    )
}

