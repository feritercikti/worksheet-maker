import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useState } from 'react';

interface PageFillBlank {
  id: string;
  index: number;
}

const PageFillBlank = ({ id, index }: PageFillBlank) => {
  const { words, fillwords, letterBlanks } = useContext(WorkSheetContext);

  const currentWords = words[id] || [];

  return (
    <div className='w-full mt-2 bg-white'>
      <div className='flex flex-wrap gap-2 mt-2 '>
        <h1>{index}.</h1>

        {currentWords.map((word, index) => (
          <div key={index} className='break-all'>
            {fillwords[id] && fillwords[id].hidden[index] ? (
              <div className='relative '>
                {letterBlanks[id] ? (
                  <div>
                    {' '}
                    {word.split('').map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className={`border-b-2 border-black w-6 inline-block text-red-600 ${
                          letterIndex > 0 ? 'ml-1' : ''
                        }`}
                        style={{ textAlign: 'center' }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div>
                    {' '}
                    <span
                      className='border-b-2 border-black px-4 inline-block text-red-600'
                      style={{ textAlign: 'center' }}
                    >
                      {word}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span>{word}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageFillBlank;
