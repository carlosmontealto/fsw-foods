import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <h2 className="px-5 py-6 text-lg font-semibold">
        Restaurantes Favoritos
      </h2>
      <div className="flex w-full flex-col gap-6 px-5">
        {userFavoriteRestaurants.length > 0 ? (
          userFavoriteRestaurants.map(({ restaurant }) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))
        ) : (
          <h3 className="font-medium">
            Você ainda não adicionou nenhum restaurante aos seus favoritos!
          </h3>
        )}
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
