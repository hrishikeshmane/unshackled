import { format } from 'date-fns'
import { OrderClient } from './_components/client';
import { api } from '~/trpc/server';
import { type OrdersColumn } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { formatPrice } from '~/lib/utils';

const OrdersPage = async () => {
    const { userId } = auth()
    
    if (!userId) {
        return null
    }

    const orders = await api.order.getOrderItemsWithDetailsForUser({ userId: userId });

    const formattedOrders: OrdersColumn[] = orders.map(item => ({
        id: item.id,
        orderId: item.order.id,
        product: item.product.name,
        orderTotal: formatPrice(item.order.orderTotal) as string,
        paymentStatus: item.order.paymentStatus,
        approval: item.approval as string,
        isFullfilled: item.isFulfilled,
        isPaid: item.order.isPaid,
        createdAt: format(item.order.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <MaxWidthWrapper>
            <div className="flex-col">
                <div className="flex-1 p-8 pt-6 space-y-4">
                    <OrderClient data={formattedOrders} />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default OrdersPage;