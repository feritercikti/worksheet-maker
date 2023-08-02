import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';

interface FillBlankProps {
  id: string;
  index: number;
}

const FillBlank = ({ id, index }: FillBlankProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [answerTypeLocal, setAnswerTypeLocal] = useState('none');

  const {
    setAnswerType,
    fillwords,
    words,
    updateWords,
    setHiddenWords,
    letterBlanks,
    setLetterBlanks,
    handleDeleteOption,
    columnNumbers,
    updateColumnNumber,
    answers,
    updateAnswers,
  } = useContext(WorkSheetContext);

  const currentWords = words[id] || [];

  const columnNumber = columnNumbers[id] || 1;

  const currentAnswers = answers[id] || [];

  const [inputWord, setInputWord] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleToggleLetterBlanks = () => {
    // Use the `setLetterBlanks` function from the context to toggle the state
    setLetterBlanks(id, !letterBlanks[id]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputWord(e.target.value);
    // Instantly update currentWords with the input value (separated by spaces)
    const wordsArray = e.target.value.split(' ').filter(Boolean);
    updateWords(id, wordsArray);
  };

  const handleWordClick = (clickedWord: string, wordIndex: number) => {
    // Toggle the visibility of the clicked word
    const currentFillWords = fillwords[id] || { words: [], hidden: [] };
    const newHiddenWords = [...currentFillWords.hidden];
    newHiddenWords[wordIndex] = !newHiddenWords[wordIndex];
    setHiddenWords(id, newHiddenWords);
  };

  const handleAnswerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAnswerType = e.target.value;
    setAnswerTypeLocal(newAnswerType); // Update the answerType state locally
    setAnswerType(id, newAnswerType); // Update the answerType in the context
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

  useEffect(() => {
    // Resize the textarea to fit its content
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputWord]);

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Fill in the Blank</h2>
      </div>
      {showPanel && (
        <div className='flex mx-6 flex-col mt-3 py-3 '>
          <div className='py-2 px-2 bg-gray-200'>
            <p className='text-[13px] text-center'>
              Click on words to replace them with blanks.
            </p>
            <div className='flex flex-wrap gap-2 mt-2 '>
              {currentWords.map((word, index) => (
                <div
                  key={index}
                  className={` rounded-lg break-all cursor-pointer px-1 ${
                    fillwords[id] && fillwords[id].hidden[index]
                      ? 'bg-indigo-400 text-white'
                      : 'bg-yellow-200 text-black'
                  }`}
                  onClick={() => handleWordClick(word, index)}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          <div key={index} className=' '>
            <textarea
              ref={inputRef}
              className=' w-full border-2 py-1 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400 resize-none overflow-y-hidden'
              value={inputWord}
              onChange={handleInputChange}
            />
          </div>
          <label className='flex w-fit items-center cursor-pointer'>
            <div className='relative w-10 h-4'>
              <input
                type='checkbox'
                className='sr-only'
                checked={letterBlanks[id]}
                onChange={handleToggleLetterBlanks}
              />
              <div
                className={`w-full h-full rounded-full shadow-inner ${
                  letterBlanks[id] ? 'bg-indigo-400' : 'bg-gray-300 '
                }`}
              ></div>
              <div
                className={`absolute left-0 top-0 w-4 h-4  rounded-full shadow-md transform transition-transform ${
                  letterBlanks[id]
                    ? 'translate-x-6 bg-white border border-gray-400'
                    : 'translate-x-0 bg-gray-400'
                }`}
              ></div>
            </div>
            <span className='ml-2 '>Letter Blanks</span>
          </label>
          <div className='mt-2 w-[70%]'>
            <h1 className='text-[13px] font-bold mb-2'>Answer Type</h1>
            <select
              className='select-dropdown w-full mt-1 bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              value={answerTypeLocal}
              onChange={handleAnswerTypeChange}
            >
              <option value='none'>None</option>
              <option value='blank'>Blank</option>
              <option value='multiple-choice'>Multiple Choice</option>
            </select>
          </div>
          {answerTypeLocal === 'multiple-choice' && (
            <div className='flex flex-col  py-3 gap-3'>
              <h1 className='text-[14px] font-bold '>Answer Options</h1>
              {currentAnswers.map((answer, index) => (
                <div key={index} className='relative '>
                  <input
                    className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                    value={answer}
                    placeholder='Option'
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
                className='px-2 py-1  bg-green-800 text-white'
              >
                Add New Option
              </button>
              <div
                className='
               text-[14px] mt-2 gap-2 flex flex-col'
              >
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

export default FillBlank;
