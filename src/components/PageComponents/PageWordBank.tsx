import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext, useMemo } from 'react';

interface PageWordBank {
  id: string;
}

const PageWordBank = ({ id }: PageWordBank) => {
  const { borderSizes, borderColors, borderStyles, words } =
    useContext(WorkSheetContext);

  const borderSize = borderSizes[id] || 0;
  const borderColor = borderColors[id] || 'black';
  const borderStyle = borderStyles[id] || 'solid';
  const currentWords = useMemo(() => words[id] || [], [words, id]);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  };

  return (
    <div
      className={`w-full mt-2 bg-white ${
        borderSize !== 0 ? 'py-3 px-3  border-black ' : ''
      }
      `}
      style={{ borderWidth: `${borderSize}px`, borderColor, borderStyle }}
    >
      <ul style={gridStyles} className='flex gap-3'>
        {currentWords?.map((word, index) => (
          <li key={index}>
            <div className='flex  pl-2 '>
              <p className='break-all'>{word}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageWordBank;
