import { db } from "@/app/_lib/prisma";

import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <h2 className="px-5 py-6 text-lg font-semibold">Pedidos Recomendados</h2>
      <div className="grid w-full grid-cols-2 gap-6 px-5">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={JSON.parse(JSON.stringify(product))}
            className="w-full min-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default RecommendedProductsPage;
