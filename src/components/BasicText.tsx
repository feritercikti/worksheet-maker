import React, { useState, useContext, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import TextEditor from './TextEditor';
import { WorkSheetContext } from '@/context/WorkSheetContext';

interface BasicTextProps {
  id: string;
  index: number;
  val: string;
}

const BasicText = ({ id, index, val }: BasicTextProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [text, setText] = useState<string>(val);

  const { handleDeleteOption, handleTextChange } = useContext(WorkSheetContext);

  const handleTextChanger = (newText: string) => {
    setText(newText);
    handleTextChange(id, newText);
  };

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Basic Text</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col  py-3  '>
          <TextEditor val={text} onChange={handleTextChanger} />
        </div>
      )}
      <div className='w-full flex flex-col '>
        <span className='w-full bg-gray-300 h-[1px]'></span>
        <div className='w-full flex justify-end'>
          <MdDelete
            size={25}
            className=' text-red-500  m-2 cursor-pointer hover:text-red-800 '
            onClick={() => handleDeleteOption(id, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicText;
