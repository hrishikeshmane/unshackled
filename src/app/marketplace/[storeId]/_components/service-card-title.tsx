"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

export const ServiceCardTitle = ({ name, featured, productId }: { name: string, featured: boolean, productId: string}) => {
    const params = useParams();

    return (
        <Link href={`/marketplace/${String(params.storeId)}/products/${productId}`} className="font-medium text-left">
        {name}
        {!!featured ? (
            <Badge
                variant="outline"
                className="text-xs rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-2 ml-1 text-blue-600"
            >
                ⭐Featured{" "}
            </Badge>
        ) : (
            ""
        )}
         </Link>
    )
}