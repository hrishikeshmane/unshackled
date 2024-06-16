import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Logo } from './icons'
import { Button } from './ui/button'
// import Cart from './Cart'
// import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'
import { ChevronDown } from 'lucide-react'
import { cn } from '~/lib/utils'
import { api } from '~/trpc/server'
import Cart from './cart'
import NavItems from './NavItems'
import UserAuthButton from './user-auth-button'

const Navbar = async () => {

  const stores = await api.store.getStores();

  return (
        <MaxWidthWrapper>
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* <MobileNav /> */}

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems data={stores} />
                </div>

              <div className='ml-auto flex items-center'>
                {/* <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'> */}
                <div className='flex flex-1 items-center justify-end space-x-6'>


                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                    <UserAuthButton />
                </div>
              </div>
            </div>
          </div>
      </header>
    </div>
        </MaxWidthWrapper>
  )
}

export default Navbar
