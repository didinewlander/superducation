'use client'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from "next/navigation"; // Correct import for Next.js 10+
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckIcon, School, XIcon } from 'lucide-react';
import { Card, SearchSelect, SearchSelectItem } from '@tremor/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type FormInstitute = {
    id: string;
    name: string;
};

interface BothFormProps {
    institutions: FormInstitute[];
}

const formSchema = z.object({
    currentInstituteId: z.string(),
    enrolledYear: z.string()
        .transform(value => {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) throw new Error("Enrolled year must be a valid number");
            return parsed;
        }) // Parse string to number and throw if invalid
        .refine(year => year >= 1950 && year <= 2024, {
            message: "Enrolled year must be between 1950 and 2024",
        }), // Validate the range
    expectedGraduationYear: z.string()
        .transform(value => {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) throw new Error("Graduation year must be a valid number");
            return parsed;
        }) // Parse string to number and throw if invalid
        .refine(year => year >= 2024 && year <= 2034, {
            message: "Enrolled year must be between 2024 and 2034",
        }),
    teachAtInstituteId: z.string()
})

export function BothForm({ institutions }: BothFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentInstituteId: '',
            enrolledYear: 2024,
            expectedGraduationYear: 2028,
            teachAtInstituteId: ''
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userId = searchParams.get('user');
            const response = await axios.post(`/api/users/student_teacher/${userId}`, values);
            toast.success('Profile updated successfully');
            router.push('/dashboard'); // Assuming there's a dashboard to redirect to
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="rounded-md border bg-white p-4 shadow-md mx-auto mt-10" style={{ maxWidth: '600px' }} >
            <div className="font-bold text-2xl text-center mb-4">
                {`Let's complete your info`}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <div className='rounded-md border-2 p-4'>
                        <h1 className="font-bold text-lg text-center">
                            Student Info
                        </h1>
                        <div className='mb-4'>
                            <FormField
                                name="currentInstituteId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Institution</FormLabel>
                                        <SearchSelect id="currentInstituteId"  {...field} onValueChange={(selectedValue) => {
                                            form.setValue('currentInstituteId', selectedValue, { shouldValidate: true });
                                        }}
                                            className="mt-2 rounded-md bg-white">
                                            {institutions.map((inst) => {
                                                if (inst.name !== "Freelance") return (
                                                    <SearchSelectItem key={inst.id} value={inst.id} icon={School} className='bg-white rounded-md'>
                                                        {inst.name}
                                                    </SearchSelectItem>
                                                )
                                            })}
                                        </SearchSelect>

                                        <FormDescription>
                                            Select the institution You are currently enrolled in.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className='flex gap-2 flex-col'>
                            <FormField name="enrolledYear" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enrolled Year</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="2024" min={1950} max={2024} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="expectedGraduationYear" control={form.control} render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Expected Graduation Year</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="2028" min={2024} max={2034} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className='py-4 border-slate-500'>
                            <div className='flex flex-col space-y-2'>
                                <Card className='rounded-lg p-4 space-y-2'>
                                    <h1 className="font-bold text-lg text-center">
                                        Which Data Will We Be Storing
                                    </h1>
                                    <div className=''>
                                        <p className='text-lg font-bold p-2'>
                                            As a student
                                        </p>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Courses You Baught</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Course Progress</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Topics Preferences</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger className='text-slate-700 font-bold'>{"Communication*\u00A0"}</TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Appoinments and Messages</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                with Teachers</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Payments and Receipts</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <XIcon className='h-4 w-4 mr-2' />
                                            <p>Credit Card Info</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md border-2 p-4'>
                        <h1 className="font-bold text-lg text-center">
                            Teacher Info
                        </h1>
                        <div className='mb-4'>
                            <FormField
                                name="teachAtInstituteId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Institution</FormLabel>
                                        <SearchSelect id="teachAtInstituteId" {...field} onValueChange={(selectedValue) => {
                                            form.setValue('teachAtInstituteId', selectedValue, { shouldValidate: true });
                                        }}
                                            className="mt-2 rounded-md bg-white">
                                            {institutions.map((inst) => (
                                                <SearchSelectItem key={inst.id} value={inst.id} icon={School} className='bg-white rounded-md'>
                                                    {inst.name}
                                                </SearchSelectItem>
                                            ))}
                                        </SearchSelect>

                                        <FormDescription>
                                            If there is no official institution - register as freelance.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className='py-4 border-slate-500'>
                            <div className='flex flex-col space-y-2'>
                                <Card className='rounded-lg p-4 space-y-2'>
                                    <h1 className="font-bold text-lg text-center">
                                        Which Data Will We Be Storing
                                    </h1>
                                    <div>
                                        <p className='text-lg font-bold p-2'>
                                            As a teacher
                                        </p>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Courses You Created</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Who Baught your Courses</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Suggestions From Users</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p> <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger className='text-slate-700 font-bold'>{"Communication*\u00A0"}</TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Appoinments and Messages</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider> With Users</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <CheckIcon className='h-4 w-4 mr-2' />
                                            <p>Income And Analytics</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <XIcon className='h-4 w-4 mr-2' />
                                            <p>Credit Card Info</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit" variant={'success'} disabled={isSubmitting} className="w-full">
                            Confirm and Complete Register
                        </Button>
                    </div>
                </form >
            </Form >

        </div >
    );
}
