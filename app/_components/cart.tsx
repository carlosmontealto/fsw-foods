import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { formatCurrency } from "../_helpers/price";
import CartItem from "./cart-item";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Descontos</span>
              <span> - {formatCurrency(totalDiscounts)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Entrega</span>
              {Number(products[0].restaurant.deliveryFee) === 0 ? (
                <span className="uppercase text-primary">Grátis</span>
              ) : (
                formatCurrency(Number(products[0].restaurant.deliveryFee))
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  totalPrice + Number(products[0].restaurant.deliveryFee),
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="mt-6 w-full">Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
