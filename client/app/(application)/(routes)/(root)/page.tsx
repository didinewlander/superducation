import React from 'react'
import { InfoCard } from './_components/InfoCard'
import { CheckCircle, Clock } from 'lucide-react'
import { CoursesList } from '@/components/courses-list'
import { getDashboardCourses } from '@/actions/GetDashboardCourses'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function Page() {
  const session = await auth();
  if (!session) { redirect('/'); }
  const { completedCourses, coursesInProgress } = await getDashboardCourses(session?.user?.email || '');

  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard icon={CheckCircle} label="Completed" numberOfItems={completedCourses.length} variant="success" />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}

