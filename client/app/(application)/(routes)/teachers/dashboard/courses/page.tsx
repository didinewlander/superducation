import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { DataTable } from './_component/data-table'
import { columns } from './_component/columns'
import { auth } from '@/auth'

export default async function Courses() {
  const session = await auth();
  if (!session) redirect('/');

  const user = await db.user.findUnique({
    where: {  email: session.user?.email ?? undefined},
    select: { id: true },
  })

  const userId = user?.id

 

  const courses = await db.course.findMany({ where: { createdById: userId }, orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6 p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}
