import React, { useContext, useState } from 'react';
import TextEditor from './TextEditor';
import { WorkSheetContext } from '@/context/WorkSheetContext';

interface OpenResponseProps {
  id: string;
  index: number;
}

const OpenResponse = ({ id, index }: OpenResponseProps) => {
  const [prompt, setPrompt] = useState('Write your prompt here');
  const [showPanel, setShowPanel] = useState(true);

  const { handlePromptChange, handleDeleteOption } =
    useContext(WorkSheetContext);

  const handlePromptChanges = (newPrompt: string) => {
    setPrompt(newPrompt);
    handlePromptChange(id, newPrompt);
  };

  return (
    <div className='w-full mb-5 bg-white'>
      <div className=' bg-indigo-200 cursor-pointer'>
        <div
          className='py-2 bg-indigo-200 text-center cursor-pointer'
          onClick={() => setShowPanel(!showPanel)}
        >
          <h2 className='text-indigo-700 font-bold'>Open Response</h2>
        </div>
        {showPanel && (
          <div className='flex flex-col '>
            <TextEditor val={prompt} onChange={handlePromptChanges} />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenResponse;
