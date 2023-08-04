import React, { useContext, useState } from 'react';
import TextEditor from './TextEditor';
import { WorkSheetContext } from '@/context/WorkSheetContext';
import { MdDelete } from 'react-icons/md';

interface OpenResponseProps {
  id: string;
  index: number;
}

const OpenResponse = ({ id, index }: OpenResponseProps) => {
  const [prompt, setPrompt] = useState('Write your prompt here');
  const [showPanel, setShowPanel] = useState(true);

  const {
    handleDeleteOption,
    handleTextChange,
    numberOfLines,
    setTopPadding,
    setNumberOfLines,
  } = useContext(WorkSheetContext);

  const handlePromptChanges = (newPrompt: string) => {
    setPrompt(newPrompt);
    handleTextChange(id, newPrompt);
  };

  const handleNumberOfLinesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setNumberOfLines(id, value);
  };

  const lineHeightChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setTopPadding(id, size);
  };

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Open Response</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col  py-3  '>
          <TextEditor val={prompt} onChange={handlePromptChanges} />
          <div className='mx-6 text-[14px] mt-2 gap-2 flex justify-between'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Lines</h1>
              <div className='flex gap-2'>
                {numberOfLines[id]}
                <input
                  type='range'
                  min='1'
                  max='30'
                  step={1}
                  defaultValue={numberOfLines[id] || 1}
                  onChange={handleNumberOfLinesChange}
                  className=''
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Line Height</h1>
              <input
                type='range'
                min='18'
                max='100'
                step={1}
                defaultValue={18}
                onChange={lineHeightChanger}
                className=''
              />
            </div>
          </div>
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

export default OpenResponse;
