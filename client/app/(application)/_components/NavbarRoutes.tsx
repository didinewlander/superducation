"use client"

import { BarChart, CandlestickChart, Compass, DoorOpen, ExternalLink, Github, Layers3, Layout, List, MonitorPlay, School, UserSearch } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import Link from "next/link";
const guestRoutes = [
    {
        icon: DoorOpen ,
        label: "Home ",
        href: "/"
    },
    {
        icon: School,
        label: "Courses",
        href: "/search"
    },
    {
        icon: UserSearch,
        label: "Find Teacher",
        href: "/teachers"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    }
]
export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
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