
import NextTopLoader from "nextjs-toploader";
import { Institute, columns } from "./_components/columns"
import { DataTable } from "./_components/TableData"
import { getAllTeachers } from "@/actions/GetTeacher"
import { auth } from "@/auth";
import { getUserIdByEmail } from "@/actions/GetUser";
import { redirect } from "next/navigation";
import { getAllInstitutions } from "@/actions/GetInstitutions";

async function getData(): Promise<Institute[]> {
  const institutions = await getAllInstitutions();
  if (!institutions) return [];
  return institutions;
}
export default async function InstitutionTable() {
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
