import { Icons } from "@/components/icons";
import { siteConfig } from "~/lib/config";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-5 py-16 pb-0 sm:px-10">
        <a
          href="/"
          title={siteConfig.name}
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="h-[40px] w-auto" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </a>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {siteConfig.footer.map((section, index) => (
            <div key={index} className="mb-5">
              <h2 className="font-semibold">{section.title}</h2>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="my-2">
                    <Link
                      href={link.href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90"
                    >
                      {link.icon && link.icon}
                      {link.text}
                      <ChevronRight className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 justify-between gap-1 border-t py-2 md:grid-cols-2">
          <span className="text-sm tracking-tight text-foreground">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              {siteConfig.name}
            </Link>{" "}
            - {siteConfig.description}
          </span>
          <ul className="flex justify-start text-sm tracking-tight text-foreground md:justify-end">
            <li className="mr-3 md:mx-4">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </li>
            <li className="mr-3 md:mx-4">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
