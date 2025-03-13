"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export function ConditionalNavigationMenu({
  components,
}: {
  components: Routes;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isMarketplaceRoute = pathname.startsWith("/marketplace");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomeRoute = pathname.startsWith("/");

  return (
    <>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {!isMarketplaceRoute && !isVendorRoute && !isAdminRoute && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/read-unshackled" title="Read Unshackled">
                        Read the first book that simplifies legal immigration
                      </ListItem>
                      <ListItem href="/course" title="Take a Course">
                        Comprehensive course on talent visas
                      </ListItem>
                      <ListItem href="/newsletter" title="Newsletter">
                        Stay updated with our weekly immigration insights
                      </ListItem>
                      <ListItem
                        href="http://go.readunshackled.com/webinar"
                        title="Join a Webinar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join our interactive webinar sessions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/community" title="Community">
                        Join our vibrant community of ambitious immigrants
                      </ListItem>
                      <ListItem
                        href="http://go.readunshackled.com/unshackled-uac"
                        title="[NEW] Conference"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Attend our upcoming conference
                      </ListItem>
                      <ListItem href="/marketplace" title="[NEW] Marketplace">
                        All your talent visa needs in one place
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Get EB1 Support</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem href="/copilot" title="EB1 Copilot">
                        Get guided support for your EB1 journey
                      </ListItem>
                      <ListItem
                        href="https://go.greencard.inc/evaluation"
                        title="EB1 Autopilot"
                      >
                        Automated assistance for your EB1 process
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            )}
            {isMarketplaceRoute && (
              <>
                {components.marketplaceRoutes.map((component) => (
                  <NavigationMenuItem key={component.title}>
                    <Link href={component.href} passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
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
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
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
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {component.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
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
