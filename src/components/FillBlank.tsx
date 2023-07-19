import React from 'react';

interface FillBlankProps {
  id: string;
  index: number;
}

const FillBlank = ({ id, index }: FillBlankProps) => {
  return (
    <div className='w-full mb-5 bg-white'>
      <div className='py-2 bg-indigo-200 text-center cursor-pointer'>
        <h2 className='text-indigo-700 font-bold'>Fill in the Blanks</h2>
      </div>
    </div>
  );
};

export default FillBlank;
