import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col gap-1 items-center justify-around w-full p-1 fixed bottom-0'>
            <div className="logo font-bold text-xl cursor-pointer">
                <span className='text-green-400'>&lt;</span>
                Pass
                <span className='text-green-400'>OP/&gt;</span>
            </div>
            <div className='text-sm'>
                Created by BitWiseNexus
            </div>
        </div>
    )
}

export default Footer
