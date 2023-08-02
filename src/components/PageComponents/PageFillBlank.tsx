import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageFillBlank {
  id: string;
  index: number;
}

const PageFillBlank = ({ id, index }: PageFillBlank) => {
  const {
    words,
    fillwords,
    letterBlanks,
    answerKey,
    answerType,
    answers,
    columnNumbers,
  } = useContext(WorkSheetContext);

  const answer = answers[id];
  const columnNumber = columnNumbers[id];

  const currentWords = words[id] || [];

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
  };

  return (
    <div className='w-full mt-2 bg-white'>
      <div className='flex flex-wrap gap-1 mt-2 '>
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
                        className={`  w-6 inline-block text-red-600 ${
                          letterIndex > 0 ? 'ml-1' : ''
                        }`}
                        style={{
                          textAlign: 'center',
                          borderBottom:
                            answerType[id] !== 'none'
                              ? '2px solid black'
                              : 'none',
                        }}
                      >
                        {answerKey && <>{letter}</>}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div>
                    {' '}
                    <span
                      className={` px-2 inline-block text-red-600 ${
                        !answerKey && 'text-opacity-0'
                      }`}
                      style={{
                        textAlign: 'center',
                        borderBottom:
                          answerType[id] !== 'none'
                            ? '2px solid black'
                            : 'none',
                      }}
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
      {answerType[id] === 'multiple-choice' && (
        <ul className='mx-4 mt-3' style={gridStyles}>
          {answer?.map((ans, index) => (
            <li key={index} className='mb-1'>
              <div className='flex  pl-2 '>
                <h1>{String.fromCharCode(65 + index)}.</h1>
                <p className='break-all'>{ans}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PageFillBlank;
