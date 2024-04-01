import { Loader2 } from "lucide-react"
import { Suspense } from "react"

export const Loading = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Suspense fallback={
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        } >{children}
        </Suspense>
    )
}