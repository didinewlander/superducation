'use client'

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormItem, FormField, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface NameFormProps {
    initialData?: {
        name: string,
        email: string
    }
}
const roles =
    [
        { id: 'institution', label: 'Institution' },
        { id: 'teacher', label: 'Teacher' },
        { id: 'student', label: 'Student' },
        { id: 'both', label: 'Student & Teacher' },
    ] as const;
const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    gender: z.string().min(1, { message: "must select" }),
    role: z.string().min(4, { message: "Role must be selected" }),  // Changed from array to string
    email: z.string().email(),
    phone: z.string().min(7).max(15)
})

const NameForm = ({ initialData }: NameFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const nameParts = initialData?.name?.split(' ');
    const router = useRouter();
    const session = useSession();

    const userEmail = session.data?.user?.email ?? "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: nameParts?.[0] ?? '',
            lastName: nameParts?.[1] ?? '',
            email: userEmail
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await axios.post(`/api/users/`, values)
            toast.success('User Created');
            toggleEdit();
            router.push(`/welcome/${response.data.role}?user=${response.data.userId}`);
        } catch {
            toast.error('Something went wrong');
        }
    }

    return (
        <div className="mt-6 rounded-md border bg-slate-100 p-4 mx-20">
            <div className="flex items-center justify-between font-medium">
                {`Let's set up your ${form.getValues("role")} profile`}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between md:flex-row md:space-x-8 mt-4">
                    <div className="flex-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="Israel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="Israeli" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-2">

                        <FormField
                            control={form.control}
                            name="email"
                            defaultValue={userEmail}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} content={userEmail} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="+XXX-XXX-XXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-3">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} disabled={isSubmitting}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Male</SelectItem>
                                                <SelectItem value="2">Female</SelectItem>
                                                <SelectItem value="0">Not Specified</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2 my-4">
                                        <FormItem>
                                            <FormLabel>{"I'm a:"}</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    className="grid grid-cols-2 gap-4" // Update this line to adjust the number of columns and gaps
                                                >
                                                    {roles.map((role) => (
                                                        <div key={role.id} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={role.id} id={role.id} />
                                                            <FormLabel >{role.label}</FormLabel>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                    <FormDescription>
                                        <span>Students can also be teachers |</span>
                                        <span className="font-bold text-slate-800"> This Setting Is Permanent!</span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                    </div>
                    <div className="flex items-center m-auto p-4">
                        <Button disabled={!isValid || isSubmitting} type="submit">
                            {`Let's Go!`}
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default NameForm