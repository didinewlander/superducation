import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./IconBadge";
import { ArrowBigRight, BookOpen } from "lucide-react";
import { CourseProgress } from "./CourseProgress";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chapterLength: number;
    price: number;
    progress: number | null;
    category: string;
    description: string;
}

export const CourseCard = ({
    id, title, imageUrl, chapterLength, price, progress, category, description
}: CourseCardProps) => {
    return (

        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover transition group-hover:blur-md"
                        alt={title}
                        src={imageUrl}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-slate-900 font-bold text-lg">
                            {description.length < 24 ? description : (
                                <div>
                                    Enter Course
                                    <IconBadge icon={ArrowBigRight} size={"sm"} />

                                </div>
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size={"sm"} icon={BookOpen} />
                            <span>
                                {chapterLength} {chapterLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>
                    {progress !== null ? (
                        <div>
                            <CourseProgress
                                size="sm"
                                value={progress}
                                variant={progress === 100 ? "success" : "default"}
                            />
                        </div>
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {price}
                        </p>
                    )}
                </div>
            </div>
        </Link >
    )
}