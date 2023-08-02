import { WorkSheetContext } from '@/context/WorkSheetContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import { BsGithub } from 'react-icons/bs';

const Header = () => {
  return (
    <div className='flex w-full justify-between z-[99] bg-[#4f40ae] top-0 sticky'>
      <div className=' flex  items-center px-5 my-2 gap-3'>
        <Image
          src='/worksheeticon.png'
          width={50}
          height={50}
          alt='worksheet-icon'
        />
        <h1 className='text-white text-2xl font-bold'>My Worksheet Maker</h1>
      </div>
      <div className='flex items-center text-white justify-center mr-10 '>
        <a href='https://github.com/feritercikti' target='_blank'>
          <BsGithub size={30} className='hover:text-gray-200 cursor-pointer' />
        </a>
      </div>
    </div>
  );
};

export default Header;
