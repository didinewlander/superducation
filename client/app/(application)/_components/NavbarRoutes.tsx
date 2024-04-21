'use client'

import { redirect, usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/searchInput'
import { findRole } from '@/lib/roles'
import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '@/components/ui/avatar'
export const NavbarRoutes = () => {
    const session = useSession();
    if (!session) { redirect('/'); }
    const role = findRole(session.data?.user?.email);

    const pathname = usePathname()

    const isSearchPage = pathname?.includes('/search')

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            
            <div className="ml-auto flex gap-x-2">
                <Avatar>
                </Avatar>
                {role === 'teacher' ? <Link href="/teachers/dashboard/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
                    : <Link href="/institution/management">
                        <Button size="sm" variant="ghost">
                            Office mode
                        </Button>
                    </Link>
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
