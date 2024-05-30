import { redirect } from 'next/navigation'
import { db } from '@/lib/db'


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
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full">
                {children}
            </main>
        </div>
    )
}
