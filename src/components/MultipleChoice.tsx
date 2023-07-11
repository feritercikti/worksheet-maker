import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';

const MultipleChoice = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [value, setValue] = useState<string>('Write your question here');
  const [showPanel, setShowPanel] = useState(true);

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  return (
    <div className='w-full mb-5 bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Multiple Choice</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col mx-6  py-3 gap-3'>
          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
            className='w-[300px]'
          />
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
