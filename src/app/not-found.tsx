import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFoundPage() {
  return (
    <main className="h-full w-full">
      <div className="flex h-[calc(100vh-150px)] w-screen flex-col items-center justify-center">
        <h1 className="text-9xl font-black text-primary">404</h1>
        <h2 className="text-lg">Page not found</h2>
        <div className="pt-4">
          <Link href="/">
            <Button>Take me Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
