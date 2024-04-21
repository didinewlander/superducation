"use client"

import { BarChart, BookCopy, CalendarCheck, CandlestickChart, Compass, DoorOpen, ExternalLink, Github, Layers3, Layout, List, MonitorPlay, School, UserSearch } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { findRole } from "@/lib/roles";
const guestRoutes = [
    {
        icon: BookCopy,
        label: "Start Studying",
        href: "/search"
    },
    {
        icon: Compass,
        label: "Find Teacher",
        href: "/teachers"
    },
    {
        icon: School,
        label: "Browse Institutions",
        href: "/institutions"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teachers/dashboard/courses"
    },
    {
        icon: CalendarCheck,
        label: "Appointments",
        href: "/teachers/[teacherId]/appointments"
    }
    ,
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teachers/dashboard/analytics"
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

    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teachers/dashboard");
    const isInstructorPage = pathname?.includes("/institutions");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href} />)
            )}
            <div className="mt-20 bottom-0 justify-center items-center"><Link href="mailto:ydidya.n@gmail.com" target="_blank">
                <div className="flex justify-center items-center p-4 m-2 border-2 rounded-full font-semibold">
                    Report a bug / feature
                </div></Link>
                <p className="m-4 text-center text-sm italic font-light">And help this project improve</p>
            </div>
            <div className="mt-10 bottom-0 justify-center items-center">
                <Link href="https://github.com/didinewlander/didi-teach/tree/dev" target="_blank">
                    <div className="flex justify-center items-center p-4 m-2 text-sm border rounded-lg gap-3">
                        <Github />
                        Join me on GitHub
                    </div>
                </Link>
            </div>
        </div>
    );
}