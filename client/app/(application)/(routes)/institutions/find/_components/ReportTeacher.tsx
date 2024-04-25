import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function ReportTeacher() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">{"Tell us about this teacher"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>What would like to tell us?</DialogTitle>
                </DialogHeader>

                <textarea
                    className="w-full p-2 border rounded-lg"
                    placeholder="Write your message here"
                />
                <DialogFooter className="flex gap-2 w-full justify-between">
                    <DialogClose asChild className="flexgap-2">
                        <Button variant={"success"} onClick={() => {
                            alert("You have successfully")
                        }}>
                            <div>
                                Send

                            </div>
                        </Button>
                    </DialogClose>
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
