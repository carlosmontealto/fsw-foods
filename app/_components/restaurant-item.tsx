"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { formatCurrency } from "../_helpers/price";
import { cn } from "../_lib/utils";

import { Button } from "./ui/button";

import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userId,
  userFavoritesRestaurants,
}: RestaurantItemProps) => {
  const isFavorite = userFavoritesRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos!"
          : "Restaurante adicionado aos favoritos!",
      );
    } catch (error) {
      toast.error("Erro ao adicionar aos favoritos!");
    }
  };

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="h-auto w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
          {userId && (
            <Button
              className={`absolute right-2 top-2 m-0 h-7 w-7 rounded-full bg-gray-700 p-0 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="h-fit w-fit fill-white" />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
