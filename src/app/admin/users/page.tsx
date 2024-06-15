import { format } from 'date-fns'
import { UserClient } from './_components/client';
import { api } from '~/trpc/server';
import { type UserColumn } from './_components/columns';

const OrdersPage = async () => {

    const users = await api.user.getAllUsers();
    
    const formattedUsers: UserColumn[] = users.map(item => ({
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        role: item.role,
        member: item.member,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <UserClient data={formattedUsers} />
            </div>
        </div>
    )
}

export default OrdersPage;