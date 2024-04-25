"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, MoreHorizontal, User } from "lucide-react"

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
import TeacherInfo from "./TeacherInfo"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Teacher = {
  id: string
  gender: string
  name: string
  institution: {
    name: string
    website: string
  }
  joinedDate: Date
  role: string
  suggestions: {
    courseId: string
    description: string
    title: string
  }[]
  rating: number
  courses: Array<{
    title: string,
    link: string
  }>
  priceRange: string
  appointmentLoad: number
  latestUpload: Date
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Drawer>
        <DrawerTrigger className="flex gap-2"><User color={row.original.gender == "1" ? "#40b5e7" : row.original.gender == "2" ? "#dc40e7" : "black"} />{row.original.name}</DrawerTrigger>
        <DrawerContent>
          <TeacherInfo teacher={row.original} />

        </DrawerContent>
      </Drawer>
    ),
  },
  {
    accessorKey: "institution",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Institution
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const institution = row.getValue("institution") as Teacher['institution'];
      return (
        <Link href={institution.website ?? ""} target="_blank">
          {institution.name ?? ""}
        </Link>
      )
    }
  },
  {
    accessorKey: "courses",
    header: "Courses",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "appointment Load",
    header: "Appointment Load",
  },
  
  {
    accessorKey: "rating",
    header: "Avg. Rating",
  },
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original

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
              onClick={() => navigator.clipboard.writeText(teacher.name)}
            >
              Copy contact info
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2"> <Link href={`/appointments/${teacher.id}`} target="_blank">Take me there</Link>
              <ExternalLink size={16} /></DropdownMenuItem>
            <DropdownMenuItem>Add Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
