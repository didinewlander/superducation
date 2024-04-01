import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import Link from "next/link"
import Image from "next/image"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Teacher</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Appointment Load</TableHead>
          <TableHead>Available Online Courses</TableHead>
          <TableHead>Overall Rating</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <div className="space-y-1">
                <h2 className="font-semibold">Dr. Janet Smith</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Harvard University</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Harvard University</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-0" variant="ghost">
                  <InfoIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div />
                <div className="grid gap-1.5">
                  <h3 className="font-semibold">Courses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Introduction to Quantum Mechanics
                    <br />
                    Quantum Physics: Concepts and Applications
                    <br />
                    Quantum Mechanics: The Strange World of Quantum Physics
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
          <TableCell>$50 - $100</TableCell>
          <TableCell>Medium</TableCell>
          <TableCell>
            <Link className="underline" href="#">
              5
            </Link>
          </TableCell>
          <TableCell>⭐️⭐️⭐️⭐️</TableCell>
          <TableCell className="text-right">
            <Link className="underline" href="#">
              Set an Appointment
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <div className="space-y-1">
                <h2 className="font-semibold">Dr. Janet Smith</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Harvard University</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Harvard University</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-0" variant="ghost">
                  <InfoIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div />
                <div className="grid gap-1.5">
                  <h3 className="font-semibold">Courses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Introduction to Quantum Mechanics
                    <br />
                    Quantum Physics: Concepts and Applications
                    <br />
                    Quantum Mechanics: The Strange World of Quantum Physics
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
          <TableCell>$50 - $100</TableCell>
          <TableCell>Medium</TableCell>
          <TableCell>
            <Link className="underline" href="#">
              5
            </Link>
          </TableCell>
          <TableCell>⭐️⭐️⭐️⭐️</TableCell>
          <TableCell className="text-right">
            <Link className="underline" href="#">
              Set an Appointment
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="flex items-center space-x-3">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <div className="space-y-1">
                <h2 className="font-semibold">Dr. Janet Smith</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Harvard University</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Harvard University</TableCell>
          <TableCell>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-0" variant="ghost">
                  <InfoIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div />
                <div className="grid gap-1.5">
                  <h3 className="font-semibold">Courses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Introduction to Quantum Mechanics
                    <br />
                    Quantum Physics: Concepts and Applications
                    <br />
                    Quantum Mechanics: The Strange World of Quantum Physics
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
          <TableCell>$50 - $100</TableCell>
          <TableCell>Medium</TableCell>
          <TableCell>
            <Link className="underline" href="#">
              5
            </Link>
          </TableCell>
          <TableCell>⭐️⭐️⭐️⭐️</TableCell>
          <TableCell className="text-right">
            <Link className="underline" href="#">
              Set an Appointment
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
