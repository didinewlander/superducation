
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { Teacher } from "@prisma/client"
import { db } from "@/lib/db"

type teacherId = {
    teacherId: string
}

export default function TeacherInfo({ teacherId }: teacherId) {
    const teacher = db.teacher.findFirst({ where: { id: teacherId } })
    return (
        <div className="w-full space-y-6">
            <div className="space-y-4">
                <div className="grid items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                            <Image
                                alt="Avatar"
                                className="rounded-full"
                                height="48"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "48/48",
                                    objectFit: "cover",
                                }}
                                width="48"
                            />
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold">Dr. Alice Johnson</h1>
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <span className="font-medium">5.0</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">(245 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid items-center gap-1 text-sm">
                        <span className="font-medium">Courses:</span>
                        <span>Physics, Quantum Mechanics, Thermodynamics</span>
                    </div>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Institution:</span>
                    <span>Harvard University</span>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Field of expertise:</span>
                    <span>Physics</span>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Price range:</span>
                    <span>$50.00 - $150.00</span>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Appointment load:</span>
                    <span>High</span>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Courses on platform:</span>
                    <span>10</span>
                </div>
            </div>
            <div className="grid items-center gap-4">
                <Button size="lg">Set an appointment</Button>
                <Button size="lg" variant="outline">
                    Report teacher
                </Button>
            </div>
        </div>
    )
}

