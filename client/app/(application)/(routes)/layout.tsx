import { SessionProvider } from "next-auth/react";
import { Navbar } from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import LoginPage from "@/components/auth/login-page";

const DashboardLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }) => {

    const session = await auth();
    if (!session)
        return (<LoginPage />)
    return (
        <div className="h-full">
            <SessionProvider>
                <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                    <Navbar />
                </div>
                <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                    <Sidebar />
                </div>
                <main className="md:pl-56 pt-[90px] h-full">
                    {children}
                </main>
            </SessionProvider>
        </div>
    );
}

export default DashboardLayout;