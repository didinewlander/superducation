import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
interface OrderAppointProps {
    id: string;
}
export function OrderAppoint({ id }: OrderAppointProps) {
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
                    <Link href={`/appointments/${id}`} target="_blank"><Button asChild variant={"success"} >
                        <div className="gap-2">
                            Take me there
                            <ExternalLink />
                        </div>
                    </Button></Link>
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
