import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface AddOptionProps {
  selectedOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddClick: () => void;
  setShowAddOption: (show: boolean) => void;
}

const AddOption = ({
  selectedOption,
  handleOptionChange,
  handleAddClick,
  setShowAddOption,
}: AddOptionProps) => {
  return (
    <div className='w-full bg-white items-center justify-center flex  relative mb-5'>
      <select
        className='select-dropdown bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full'
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value='open-response'>Open Response</option>
        <option value='multiple-choice'>Multiple Choice</option>
        <option value='fill-in-the-blank'>Fill in the blank</option>
        <option value='checklist'>Checklist</option>
        <option value='instruction-box'>Instruction box</option>
        <option value='section-header'>Section Header</option>
      </select>
      <button
        className='add-button bg-blue-500 text-white py-2 px-4  shadow hover:bg-blue-600'
        onClick={handleAddClick}
      >
        Add
      </button>
      <button onClick={() => setShowAddOption(false)}>
        <AiOutlineCloseCircle
          className='text-white bg-gray-800 hover:bg-gray-500 rounded-[50%] cursor-pointer absolute -right-2 -top-2'
          size={20}
        />
      </button>
    </div>
  );
};

export default AddOption;
