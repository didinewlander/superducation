'use client'
import { getUser } from '@/actions/GetUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({})
    const session = useSession();

    useEffect(() => {
        // Simulate fetching user details from an API
        const fetchData = async () => {
            const user = await getUser(session.data?.user?.email || "");
            if (!user) redirect('/');
            setPhone(user.phone);
            setUser(user);
        };
        fetchData();
    }, [session]);

    const updateUserDetails = async () => {
        console.log('Updating details:', { phone, password });
        // Integrate actual API call to update user details here
    };

    return (
        <div className="p-4">
            <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                        </div>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="pt-4">
                    <div className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Security Settings</h3>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-1"
                            />
                        </div>

                        <Button onClick={updateUserDetails} className="mt-4">Update Security Settings</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
