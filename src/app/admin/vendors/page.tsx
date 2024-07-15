import { format } from 'date-fns'
import { VendorClient } from './_components/client';
import { api } from '~/trpc/server';
import { type VendorColumn } from './_components/columns';
import { clerkClient } from "@clerk/nextjs/server";

const VendorsPage = async () => {
    const vendors = await api.vendor.getVendors();
    
    const formattedVendors: VendorColumn[] = await Promise.all(vendors.map(async item => {
        let vendorName = item.userId;
        try {
            const user = await clerkClient.users.getUser(item.userId);
            if (user) {
                vendorName = `${user.firstName} ${user.lastName ?? ""}`.trim() ?? user.emailAddresses[0]?.emailAddress ?? item.userId;
            }
        } catch (error) {
            console.error(`Error fetching user for userId ${item.userId}:`, error);
        }

        return {
            id: item.id,
            userId: vendorName,
            stripeConnected: item.stripeConnected,
            stripeConnectedId: item.stripeConnectedId ?? "",
            status: item.status,
            createdAt: format(item.createdAt, "MMMM do, yyyy"),
        };
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <VendorClient data={formattedVendors} />
            </div>
        </div>
    )
}

export default VendorsPage