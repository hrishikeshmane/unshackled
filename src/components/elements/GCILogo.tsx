import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

const GCILogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex w-full items-center gap-0 font-semibold", className)}
    >
      <p>by</p>
      <Image src="/logo-512.png" alt="logo" width={25} height={25} />
      <span className="w-full font-bold">Greencard.Inc</span>
    </Link>
  );
};

export default GCILogo;
