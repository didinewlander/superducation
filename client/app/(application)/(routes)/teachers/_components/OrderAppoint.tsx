import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function OrderAppoint() {
    const id = "teacherID";
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="success">{"Let's Study!"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{"Set an appointment"}</DialogTitle>
                    <DialogDescription>
                        {"To set a new appointment, please click the button below. You will be redirected to the teacher's appointment page"}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2 w-full justify-between">
                    <Button asChild variant={"success"}>
                        <div className="gap-2">
                            <Link href={`/teachers/appointments?id=${id}`} target="_blank">Take me there</Link>
                            <ExternalLink />
                        </div>
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
