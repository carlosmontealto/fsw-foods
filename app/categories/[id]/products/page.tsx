import { notFound } from "next/navigation";

import { db } from "@/app/_lib/prisma";

import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) return notFound();
  return (
    <>
      <Header />
      <h2 className="px-5 py-6 text-lg font-semibold">{category.name}</h2>
      <div className="grid w-full grid-cols-2 gap-6 px-5">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            className="w-full min-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
