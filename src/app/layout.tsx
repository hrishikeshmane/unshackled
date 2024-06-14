import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
import { ToastProvider } from "~/providers/toast-provider";
import Navbar from "~/components/navbar";
// import Footer from "~/components/footer";
// import Navbar from "~/components/navbar";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn(
          'relative h-full font-sans antialiased',
          GeistSans.variable
        )}>
          <main className='relative flex flex-col min-h-screen'>
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
          <TRPCReactProvider>
            <ToastProvider  />
            {/* <MaxWidthWrapper> */}
              <Navbar />
              <div className='flex-grow flex-1'>
                {children}
              </div>
              {/* <Footer /> */}
            {/* </MaxWidthWrapper> */}
            </TRPCReactProvider>
          </ClerkProvider>
          </main>
      </body>

    </html>
  );
}
