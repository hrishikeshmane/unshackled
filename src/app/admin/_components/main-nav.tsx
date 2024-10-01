"use client";

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className, ...props } : React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const storeId = params.storeId;

    if (typeof storeId !== 'string') {
        return null;
    }

    const routes = [{
        href: `/admin/${storeId}`,
        label: 'Overview',
        active: pathname === `/admin/${storeId}`
    }, {
        href: `/admin/${storeId}/billboards`,
        label: 'Billboards',
        active: pathname === `/admin/${storeId}/billboards`
    }, {
        href: `/admin/${storeId}/types`,
        label: 'Types',
        active: pathname === `/admin/${storeId}/types`
    }, {
        href: `/admin/${storeId}/tags`,
        label: 'Tags',
        active: pathname === `/admin/${storeId}/tags`
    }, 
    {
        href: `/admin/${storeId}/products`,
        label: 'Services',
        active: pathname === `/admin/${storeId}/products`
    }, {
        href: `/admin/${storeId}/orders`,
        label: 'Orders',
        active: pathname === `/admin/${storeId}/orders`
    }, {
        href: `/admin/${storeId}/settings`,
        label: 'Settings',
        active: pathname === `/admin/${storeId}/settings`
    }];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
           {routes.map((route, index) => (
            <Link key={index} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                {route.label}
            </Link>
           ))} 
        </nav>
    )
}