import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {db} from "@/lib/db"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderAppoint } from "./OrderAppoint"
import { ReportTeacher } from "./ReportTeacher"
import { getTeacher } from "@/actions/GetTeacher"
import { useEffect, useState } from "react"
import { Appointment, Course, Institute, User } from "@prisma/client"
import { Teacher } from "./columns"


type TeacherWithDetails = Teacher & {
    user: User | null;
    institution: Institute | null;
    courses: Course[];
    appointments: Appointment[];
};
const TeacherInfo = ({ teacher }: { teacher: Teacher }) => {

    return (
        <div className="w-full grid grid-cols-2 space-y-3">
            <div className="p-5">
                <div className="grid items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold">{teacher.name || "No Name"}</h1>
                            <div className="flex items-center space-x-2 text-sm">
                                <div className="w-4 h-4 flex-shrink-0 fill-current" />
                                <span className="font-medium">5.0</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">(245 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid items-center gap-1 text-sm">
                        <span className="font-medium">Courses:</span>
                        <span>{teacher.courses.map(course => course.title).join(", ") || "No Courses"}</span>
                    </div>
                </div>
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Institution:</span>
                    <span>{teacher.institution?.name || "No Institution"}</span>
                </div>
               
                <div className="grid items-center gap-1 text-sm">
                    <span className="font-medium">Price range:</span>
                    <span>{teacher.priceRange}</span>
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
            <div className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll md:overflow-hidden">
                    <div>
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
                                <CardDescription></CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-1 hidden md:block">
                        <Card>
                            <CardHeader>
                                <CardTitle>Joined At</CardTitle>
                                <CardDescription>
                                {`${(teacher.joinedDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${teacher.joinedDate.getUTCFullYear()}`}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Latest Upload</CardTitle>
                                <CardDescription>
                                    {`${teacher.latestUpload.getUTCDate().toString().padStart(2, '0')}/${(teacher.joinedDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${teacher.joinedDate.getUTCFullYear()}`}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Works as: {teacher.role}</CardTitle>
                                <CardDescription>{teacher.institution.name}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <CardHeader>
                                <CardTitle>Availabilty</CardTitle>
                                <CardDescription>{teacher.appointmentLoad}%</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card >
                            <CardHeader>
                                <CardTitle>Trending</CardTitle>
                                <CardDescription>{teacher.appointmentLoad}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="hidden md:block md:col-span-1"></div>

                </div>
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <OrderAppoint id={teacher.id} />
                        <ReportTeacher />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherInfo;
