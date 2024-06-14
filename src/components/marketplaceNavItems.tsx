"use client"
import { cn } from '@/lib/utils';
import { type StoreTable } from '~/types/globals';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';

interface NavItemsProps {
    data: StoreTable[] | []
}

interface NavItem {
    href: string;
    label: string;
    active: boolean;
}

const MarketplaceNavItems: React.FC<NavItemsProps> = ({ data }) => {
    const pathname = usePathname();

    const isMarketplaceRoute = pathname.startsWith('/marketplace');
    const isVendorRoute = pathname.startsWith('/vendor');

    if (!isMarketplaceRoute && !isVendorRoute) {
        return null;
    }

    let routes: NavItem[]  = [];

    if (isMarketplaceRoute) {
        routes = data.map(route => ({
            href: `/marketplace/${route.id}`,
            label: route.name,
            active: pathname === `/marketplace/${route.id}`
        }))
    } else if (isVendorRoute) {
        routes = [{
            href: `/vendor`,
            label: 'Overview',
            active: pathname === `/vendor`
        }, {
            href: `/vendor/products`,
            label: 'Products',
            active: pathname === `/vendor/products`
        }, {
            href: `/vendor/orders`,
            label: 'Orders',
            active: pathname === `/vendor/orders`
        }, 
        {
            href: `/vendor/billing`,
            label: 'Billing',
            active: pathname === `/vendor/billing`
        }]
    }

    return (
        <nav className='flex gap-4 h-full'>
            <div className="relative flex items-center">
            {routes.map(route => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        buttonVariants({
                            variant: route.active ? 'secondary' : 'ghost',
                            size: 'default',
                            className: 'gap-1.5'
                        })
                    )}
                >
                    {route.label}
                    <ChevronDown
                        className={cn("h-4 w-4 transition-all text-muted-foreground")}
                    />
                </Link>
            ))}
            </div>
        </nav>
    )
}

export default MarketplaceNavItems;