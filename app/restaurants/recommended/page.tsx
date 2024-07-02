import { getServerSession } from "next-auth";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});

  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <h2 className="px-5 py-6 text-lg font-semibold">
        Restaurantes Recomendados
      </h2>
      <div className="flex w-full flex-col gap-6 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            userFavoriteRestaurants={userFavoriteRestaurants}
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default RecommendedRestaurants;
