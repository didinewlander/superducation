import { auth } from "@/auth";
import { db } from '@/lib/db'

import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await auth();
    if (!session) { redirect('/'); }
    const user = await db.user.findUnique({
        where: { email: session.user?.email ?? "" },
        include: {
            student: true,
            teacher: true,
            institute: true,
            role: true
        }
    })
    if (!user) { return redirect('/') };

    const requiredFields = [
        user.phone,
    ]
    return (
        <div className="p-4 w-full m-auto">

        </div>
    );
}
export default DashboardPage;