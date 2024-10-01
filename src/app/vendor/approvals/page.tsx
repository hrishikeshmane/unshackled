import { format } from 'date-fns';
import { ApprovalClient } from './_components/client'; 
import { api } from '~/trpc/server';
import { type ApprovalsColumn } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server'; 

const ApprovalsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }
    const approvals = await api.approvalForms.getApprovalsByVendor({ vendorId: userId });

    const formattedApprovals: ApprovalsColumn[] = await Promise.all(approvals.map(async (item) => {
        let customerFullName = '';
        let customerEmail = '';

        try {
            const user = await clerkClient.users.getUser(item.customerId);
            if (user) {
                customerFullName = `${user.firstName} ${user.lastName ?? ''}`.trim();
                customerEmail = user.emailAddresses[0]?.emailAddress ?? '';
            }
        } catch (error) {
            console.error(`Error fetching user for customerId ${item.customerId}:`, error);
        }

        return {
            id: item.id,
            productId: item.productId,
            customerId: item.customerId,
            customerFullName,
            customerEmail,
            status: item.status,
            createdAt: format(item.createdAt, "MMMM do, yyyy"),
        };
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ApprovalClient data={formattedApprovals} />
            </div>
        </div>
    );
}

export default ApprovalsPage;
