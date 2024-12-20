import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
// import { ToastProvider } from "~/providers/toast-provider";
// import Navbar from "~/components/navbar";
import Header from "~/components/elements/header";
import { Toaster } from "@/components/ui/sonner";
import { Outfit } from "next/font/google";
import { AxiomWebVitals } from "next-axiom";
import { CSPostHogProvider } from "./_analytics/posthog-provider";
import { GoogleTagManager } from "@next/third-parties/google";

const outflit = Outfit({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Unshackled: One-stop-shop for talent visas in America.",
  description:
    "At unshackled.club, we do one thing really well: help you escape the H-1B lottery and empower your career with a talent visa (O1/EB1/NIW).",
  icons: [{ rel: "icon", url: "/favicon.png" }],
  verification: {
    google: "J_sZSf53O80Oo_7NwBntv58XhKFOqG2Oe5Bk-9WKLTs",
    other: {
      "msvalidate.01": ["39CC291841558A0EC3039A7C6B54B83F"],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
        variables: {
          colorPrimary: "#03449E",
          colorText: "#000000",
        },
      }}
    >
      <CSPostHogProvider>
        <html lang="en">
          <GoogleTagManager gtmId="GTM-NNHVJC97" />
          <body
            className={cn(
              "min-w-screen relative h-full min-h-screen bg-background font-sans antialiased ",
              GeistSans.variable,
              outflit.variable,
            )}
          >
            <main className="relative flex flex-col">
              <TRPCReactProvider>
                {/* <ToastProvider /> */}
                {/* <Navbar /> */}
                <Header />
                <div className="flex-1 flex-grow">{children}</div>
                <Toaster position="top-center" richColors />
              </TRPCReactProvider>
              <AxiomWebVitals />
            </main>
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
