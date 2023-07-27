import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useState } from 'react';

interface FillBlankProps {
  id: string;
  index: number;
}

const FillBlank = ({ id, index }: FillBlankProps) => {
  const [showPanel, setShowPanel] = useState(true);

  const { fillwords, words, updateWords, setHiddenWords, hiddenWords } =
    useContext(WorkSheetContext);

  const currentWords = words[id] || [];

  const [inputWord, setInputWord] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <input
              className='w-full border-2 py-1 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
              value={inputWord}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FillBlank;
