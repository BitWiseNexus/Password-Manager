import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
    <div className='md:mycontainer flex items-center justify-around py-4'>
        <div className="logo font-bold text-2xl cursor-pointer">
            <span className='text-green-400'>&lt;</span>
                Pass
            <span className='text-green-400'>OP/&gt;</span>
        </div>

        <button className='text-white bg-slate-700 rounded-full flex gap-2 items-center p-1 ring-2 ring-slate-600'>
        <FaGithub className='size-7' />
          <span className='font-bold px-1'><a href="https://github.com/CodeWithHarry/Sigma-Web-Dev-Course">GitHub</a></span>
        </button>
      
    </div>
    </nav>
  )
}

export default Navbar
