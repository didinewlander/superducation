"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, MoreHorizontal } from "lucide-react"

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
  name: string
  institution: {
    name: string
    link: string
  }
  suggestions: number
  courses: Array<{
    name: string,
    link: string
  }>
  imageUrl: string
  price: number
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Drawer>
        <DrawerTrigger>{row.original.name}</DrawerTrigger>
        <DrawerContent>
          <TeacherInfo teacherId={row.original.id} />

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
    accessorKey: "Courses",
    header: "Courses",
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
            <DropdownMenuItem className="gap-2"> <Link href={`/teachers/appointments?id=${teacher.id}`} target="_blank">Take me there</Link>
              <ExternalLink size={16}/></DropdownMenuItem>
            <DropdownMenuItem>Add Review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
