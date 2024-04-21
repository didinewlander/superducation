import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import Link from "next/link"
import Image from "next/image"
import { JSX, SVGProps } from "react"


import { Teacher, columns } from "./_components/columns"
import { DataTable } from "./_components/TableData"

async function getData(): Promise<Teacher[]> {
  return [
    {
      id: "1",
      name: "Dr. Janet Bmith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 250,
    },
    {
      id: "2",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 200,

    },      
    {
      id: "3",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      price: 100,
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Dr. Hadas Shor",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 150,
    },
    {
      id: "5",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 300,
    },
    {
      id: "1",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 250,
    },
    {
      id: "2",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 200,

    },      
    {
      id: "3",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      price: 100,
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 150,
    },
    {
      id: "5",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 300,
    },
    {
      id: "1",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 250,
    },
    {
      id: "2",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 200,

    },      
    {
      id: "3",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      price: 100,
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 150,
    },
    {
      id: "5",
      name: "Dr. Janet Smith",
      institution: {
        name: "Harvard University",
        link: "#"
      },
      suggestions: 5,
      courses: [
        {
          name: "Introduction to Quantum Mechanics",
          link: "#"
        },
        {
          name: "Quantum Physics: Concepts and Applications",
          link: "#"
        },
        {
          name: "Quantum Mechanics: The Strange World of Quantum Physics",
          link: "#"
        }
      ],
      imageUrl: "/placeholder.svg",
      price: 300,
    },
  ]
}
export default async function TeacherTable() {

  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
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
