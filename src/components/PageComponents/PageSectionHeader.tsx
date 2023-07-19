import { WorkSheetContext } from '@/pages/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageSectionProps {
  id: string;
  header: string;
}

const PageSectionHeader = ({ id, header }: PageSectionProps) => {
  const { fontColors, fontSizes, textAlignments } =
    useContext(WorkSheetContext);

  const fontColor = fontColors[id] || 'black';
  const fontSize = fontSizes[id] || 26;
  const textAlignment = textAlignments[id] || 'left';

  return (
    <div
      className={`w-full mt-2 bg-white `}
      style={{ color: fontColor, textAlign: textAlignment }}
    >
      <h1
        dangerouslySetInnerHTML={{ __html: header }}
        style={{ fontSize: fontSize }}
      ></h1>
    </div>
  );
};

export default PageSectionHeader;
