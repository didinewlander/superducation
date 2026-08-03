'use client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation'; // Correct import for Next.js 10+
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    website: z.string().url("Must be a valid URL"),
    phoneNumber: z.string().regex(/^(?:\*\d{4}|0\d-\d{3}-\d{4}|05\d-\d{3}-\d{4})$/, "Phone number must be in one of these formats: *XXXX, 0X-XXX-XXXX, 05X-XXX-XXXX"),
});

interface InstitutionFormProps {}

export function InstitutionForm({}: InstitutionFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            website: '',
            phoneNumber: '',
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userId = searchParams.get('user');
            const response = await axios.post(`/api/users/institution/${userId}`, values);
            toast.success('Institution registered successfully');
            router.push('/dashboard'); // Assuming there's an institutions page to redirect to
        } catch (error) {
            toast.error('Failed to register institution');
        }
    };

    return (
        <div className="rounded-md border bg-white p-4 shadow-md mx-auto mt-10" style={{ maxWidth: '600px' }}>
            <div className="font-bold text-2xl text-center mb-4">
                Register Your Institution
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Institution Name"
                                        className={clsx({
                                            'border-green-500': fieldState.isDirty && !fieldState.invalid,
                                            'border-red-500': fieldState.invalid,
                                        })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="website"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="https://example.com"
                                        className={clsx({
                                            'border-green-500': fieldState.isDirty && !fieldState.invalid,
                                            'border-red-500': fieldState.invalid,
                                        })}
                                        onBlur={() => {
                                            if (!/^https?:\/\//i.test(field.value)) {
                                                form.setValue('website', `https://${field.value}`, { shouldValidate: true });
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="phoneNumber"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="*XXXX, 0X-XXX-XXXX, or 05X-XXX-XXXX"
                                        className={clsx({
                                            'border-green-500': fieldState.isDirty && !fieldState.invalid,
                                            'border-red-500': fieldState.invalid,
                                        })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button type="submit" variant={'success'} disabled={isSubmitting} className="w-full">
                            Register Institution
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
