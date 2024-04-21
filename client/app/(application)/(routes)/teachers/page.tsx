
import { Teacher, columns } from "./_components/columns"
import { DataTable } from "./_components/TableData"
import { getAllTeachers } from "@/actions/GetTeacher"

async function getData(): Promise<Teacher[]> {
  const teachers = await getAllTeachers();
  if (!teachers) return [];
  return teachers;
}
export default async function TeacherTable() {

  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
