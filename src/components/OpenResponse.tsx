import React from 'react';
import TextEditor from './TextEditor';

const OpenResponse = () => {
  return (
    <div className='w-full mb-5 bg-white'>
      <div className=' bg-indigo-200 cursor-pointer'>
        <div
          className='py-2 bg-indigo-200 text-center cursor-pointer'
          // onClick={() => setShowPanel(!showPanel)}
        >
          <h2 className='text-indigo-700 font-bold'>Open Response</h2>
        </div>
        {/* <TextEditor /> */}
      </div>
    </div>
  );
};

export default OpenResponse;
