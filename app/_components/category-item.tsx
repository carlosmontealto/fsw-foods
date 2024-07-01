import Image from "next/image";
import Link from "next/link";

import { Category } from "@prisma/client";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
        className="ml-3"
      />

      <span className="mr-3 text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
