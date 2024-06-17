"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "./logo";
import { type NavComponent, type Routes } from "./header";
import { usePathname } from "next/navigation";

export function NavigationMenuDemo({ components }: { components: Routes }) {
  const pathname = usePathname();

  const isMarketplaceRoute = pathname.startsWith("/marketplace");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomeRoute = pathname.startsWith("/");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {!isMarketplaceRoute && !isVendorRoute && !isAdminRoute && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Logo className="border-3 m-auto" />
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/read-unshackled" title="Read Unshackled">
                    Read the first book that simplifies legal immigration with
                    beautiful visuals & gripping stories.
                  </ListItem>
                  <ListItem href="/community" title="Community">
                    Join the vibrant community of ambitious immigrants
                  </ListItem>
                  <ListItem href="/course" title="Free Course">
                    5-day free course on talent visas. No legal jargon.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.marketplaceRoutes.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/newsletter" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Newsletter
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/our-story" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Our Story
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
        {isMarketplaceRoute && (
          <>
            {components.marketplaceRoutes.map((component) => (
              <NavigationMenuItem key={component.title}>
                <Link href={component.href} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </>
        )}

        {isVendorRoute && (
          <>
            {components.vendorRoutes.map((component) => (
              <NavigationMenuItem key={component.title}>
                <Link href={component.href} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </>
        )}

        {isAdminRoute && (
          <>
            {components.adminRoutes.map((component) => (
              <NavigationMenuItem key={component.title}>
                <Link href={component.href} passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {component.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild >
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
