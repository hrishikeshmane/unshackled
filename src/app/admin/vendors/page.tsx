import { format } from 'date-fns'
import { VendorClient } from './_components/client';
import { api } from '~/trpc/server';
import { type VendorColumn } from './_components/columns';

const VendorsPage = async () => {

    const vendors = await api.vendor.getVendors();
    
    const formattedVendors: VendorColumn[] = vendors.map(item => ({
        id: item.id,
        userId: item.userId,
        stripeConnected: item.stripeConnected,
        stripeConnectedId: item.stripeConnectedId ?? "",
        status: item.status,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <VendorClient data={formattedVendors} />
            </div>
        </div>
    )
}

export default VendorsPage;