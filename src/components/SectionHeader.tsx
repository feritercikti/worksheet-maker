import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useState, useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import TextEditor from './TextEditor';
import { HexColorPicker } from 'react-colorful';
import { BsJustifyLeft, BsJustifyRight, BsJustify } from 'react-icons/bs';

interface SectionHeaderProps {
  id: string;
  index: number;
}

type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

const SectionHeader = ({ id, index }: SectionHeaderProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [header, setHeader] = useState<string>('Enter your header Information');
  const {
    handleDeleteOption,
    setFontColor,
    setFontSize,
    fontSizes,
    setTextAlignment,
    handleHeaderChange,
  } = useContext(WorkSheetContext);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);

  const fontSize = fontSizes[id] || 26;

  const handleHeaderChanged = (newHeader: string) => {
    setHeader(newHeader);
    handleHeaderChange(id, newHeader);
  };

  const colorChanger = (newColor: string) => {
    setColor(newColor);
    setFontColor(id, newColor);
  };

  const fontSizeChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setFontSize(id, size);
  };

  const fontAlignChanger = (align: TextAlign) => {
    setTextAlignment(id, align);
  };

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Section Header</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col  py-3  '>
          {showPanel && (
            <div className='flex flex-col '>
              <TextEditor val={header} onChange={handleHeaderChanged} />
              <div className='flex  gap-2 mx-6 justify-between'>
                <div className='flex flex-col gap-2'>
                  <h2 className='font-bold text-[14px]'>Font Color</h2>
                  <div
                    className='p-1 w-fit rounded-[1px] border border-gray-400'
                    onClick={() => setShowPalette(!showPalette)}
                  >
                    <div
                      className=' w-10 h-6 border border-white '
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                </div>
                <div className='flex flex-col mr-2 '>
                  <h2 className='font-bold text-[14px] '>Font Size</h2>
                  <div className='flex flex-col  mt-3'>
                    <input
                      type='range'
                      min='10'
                      max='52'
                      step={1}
                      value={fontSize}
                      onChange={fontSizeChanger}
                    />
                    <p className='text-[14px]'>{fontSize}px</p>
                  </div>
                </div>
              </div>
              {showPalette && (
                <HexColorPicker
                  color={color}
                  onChange={colorChanger}
                  className='mx-6 my-2'
                />
              )}
              <div className='mx-6 mt-2'>
                <h2 className='font-bold text-[14px] '>Alignment</h2>
                <div className='flex gap-2 mt-2 text-[22px]'>
                  <div
                    className='bg-gray-200 p-2 cursor-pointer hover:bg-gray-300'
                    onClick={() => fontAlignChanger('left')}
                  >
                    <BsJustifyLeft />
                  </div>
                  <div
                    className='bg-gray-200 p-2 cursor-pointer hover:bg-gray-300'
                    onClick={() => fontAlignChanger('center')}
                  >
                    <BsJustify />
                  </div>
                  <div
                    className='bg-gray-200 p-2 cursor-pointer hover:bg-gray-300'
                    onClick={() => fontAlignChanger('right')}
                  >
                    <BsJustifyRight />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className='w-full flex flex-col '>
        <span className='w-full bg-gray-300 h-[1px]'></span>
        <div className='w-full flex justify-end'>
          <MdDelete
            size={25}
            className=' text-red-500  m-2 cursor-pointer hover:text-red-800 '
            onClick={() => handleDeleteOption(id, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
