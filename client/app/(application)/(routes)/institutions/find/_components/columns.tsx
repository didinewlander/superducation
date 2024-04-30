"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, Globe, MoreHorizontal, Phone, User } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import InstituteInfo from "./TeacherInfo"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Institute = {
  id: string
  name: string
  website: string
  phoneNumber: string
  income: number
  students: {
    name: string
    studentId: string
    email: string
    phoneNumber: string
    overallRating: number
    appointmentLoad: number
    numberOfCourses: number
  }
  courses: {
    title: string
    link: string
    /**
    *
    * Fetch the data where progress is less than 100 from all students enrolled in this course
    * @tutorial fetch courses-> students for each student -> fetch progress -> filter progress less than 100
    * @returns Student count (number)
    */
    numberOfStudentsActive: number
    courseRating: number
  }
  teachers: {
    name: string
    teacherId: string
    overallRating: number
    appointmentLoad: number
    numberOfCourses: number
  }
}

export type InstituteMinimumDetail =
  {
    id: string
    name: string
    website: string
    phoneNumber: string
    overallRating: number
    numberOfStudents: number
  };

export const columns: ColumnDef<InstituteMinimumDetail>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex w-full justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const website = row.getValue("website") as Institute['website'];
      return (
        <Link href={website ?? ""} target="_blank"  className="flex gap-2 items-center"
        >
          <Globe height={14} />
          {website ?? <i>No Link Available</i>}
        </Link>
      )
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as Institute['phoneNumber'];
      return (

        <Link
          href={`tel:${phoneNumber}`}
          className="flex gap-2 items-center"
        >
          <Phone height={14} />
          {phoneNumber}

        </Link>
      )
    }
  },

  {
    accessorKey: "numberOfStudents",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number Of Students
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "overallRating",
    header: "Avg. Rating",
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const institute = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`Phone: ${institute.phoneNumber} ,Website: ${institute.website}`)}
            >
              Copy contact info
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"> <Link href={`/institutions/${row.original.id}`}>Take me to institue page</Link>
              <ExternalLink size={16} /></DropdownMenuItem>
            <DropdownMenuItem>Add Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
