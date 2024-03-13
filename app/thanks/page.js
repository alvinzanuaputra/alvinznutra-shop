import Link from 'next/link';
import React from 'react';

const Page = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <div className='bg-white max-w-xl p-8 rounded shadow-md'>
                <h3 className='text-black text-sm font-medium py-2 px-2'>Thanks for your payment</h3>
                <Link href="/" className="block mt-4 rounded bg-blue-400 text-white py-2 px-2 text-sm font-medium transition hover:scale-105 text-center">Back to home</Link>
            </div>
        </div>
    );
}

export default Page;
