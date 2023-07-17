import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';

interface TextEditorProps {
  val?: string;
  onChange: (newInstruction: string) => void;
}
const TextEditor = ({ val, onChange }: TextEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  const [value, setValue] = useState<string>(val || '');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className='w-full bg-white'>
      <div className='flex flex-col mx-6  py-3 gap-3'>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={value}
          onChange={handleValueChange}
          className='w-[330px]'
        />
      </div>
    </div>
  );
};

export default TextEditor;
