import { SessionProvider } from "next-auth/react";
const WelcomePage = async (
    {
        children
    }: {
        children: React.ReactNode
    }) => {
    return (
        <div className="h-full">
            <SessionProvider refetchOnWindowFocus={false}>
                {children}
            </SessionProvider>
        </div>
    );
}

export default WelcomePage;