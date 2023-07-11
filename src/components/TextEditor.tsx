import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
const TextEditor = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  const [value, setValue] = useState<string>('Write your question here');
  return (
    <div className='w-full mb-5 bg-white'>
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
    </div>
  );
};

export default TextEditor;
