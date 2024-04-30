import db from '@/lib/db'

//import { Loading } from '@/components/Loading'
//import { SearchInput } from '@/components/SearchInput'
import React from 'react'
import { Categories } from './_components/Categories'
import { CoursesList } from '@/components/courses-list'
import { getCourses } from '@/actions/GetCourses'
import NextTopLoader from 'nextjs-toploader'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUserIdByEmail } from '@/actions/GetUser'
import { SearchInput } from '@/components/search-input'
import { Loading } from '@/components/Loading'


interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {

    const session = await auth();
    if (!session) return redirect('/');
    const userId = await getUserIdByEmail(session.user?.email ?? '');
    if (!userId) return redirect('/');
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    const courses = await getCourses({ userId, ...searchParams })
    return (
        <>
            <NextTopLoader showSpinner={false} easing="ease" />
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                    <SearchInput />
            </div>
            <div className="px-6">
                <Categories
                    items={categories}
                />
                <CoursesList items={courses} />
            </div>

        </>
    )
}

export default SearchPage