import Image from 'next/image'
import React from 'react'
import Logo from '@/public/images/2 - icon logo white 1.png'

const Navbar = () => {
  return (
    <div className='flex bg-[#296573] h-[80px] w-full fixed justify-center'>
        <div className='flex flex-row justify-between items-center w-4/5'>
            <h1 className='text-white'>Enos Weather Forecaster</h1>
            <Image src={Logo} width={29} height={29} alt='logo'/>

        </div>
      
    </div>
  )
}

export default Navbar
