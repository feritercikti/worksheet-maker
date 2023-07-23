import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageBasicTextProps {
  id: string;
  text: string;
}

const PageBasicText = ({ id, text }: PageBasicTextProps) => {
  return (
    <div className={`w-full mt-2 bg-white `}>
      <h1 dangerouslySetInnerHTML={{ __html: text }}></h1>
    </div>
  );
};

export default PageBasicText;
