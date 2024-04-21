import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"

export const Loading = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Suspense fallback={
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">


                <Card >
                    <CardHeader className="flex align-middle items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary" /> Loading Data...
                    </CardHeader>
                </Card>
            </div>
        } >{children}
        </Suspense>
    )
}