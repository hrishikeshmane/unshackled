import { api } from "~/trpc/server";
import { CreateStoreModal } from "./_components/modals/create-store-modal";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import { cn } from "~/lib/utils";
import { PlusCircle } from "lucide-react";

const DotIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
   };

const AdminSetupPage = async () => {

    const { userId } = auth()
    const user = await currentUser();

    if (!user) {
        return null
    }

    const store = await api.store.getStores({live: false});   
    
    return (
        <div>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
         <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Hello <span className="text-primary">{user.firstName}</span>, welcome to your admin dashboard.
            
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Control your store, manage your products, vendor, customers, view your orders and more.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6 mb-6'>
            {/* <Link
              href='/products'
              className={buttonVariants()}>
              Browse Trending
            </Link> */}
            <p className={cn(
                        buttonVariants({
                            variant:'secondary',
                            size: 'default',
                            className: 'gap-1.5'
                        })
                    )}>
                    Navigate Stores below &rarr;
            </p>
          </div>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc text-lg list-inside dark:text-gray-400">
            {
                    store.length !== 0 ?
                    store.map((store) => {
                        return (
                            <li key={store.id} className="flex items-center gap-2 underline">
                              <div className="inline-flex items-center gap-2">
                                <h2 className="text-lg m-0 p-0">{store.name} &rarr;</h2>
                                <Link href={`/admin/${store.id}`} className="text-lg">
                                  <p className="m-0 p-0">/admin/{store.name}</p>
                                </Link>
                              </div>
                            </li>
                        )
                    }) : (
                        <li className="flex gap-2 underline">
                            <h2>No store created yet</h2>
                        </li>
                    )
                }
            
          </ul>
          <div className="mt-10">
            {
                    <CreateStoreModal>
                        <Button>
                        <PlusCircle className="w-5 h-5 mr-2" /> Create Store
                        </Button>
                    </CreateStoreModal>
                }
          </div>
      </div>
        </div>
    )
}

export default AdminSetupPage