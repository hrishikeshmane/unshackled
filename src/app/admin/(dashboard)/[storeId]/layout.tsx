import { redirect } from "next/navigation"
import { api } from "~/trpc/server"
import Navbar from "~/app/admin/_components/navbar"

interface DashboardType {
    children: React.ReactNode;
    params: { storeId: string }
}

export default async function Dashboard({children, params}: DashboardType) {
    const store = await api.store.getStoreById({id: params.storeId});
    
    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}