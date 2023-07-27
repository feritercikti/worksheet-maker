import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useContext } from 'react';

interface PageCheckListProps {
  id: string;
  direction: string;
  index: number;
}

const PageCheckList = ({ id, index, direction }: PageCheckListProps) => {
  const { checklistOptions, showDirections } = useContext(WorkSheetContext);
  const option = checklistOptions[id];
  const isShowDirections = showDirections[id] || false;

  return (
    <div className='w-full mt-2 bg-white'>
      {isShowDirections && (
        <div className='flex gap-2 w-full '>
          <h1>{index}.</h1>
          <h1
            dangerouslySetInnerHTML={{ __html: direction }}
            className='block break-words max-w-full'
          ></h1>
        </div>
      )}
      <div className='flex  mt-1'>
        {!isShowDirections && <h1>{index}.</h1>}
        <ul className='mx-3 gap-1'>
          {option?.map((opt, index) => (
            <li key={index} className='mb-1'>
              <div className='flex  pl-2 gap-2 items-center'>
                <span className='w-3 h-3 border border-black'></span>
                <p className='break-all'>{opt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageCheckList;
