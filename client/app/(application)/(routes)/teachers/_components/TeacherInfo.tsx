
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { Teacher } from "@prisma/client"
import { db } from "@/lib/db"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderAppoint } from "./OrderAppoint"
import { ReportTeacher } from "./ReportTeacher"
import { ScrollArea } from "@/components/ui/scroll-area"

type teacherId = {
    teacherId: string
}

export default function TeacherInfo({ teacherId }: teacherId) {
    //const teacher = db.teacher.findFirst({ where: { id: teacherId } })
    return (
        
        <div className="w-full grid grid-cols-2 space-y-3">
            <div className="p-5">
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
            <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll md:overflow-hidden">
                    <div >
                        <Card>
                            <CardHeader>
                                <CardTitle>Number Of Courses</CardTitle>
                                <CardDescription>214</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <CardHeader>
                                <CardTitle>Number Of Students</CardTitle>
                                <CardDescription>10101</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-1 hidden md:block">
                        <Card>
                            <CardHeader>
                                <CardTitle>Joined</CardTitle>
                                <CardDescription>At 2024</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Latest Upload</CardTitle>
                                <CardDescription>{Date.now().toLocaleString("en-IL")}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Role</CardTitle>
                                <CardDescription>Institution Name</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <CardHeader>
                                <CardTitle>Availabilty</CardTitle>
                                <CardDescription>Medium</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card >
                            <CardHeader>
                                <CardTitle>Trending</CardTitle>
                                <CardDescription>80%</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="hidden md:block md:col-span-1"></div>

                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <OrderAppoint />
                    <ReportTeacher />
                </div>
            </div>
        </div>

    )
}

