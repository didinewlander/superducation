import { db } from '@/lib/db'
//import { Loading } from '@/components/Loading'
//import { SearchInput } from '@/components/SearchInput'
import React from 'react'
import { Categories } from './_components/Categories'
import { CoursesList } from '@/components/CoursesList'
import { getCourses } from '@/actions/GetCourses'


interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    let userId = "123";
    const courses = await getCourses({ userId, ...searchParams })
    return (
        <>

            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                {/* <Loading >
                    <SearchInput />
                </Loading> */}

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