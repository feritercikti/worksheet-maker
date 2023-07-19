import React, { useContext, useState } from 'react';
import TextEditor from './TextEditor';
import { MdDelete } from 'react-icons/md';
import { WorkSheetContext } from '@/pages/context/WorkSheetContext';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AddOption from './AddOption';

interface MultipleChoiceProps {
  id: string;
  index: number;
  onUpdate: (id: string, newQuestion: string) => void;
}

const MultipleChoice = ({ id, onUpdate, index }: MultipleChoiceProps) => {
  const {
    answers,
    updateAnswers,
    columnNumbers,
    updateColumnNumber,
    handleDeleteOption,
  } = useContext(WorkSheetContext);

  const currentAnswers = answers[id] || [];

  const [question, setQuestion] = useState<string>('Write your question here');
  const [showPanel, setShowPanel] = useState(true);

  const columnNumber = columnNumbers[id] || 1;

  const handleQuestionChange = (newQuestion: string) => {
    setQuestion(newQuestion);
    onUpdate(id, newQuestion);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...currentAnswers];
    updatedAnswers[index] = value;
    updateAnswers(id, updatedAnswers);
  };

  const handleDeleteAnswer = (index: number) => {
    const updatedAnswers = [...currentAnswers];
    updatedAnswers.splice(index, 1);
    updateAnswers(id, updatedAnswers);
  };

  const handleAddAnswer = () => {
    const newAnswer = '';
    const updatedAnswers = [...currentAnswers, newAnswer];
    updateAnswers(id, updatedAnswers);
  };

  const handleColumnNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumnNumber = parseInt(e.target.value);
    updateColumnNumber(id, newColumnNumber);
  };

  return (
    <>
      <div className='w-full  bg-white'>
        <div
          className='py-2 bg-indigo-200 text-center cursor-pointer'
          onClick={() => setShowPanel(!showPanel)}
        >
          <h2 className='text-indigo-700 font-bold'>Multiple Choice</h2>
        </div>
        {showPanel && (
          <div className='flex flex-col  py-3 gap-3'>
            <TextEditor val={question} onChange={handleQuestionChange} />
            <h1 className='text-[14px] font-bold mx-6'>Answer Options</h1>
            {currentAnswers.map((answer, index) => (
              <div key={index} className='relative mx-6'>
                <input
                  className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                  value={answer}
                  placeholder='Add New Option'
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <MdDelete
                  size={25}
                  className='hover:bg-gray-200 h-full absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2'
                  onClick={() => handleDeleteAnswer(index)}
                />
              </div>
            ))}
            <button
              onClick={handleAddAnswer}
              className='px-2 py-1 mx-6 bg-green-800 text-white'
            >
              Add New Option
            </button>
            <div className='mx-6 text-[14px] mt-2 gap-2 flex flex-col'>
              <div className='flex justify-between '>
                <h1 className='font-bold'>Number of Columns</h1>
                <p>{columnNumber}</p>
              </div>
              <input
                type='range'
                min='1'
                max='4'
                step={1}
                value={columnNumber}
                defaultValue={1}
                onChange={handleColumnNumberChange}
                className=''
              />
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
    </>
  );
};

export default MultipleChoice;
