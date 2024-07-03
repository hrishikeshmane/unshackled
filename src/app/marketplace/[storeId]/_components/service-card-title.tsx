"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

export const ServiceCardTitle = ({
  name,
  featured,
  productId,
}: {
  name: string;
  featured: boolean;
  productId: string;
}) => {
  const params = useParams();

  return (
    <>
      {name}
      {!!featured ? (
        <Badge
          variant="outline"
          className="ml-1 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-2 text-xs text-blue-600"
        >
          ⭐Featured{" "}
        </Badge>
      ) : (
        ""
      )}
    </>
  );
};
