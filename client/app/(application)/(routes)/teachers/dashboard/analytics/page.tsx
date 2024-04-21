import { redirect } from 'next/navigation'
import DataCard from './_components/data-card'
import Chart from './_components/chart'
import { getAnalytics } from '@/actions/GetAnalytics'
import { auth } from '@/auth'
import { getUserIdByEmail } from '@/actions/GetUser'

export default async function Analytics() {
  const session = await auth();
  if (!session) redirect('/');
  const userId = await getUserIdByEmail(session.user?.email ?? '');

  const { data, totalRevenue, totalSales } = await getAnalytics(userId ?? '')

  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>

      <Chart data={data} />
    </div>
  )
}
