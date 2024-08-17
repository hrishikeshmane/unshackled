import { format } from 'date-fns';
import { OrderClient } from './_components/client';
import { api } from '~/trpc/server';
import { type OrdersColumn } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server'; // Import Clerk client

const OrdersPage = async () => {
    const { userId } = auth();
    
    if (!userId) {
        return null;
    }

    const orders = await api.order.getOrderItemsWithProductAndOrderByCreatorId({ creatorId: userId });

    const filteredOrders = orders.filter(item => item.order.paymentStatus !== "Not Initiated");

    const formattedOrders: OrdersColumn[] = await Promise.all(filteredOrders.map(async (item) => {
        let customerFullName = '';
        let customerEmail = '';

        try {
            const user = await clerkClient.users.getUser(item.order.customerId);
            if (user) {
                customerFullName = `${user.firstName} ${user.lastName ?? ''}`.trim();
                customerEmail = user.emailAddresses[0]?.emailAddress ?? '';
            }
        } catch (error) {
            console.error(`Error fetching user for customerId ${item.order.customerId}:`, error);
        }

        return {
            id: item.id,
            orderId: item.order.id,
            product: item.product.name,
            quantity: item.quantity,
            orderTotal: item.order.orderTotal,
            approval: item.approval as string,
            paymentStatus: item.order.paymentStatus,
            isFullfilled: item.isFulfilled,
            isPaid: item.order.isPaid,
            vendorPayout: item.vendorPayout,
            createdAt: format(item.order.createdAt, "MMMM do, yyyy"),
            customerFullName: customerFullName,
            customerEmail: customerEmail,
        };
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}

export default OrdersPage;