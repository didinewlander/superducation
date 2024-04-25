
import NextTopLoader from "nextjs-toploader";
import { Teacher, columns } from "./_components/columns"
import { DataTable } from "./_components/TableData"
import { getAllTeachers } from "@/actions/GetTeacher"
import { auth } from "@/auth";
import { getUserIdByEmail } from "@/actions/GetUser";
import { redirect } from "next/navigation";

async function getData(): Promise<Teacher[]> {
  const teachers = await getAllTeachers();
  if (!teachers) return [];
  return teachers;
}
export default async function TeacherTable() {
  const session = await auth();
  if (!session) return redirect('/');

  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <NextTopLoader showSpinner={false} easing="ease" />

      <DataTable columns={columns} data={data} />
    </div>
  )
}
