// components/BuyNowButton.tsx
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { type ProductWithRelations } from "~/types/globals";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface BuyNowButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  product: ProductWithRelations;
  quantity: number;
  isDownPayment: boolean;
  price: string; 
  buttonText?: string;
  disabled?: boolean;
}

const BuyNowButton: React.FC<BuyNowButtonProps> = ({
  className,
  variant,
  product,
  quantity,
  isDownPayment,
  price,
  buttonText = "Buy Now",
  disabled = false
}) => {
  const { clearCart, addItem } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleBuyNow = () => {
    setIsLoading(true);
    clearCart();
    addItem(product, isDownPayment, price, quantity); 
    router.push("/marketplace/cart");
  };

  return (
    <Button
      variant={variant ?? "default"}
      onClick={handleBuyNow}
      size="lg"
      className={cn(className, "w-full")}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Processing..." : buttonText}
    </Button>
  );
};

export default BuyNowButton;
