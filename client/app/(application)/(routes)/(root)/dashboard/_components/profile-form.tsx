'use client'
import { getUser } from '@/actions/GetUser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { db } from '@/lib/db'


import { zodResolver } from '@hookform/resolvers/zod'
import { User, Student, Teacher, Institute } from '@prisma/client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface ProfileFormProps {
    initialData: {
        user: User
    }
    userId: string
}

const formSchema = z.object({
    id: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    password: z.string().min(1),
    name: z.string().min(1),
    roleId: z.string().min(1),
    isVerified: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const ProfileForm = ({ initialData, userId }: ProfileFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData.user,
    })
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`/api/users/USER_TYPE/`, values)
            toast.success('User Updated')
            toggleEdit()
            router.refresh()
        } catch {
            toast.error('Something went wrong')
        }
    }
    return (
        <div className='flex flex-2 gap-2'>
            <div className='w-full m-auto p-2'>
                <CardHeader>
                    <CardTitle>User Info</CardTitle>
                    <CardDescription>dedfgfgufdg</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder={"Phone Number (+972-501234567)"} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            >

                            </FormField>
                        </form>
                    </Form>
                </CardContent>
            </div>
            <Card className='w-full m-auto'>
                <CardHeader>
                    <CardTitle> Student / Teacher / Institution Info</CardTitle>
                    <CardDescription>dedfgfgufdg</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}

