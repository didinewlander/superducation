'use client'

import { redirect, usePathname } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/search-input'
import { findRole } from '@/lib/roles'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserIdByEmail } from '@/actions/GetUser'
import { useEffect, useState } from 'react'
async function generateAcronym(input: string) {
    if (!input) return '';
    return input
        .split(/\s+/)  // Split the input on any whitespace
        .map(word => word[0].toUpperCase())  // Take the first character of each word and capitalize it
        .join('');  // Join all the first letters to form the acronym
}
export const NavbarRoutes = () => {
    const session = useSession();
    if (!session) { redirect('/'); }

    const [userId, setUserId] = useState("");

    const str = (session.data?.user?.name || "")
        .split(/\s+/)
        .map(word => word[0])
        .join('')

    const role = findRole(session.data?.user?.email);

    const pathname = usePathname()

    const isSearchPage = pathname?.includes('/search')

    useEffect(() => {
        async function checkUser() {
            const email = session?.data?.user?.email || "";

            const userId = await getUserIdByEmail(email);
            if (!userId) { return null }
            setUserId(userId);
        }

        checkUser();
    }, [session]);

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}

            <div className="ml-auto flex gap-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='shadow-md'>
                            <AvatarImage src={session.data?.user?.image || ''} />
                            <AvatarFallback>
                                {str}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={'/dashboard'}>Profile Dashboard</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href={`/appointments/${userId}`}>Appointments</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {role === 'teacher' ?
                    (<Link href="/teachers/courses">
                        <Button size="sm" variant="ghost">
                            Teacher mode
                        </Button>
                    </Link>) :
                    role === 'institution' ?
                        (<Link href="/institution/management">
                            <Button size="sm" variant="ghost">
                                Office mode
                            </Button>
                        </Link>)
                        :
                        role === 'both' ? (<Link href="/teachers/courses">
                            <Button size="sm" variant="ghost">
                                Teacher mode
                            </Button>
                        </Link>) : null
                }
                <Link href="/" onClick={() => signOut()}>
                    <Button size="sm" variant="ghost">
                        <LogOut className="mr-2 h-4 w-4" />
                        Exit
                    </Button>
                </Link>
            </div>
        </>
    )
}
