'use client'
import { getUser } from '@/actions/GetUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';


const formSchema = z.object({
    username: z.string().min(1),
})

export default function DashboardPage() {
    const session = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    const validTabs = ['profile', 'bills', 'analytics', 'connections'];
    const [isUpdating, setIsUpdating] = useState(false)

    const toggleUpdating = () => {
        setIsUpdating((current) => !current)
    }
    const getInitialTab = () => {
        const menuParam = searchParams.get('menu');
        return menuParam && validTabs.includes(menuParam) ? menuParam : 'profile';
    };

    const [activeTab, setActiveTab] = useState(getInitialTab);

    const activeMenu = searchParams.get('menu') || 'profile';
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: session.data?.user?.name ?? '',
        },
    })
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`/api/users/USER_TYPE/`, values)
            toast.success('User Updated')
            toggleUpdating()
            router.refresh()
        } catch {
            toast.error('Something went wrong')
        }
    }
    useEffect(() => {

        // Fetch user details from an API
        const fetchData = async () => {
            try {
                if (!session.data) router.push('/');
                const user = await getUser(session.data?.user?.email ?? '');
                if (!user) {
                    router.push('/'); // Redirect to homepage if user data is not found
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();

    });

    useEffect(() => {
        // Update active tab based on URL change or internal state change
        if (activeMenu !== activeTab) {
            setActiveTab(activeMenu);
        }
    }, [activeMenu, activeTab]);

    const handleTabChange = (newTab: string) => {
        setActiveTab(newTab);
        // Update the URL search parameters without reloading the page
        router.push(`/dashboard?menu=${newTab}`, undefined);
    };

    return (
        <div className="p-4 w-full m-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="bills">Bills & Purchases</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="connections">Appointments</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
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
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input disabled={isSubmitting} placeholder={"User Name"} {...field}/>
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
                    </div>
                </TabsContent>

                <TabsContent value="bills" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Bills & Purchases</h3>
                        {/* Content for bills */}
                    </div>
                </TabsContent>

                <TabsContent value="analytics" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Analytics</h3>
                        {/* Content for analytics */}
                    </div>
                </TabsContent>

                <TabsContent value="connections" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Appointments</h3>
                        {/* Content for appointments */}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
