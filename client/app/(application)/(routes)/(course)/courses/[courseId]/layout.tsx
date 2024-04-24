import { redirect } from 'next/navigation'
import db from '@/lib/db'

import CourseNavbar from './_components/course-navbar'
import CourseSidebar from './_components/course-sidebar'
import { getProgress } from '@/actions/GetProgress'
import { auth } from '@/auth'
import { getUserIdByEmail } from '@/actions/GetUser'

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { courseId: string }
}) {
    const session = await auth();
    if (!session) redirect('/');
    const userId = await getUserIdByEmail(session.user?.email ?? '');
    
    const course = await db.course.findUnique({
        where: { id: params.courseId },
        include: {
            chapters: {
                where: { isPublished: true },
                include: { userProgress: { where: { userId } } },
                orderBy: { position: 'asc' },
            },
        },
    })

    if (!course) {
        return redirect('/')
    }

    const progressCount = await getProgress(userId ?? '', course.id)

    return (
        <div className="h-full">
            <div className="fixed inset-y-0 z-50 h-20 w-full md:pl-80">
                <CourseNavbar course={course} progressCount={progressCount} />
            </div>

            <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
                <CourseSidebar course={course} progressCount={progressCount} />
            </div>

            <main className="h-full pt-20 md:pl-80">{children}</main>
        </div>
    )
}
