import React from 'react'
import { UserButton } from '@clerk/nextjs';
import { MainNav } from './main-nav';
import StoreSwitcher from "./store-switcher";
import { api } from '~/trpc/server';

const Navbar = async () => {
    const stores = await api.store.getStores();

    // const transformedStores: StoreTable[] = stores.data.map((store) => ({
    //     id: store.id,
    //     name: store.name,
    //     createdAt: store.createdAt.getTime() / 1000, // Convert Date to Unix timestamp
    //     updatedAt: store.updatedAt ? store.updatedAt.getTime() / 1000 : 0, // Convert Date to Unix timestamp, or use 0 if null
    // }));

    return (
        <div className='border-b'>
            <div className='flex items-center h-16 px-4'>
                <StoreSwitcher items={stores} />
                <MainNav className='mx-6' />
                {/* <div className='flex items-center ml-auto space-x-4'>
                    <UserButton afterSignOutUrl='/'/>
                </div> */}
            </div>
        </div>
    )
}

export default Navbar
