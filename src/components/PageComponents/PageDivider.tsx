import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageDividerProps {
  id: string;
  // index: number;
}

const getPageDividerBorderStyle = (style: string) => {
  switch (style) {
    case 'solid':
      return 'solid';
    case 'dashed':
      return 'dashed';
    case 'dotted':
      return 'dotted';
    case 'double':
      return 'double';
    default:
      return 'solid';
  }
};

const PageDivider = ({ id }: PageDividerProps) => {
  const {
    borderSizes,
    borderColors,
    borderStyles,
    lineThicknesses,
    topPaddings,
    bottomPaddings,
  } = useContext(WorkSheetContext);

  const dividerWidth = borderSizes[id] || 150;
  const thickness = lineThicknesses[id] || 4;
  const topPadding = topPaddings[id] || 4;
  const bottomPadding = bottomPaddings[id] || 4;
  const background = borderColors[id] || 'black';
  const borderStyle = borderStyles[id] || 'solid';

  return (
    <div className='w-full flex items-center justify-center '>
      <div
        className={` mt-3  
      `}
        style={{
          marginTop: `${topPadding}px`,
          marginBottom: `${bottomPadding}px`,
          borderTopStyle: getPageDividerBorderStyle(borderStyle),
          borderTopWidth: `${thickness}px`,
          borderTopColor: background,
          width: `${dividerWidth}px`,
        }}
      ></div>
    </div>
  );
};

export default PageDivider;
