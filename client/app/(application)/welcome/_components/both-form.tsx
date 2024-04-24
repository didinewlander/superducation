'use client'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation"; // Correct import for Next.js 10+
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Check, CheckIcon, ChevronsUpDown } from 'lucide-react';

type FormInstitute = {
    id: string;
    name: string;
};

interface BothFormProps {
    institutions: FormInstitute[];
}

const formSchema = z.object({
    instituteId: z.string(),
    enrolledYear: z.number().min(1950).max(2024),
    expectedGraduationYear: z.number().min(2024),
});

export function BothForm({ institutions }: BothFormProps) {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instituteId: '',
            enrolledYear: 2024,
            expectedGraduationYear: 2028
        }
    });
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`/api/users/student_teacher`, values);
            toast.success('Profile updated successfully');
            router.push('/dashboard'); // Assuming there's a dashboard to redirect to
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="rounded-md border bg-white p-4 shadow-md m-auto mt-10">
            <div className="flex items-center justify-between font-medium">
                {`Let's work on your student info`}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between md:flex-row md:space-x-8 mt-4">
                    <div >
                        <FormField
                            name="instituteId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Institution</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? institutions.find(institute => institute.id === field.value)?.name : "Select Institution"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search institution..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No institutions found.</CommandEmpty>
                                                <CommandGroup>
                                                    {institutions && institutions.length > 0 && (
                                                        <CommandGroup>
                                                            {institutions.map((institute) => (
                                                                <CommandItem
                                                                    key={institute.id}
                                                                    onSelect={() => form.setValue("instituteId", institute.id)}
                                                                >
                                                                    {institute.name}
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            institute.id === field.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Select the institution associated with your profile.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormField name="enrolledYear" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enrolled Year</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} placeholder="2024" min={1950} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="expectedGraduationYear" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expected Graduation Year</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} placeholder="2028" min={2024} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-center mt-6">
                        <Button type="submit" disabled={isSubmitting}>
                            Save Profile
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
