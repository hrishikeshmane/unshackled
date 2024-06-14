import { type BillboardTable } from "~/types/globals";

interface BillboardProps {
    data: BillboardTable
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    return (
        <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
            <div
                className='rounded-xl relative w-full max-h-[300px] overflow-hidden'
                style={{ backgroundImage: `url(${data?.imageUrl})` }}>
                    <div className='flex flex-col items-center justify-center w-full h-full text-center gap-y-8 py-10'>
                        <div className='max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl'>
                            {data?.label}
                        </div>
                        <div className='max-w-xs text-lg sm:text-xl lg:text-2xl sm:max-w-xl'>
                            {data?.description}
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Billboard;