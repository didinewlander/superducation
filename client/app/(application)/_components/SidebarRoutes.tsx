"use client"

import { BarChart, BookCopy, CalendarCheck, CandlestickChart, Compass, DoorOpen, ExternalLink, Github, Layers3, Layout, List, MonitorPlay, School, UserSearch } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { findRole } from "@/lib/roles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const guestRoutes = [
    {
        icon: BookCopy,
        label: "Start Studying",
        href: "/search"
    },
    {
        icon: Compass,
        label: "Find Teacher",
        href: "/teachers/find"
    },
    {
        icon: School,
        label: "Browse Institutions",
        href: "/institutions/find"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teachers/courses"
    },
    {
        icon: CalendarCheck,
        label: "Appointments",
        href: "/appointments/"
    }
    ,
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teachers/analytics"
    },
]

const studentAndTeacherRoutes = [
    {
        icon: BookCopy,
        label: "Start Studying",
        href: "/search"
    },
    {
        icon: Compass,
        label: "Find Teacher",
        href: "/teachers/find"
    },

    {
        icon: School,
        label: "Browse Institutions",
        href: "/institutions/find"
    },
    {
        icon: List,
        label: "My Courses",
        href: "/teachers/courses"
    },
    {
        icon: CalendarCheck,
        label: "Appointments",
        href: "/appointments/"
    }
    ,
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teachers/analytics"
    },



]

const institutionRoutes = [
    {
        icon: Layers3,
        label: "Management",
        href: "/institutions/management"
    },
    {
        icon: MonitorPlay,
        label: "Courses",
        href: "/institutions/courses"
    },
    {
        icon: CandlestickChart,
        label: "Analytics",
        href: "/institution/analytics"
    }

]
export const SidebarRoutes = () => {
    const session = useSession();
    if (!session) { redirect('/'); }
    const role = findRole(session.data?.user?.email);

    const isStudentPage = (role === "student");
    const isTeacherPage = (role === "teacher");
    const isTeacherAndStudentPage = (role === "both");
    const isInstructorPage = (role === "institution");
    const routes = isTeacherPage ? teacherRoutes
        : isStudentPage ? guestRoutes
            : isInstructorPage ? institutionRoutes
                : isTeacherAndStudentPage ? studentAndTeacherRoutes : [];
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href} />)
            )}
            <div className="flex justify-center mt-20 bottom-0">
                <Link href="mailto:ydidya.n@gmail.com" target="_blank">
                    <Button className="flex">
                        Report a bug / feature
                    </Button>
                </Link>
            </div>
            <p className="m-4 text-center text-sm italic font-light">And help this project improve</p>

        </div>
    );
}