import React, { useState, useContext } from 'react';
import TextEditor from './TextEditor';
import { WorkSheetContext } from '@/pages/context/WorkSheetContext';
import { MdDelete } from 'react-icons/md';
import AddOption from './AddOption';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface ChecklistProps {
  id: string;
  index: number;
  onUpdate: (id: string, newQuestion: string) => void;
}

const Checklist = ({ id, onUpdate, index }: ChecklistProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [direction, setDirection] = useState<string>(
    'Write your direction here'
  );

  const {
    checklistOptions,
    updateCheckList,
    showDirections,
    setShowDirections,
    handleDeleteOption,
  } = useContext(WorkSheetContext);

  const currentList = checklistOptions[id] || [];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowDirections(id, event.target.checked);
  };

  const handleDirectionChange = (newDirection: string) => {
    setDirection(newDirection);
    onUpdate(id, newDirection);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...currentList];
    updatedOptions[index] = value;
    updateCheckList(id, updatedOptions);
  };

  const handleDeleteListOption = (index: number) => {
    const updatedList = [...currentList];
    updatedList.splice(index, 1);
    updateCheckList(id, updatedList);
  };

  const handleAddOption = () => {
    const newOption = '';
    const updatedList = [...currentList, newOption];
    updateCheckList(id, updatedList);
  };

  return (
    <>
      <div className='w-full  bg-white'>
        <div
          className='py-2 bg-indigo-200 text-center cursor-pointer'
          onClick={() => setShowPanel(!showPanel)}
        >
          <h2 className='text-indigo-700 font-bold'>CheckList</h2>
        </div>
        {showPanel && (
          <div className='flex flex-col  py-3  '>
            <div className='flex items-center gap-2 mx-6'>
              <input
                className=' border-2 h-[15px] w-[15px] px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                type='checkbox'
                checked={showDirections[id] || false}
                onChange={handleCheckboxChange}
              />
              <h2 className='font-bold '>Directions</h2>
            </div>
            {showDirections[id] && (
              <TextEditor val={direction} onChange={handleDirectionChange} />
            )}
            <h1 className='text-[14px] font-bold mx-6 mt-2'>
              Checklist Options
            </h1>
            {currentList.map((option, index) => (
              <div key={index} className='relative mx-6 mb-1 '>
                <input
                  className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                  value={option}
                  placeholder='Add New Option'
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <MdDelete
                  size={25}
                  className='hover:bg-gray-200 h-full absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2'
                  onClick={() => handleDeleteListOption(index)}
                />
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className='px-2 py-1 mx-6 mt-1 bg-green-800 text-white'
            >
              Add New Option
            </button>
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
    </>
  );
};

export default Checklist;
