import { format } from 'date-fns';
import { OrderClient } from './_components/client';
import { api } from '~/trpc/server';
import { type OrdersColumn } from './_components/columns';
import { clerkClient } from "@clerk/nextjs/server";
import { formatPrice } from '~/lib/utils';

const OrdersPage = async ({ 
    params
}: { 
    params: { storeId: string }
}) => {

    const orders = await api.order.getOrderItemsByStoreIdWithProductandOrder({ storeId: params.storeId });

    const filteredOrders = orders.filter(item => item.order.paymentStatus !== "Not Initiated");

    const formattedOrders: OrdersColumn[] = await Promise.all(filteredOrders.map(async item => {
        let customerName = '';
        let customerEmail = '';
        try {
            const user = await clerkClient.users.getUser(item.order.customerId);
            if (user) {
                customerName = `${user.firstName} ${user.lastName ?? ''}`.trim();
                customerEmail = user.emailAddresses[0]?.emailAddress ?? '';
            }
        } catch (error) {
            console.error(`Error fetching user for customerId ${item.order.customerId}:`, error);
        }

        return {
            id: item.id,
            orderId: item.order.id,
            customerName: customerName,
            customerEmail: customerEmail,
            product: item.product.name,
            approval: item.approval as string,
            paymentStatus: item.order.paymentStatus,
            quantity: item.quantity,
            orderTotal: formatPrice(item.order.orderTotal) as string,
            isFullfilled: item.isFulfilled,
            isPaid: item.order.isPaid,
            vendorPayout: item.vendorPayout,
            createdAt: format(item.order.createdAt, "MMMM do, yyyy"),
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
