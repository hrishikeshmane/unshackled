import { api } from "~/trpc/server";
import { CreateStoreModal } from "./_components/modals/create-store-modal";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const AdminSetupPage = async () => {

    const store = await api.store.getStores();   
    
    return (
        <div>
            <h1>Admin Setup Page</h1>
            {
                store.length !== 0 &&
                store.map((store) => {
                    return (
                        <div key={store.id}>
                            <h2>{store.name}</h2>
                            <Link href={`/admin/${store.id}`}>
                                <p>Go to store</p>
                            </Link>
                        </div>
                    )
                })
            }
            {
                // store.length === 0 &&
                <CreateStoreModal>
                    <Button>Create Store</Button>
                </CreateStoreModal>
            }
        </div>
    )
}

export default AdminSetupPage