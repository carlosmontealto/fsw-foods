"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Restaurant } from "@prisma/client";

import { Button } from "@/app/_components/ui/button";

import { ChevronLeftIcon, HeartIcon } from "lucide-react";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();
  return (
    <div className="relative h-[216px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4 m-0 rounded-full bg-gray-700 p-0"
      >
        <HeartIcon size={20} className="h-fit w-fit fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
