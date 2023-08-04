import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageOpenResponseProps {
  id: string;
  prompt: string;
  index: number;
}

const PageOpenResponse = ({ id, prompt, index }: PageOpenResponseProps) => {
  const { numberOfLines, topPaddings } = useContext(WorkSheetContext);

  const topPadding = topPaddings[id] || 18;

  const lines = Array.from({ length: numberOfLines[id] || 2 }, (_, index) => (
    <div
      key={index}
      className='bg-black h-[1px] w-full'
      style={{ marginTop: `${topPadding}px` }}
    ></div>
  ));

  return (
    <div className='w-full mt-2 flex flex-col  bg-white '>
      <div className='flex gap-1'>
        <h1>{index}.</h1>
        <h1
          dangerouslySetInnerHTML={{ __html: prompt }}
          className='whitespace-nowrap'
        ></h1>
      </div>
      {lines}
      {/* <div className='bg-black h-[2px] w-full self-end'></div> */}
    </div>
  );
};

export default PageOpenResponse;
