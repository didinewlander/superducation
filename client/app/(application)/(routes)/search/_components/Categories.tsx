"use client"

import { Category } from "@prisma/client"
import { CategoryItem } from "./CategoryItem";
import { IconType } from "react-icons"
import { FaBook } from "react-icons/fa";

interface CategoriesProps {
    items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
    "Default": FaBook
}
export const Categories = ({ items }: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto p-3">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}