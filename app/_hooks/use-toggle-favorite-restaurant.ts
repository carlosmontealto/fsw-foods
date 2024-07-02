import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UserFavoriteRestaurant } from "@prisma/client";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  userFavoriteRestaurants?: UserFavoriteRestaurant[];
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante adicionado aos favoritos.",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao adicionar restaurante.");
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
