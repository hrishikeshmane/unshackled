import { format } from 'date-fns'
import { OrderClient } from './_components/client';
import { api } from '~/trpc/server';
import { type OrdersColumn } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';

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