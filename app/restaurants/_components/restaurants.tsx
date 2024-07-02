"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { searchForRestaurants } from "../_actions/search";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantsProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantsProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  const searchFor = searchParams.get("search");
  if (!searchFor) return notFound();

  return (
    <>
      <Header />
      <h2 className="px-5 py-6 text-lg font-semibold">
        Restaurantes Encontrados
      </h2>
      <div className="flex w-full flex-col gap-6 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            userFavoriteRestaurants={userFavoriteRestaurants}
            key={restaurant.id}
            restaurant={JSON.parse(JSON.stringify(restaurant))}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default Restaurants;
