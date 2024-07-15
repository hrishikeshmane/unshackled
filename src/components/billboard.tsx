// import { type BillboardTable } from "~/types/globals";

// interface BillboardProps {
//     data: BillboardTable
// };

// const Billboard: React.FC<BillboardProps> = ({ data }) => {
//     return (
//         <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
//             <div
//                 className='rounded-xl relative w-full max-h-[300px] overflow-hidden'
//                 style={{ backgroundImage: `url(${data?.imageUrl})` }}>
//                     <div className='flex flex-col items-center justify-center w-full h-full text-center gap-y-8 py-10'>
//                         <div className='max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl'>
//                             {data?.label}
//                         </div>
//                         <div className='max-w-xs text-lg sm:text-xl lg:text-2xl sm:max-w-xl'>
//                             {data?.description}
//                         </div>
//                     </div>
//                 </div>
//         </div>
//     );
// }

// export default Billboard;

import React from 'react';
import { type BillboardTable } from "~/types/globals";

interface BillboardProps {
    data: BillboardTable
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    return (
        <div className='p-4 sm:p-6 lg:p-8'>
            <div className='relative w-full h-[300px] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl'>
                <div 
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${data?.imageUrl})` }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent'>
                    <div className='flex flex-col items-center justify-center w-full h-full text-center p-6'>
                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 max-w-xl'>
                            {data?.label}
                        </h2>
                        <p className='text-lg sm:text-xl lg:text-2xl text-white text-opacity-90 max-w-xl'>
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;