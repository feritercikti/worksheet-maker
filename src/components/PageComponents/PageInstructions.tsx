import React, { useContext } from 'react';
import { WorkSheetContext } from '@/pages/context/WorkSheetContext';

interface PageInstructionsProps {
  id: string;
  instruction: string;
}

const PageInstructions = ({ id, instruction }: PageInstructionsProps) => {
  const { borderSizes, borderColors, borderStyles } =
    useContext(WorkSheetContext);
  const borderSize = borderSizes[id] || 0;
  const borderColor = borderColors[id] || 'black';
  const borderStyle = borderStyles[id] || 'solid';

  return (
    <div
      className={`w-full mt-2 bg-white ${
        borderSize !== 0 ? 'p-2 border-black ' : ''
      }
      `}
      style={{ borderWidth: `${borderSize}px`, borderColor, borderStyle }}
    >
      <h1 dangerouslySetInnerHTML={{ __html: instruction }}></h1>
    </div>
  );
};

export default PageInstructions;
