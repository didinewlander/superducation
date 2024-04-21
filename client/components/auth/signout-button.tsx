import { signOut } from "@/auth";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }}
        >
            <button type="submit" className="flex align-middle items-center gap-2 border border-gray-300 text-black py-2 px-4 rounded outline-none hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-300 focus:outline-none">
                Sign Out</button>
        </form>
    )
}