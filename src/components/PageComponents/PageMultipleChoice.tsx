import { WorkSheetContext } from '@/pages/context/WorkSheetContext';
import React, { useContext, useState, useEffect } from 'react';

interface PageMultipleChoiceProps {
  id: string;
  question: string;
  index: number;
}

const PageMultipleChoice = ({
  id,
  question,
  index,
}: PageMultipleChoiceProps) => {
  const { answers, columnNumbers } = useContext(WorkSheetContext);
  const answer = answers[id];
  const columnNumber = columnNumbers[id];

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnNumber}, 1fr)`,
    gap: '1rem',
  };

  return (
    <div
      className={`w-full mt-2 bg-white 
      `}
    >
      <div className='flex gap-2'>
        <h1>{index}.</h1>
        <h1 dangerouslySetInnerHTML={{ __html: question }}></h1>
      </div>
      <ul className='mx-4 mt-3' style={gridStyles}>
        {answer?.map((ans, index) => (
          <li key={index} className='mb-1'>
            <div className='flex gap-2'>
              <h1>{String.fromCharCode(65 + index)}.</h1>
              {ans}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageMultipleChoice;
