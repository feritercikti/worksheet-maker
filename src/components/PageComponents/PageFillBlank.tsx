import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useState } from 'react';

interface PageFillBlank {
  id: string;
  index: number;
}

const PageFillBlank = ({ id, index }: PageFillBlank) => {
  const { words, fillwords } = useContext(WorkSheetContext);

  const currentWords = words[id] || [];

  return (
    <div className='w-full mt-2 bg-white'>
      <div className='flex flex-wrap gap-2 mt-2 '>
        {currentWords.map((word, index) => (
          <div key={index} className='break-all'>
            {fillwords[id] && fillwords[id].hidden[index]
              ? '_'.repeat(word.length).split('').join(' ')
              : word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageFillBlank;
