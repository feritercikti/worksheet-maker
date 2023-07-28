import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface FillBlankProps {
  id: string;
  index: number;
}

const FillBlank = ({ id, index }: FillBlankProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const {
    fillwords,
    words,
    updateWords,
    setHiddenWords,
    hiddenWords,
    letterBlanks,
    setLetterBlanks,
  } = useContext(WorkSheetContext);

  const currentWords = words[id] || [];

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
          <label className='flex items-center cursor-pointer'>
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
            <span className='ml-2 text-gray-700'>Letter Blanks</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default FillBlank;
