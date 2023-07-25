import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useState, useContext } from 'react';
import { HexColorPicker } from 'react-colorful';
import { MdDelete } from 'react-icons/md';

interface DividerProps {
  id: string;
  index: number;
}

const Divider = ({ id, index }: DividerProps) => {
  const [showPanel, setShowPanel] = useState(true);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);

  const {
    setBorderSize,
    setBorderColor,
    setBorderStyle,
    handleDeleteOption,
    setTopPadding,
    setLineThickness,
    setBottomPadding,
  } = useContext(WorkSheetContext);

  const widthChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setBorderSize(id, size);
  };

  const thicknessChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setLineThickness(id, size);
  };

  const topPaddingChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setTopPadding(id, size);
  };

  const bottomPaddingChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setBottomPadding(id, size);
  };

  const styleChanger = (style: string) => {
    setBorderStyle(id, style);
  };

  const colorChanger = (newColor: string) => {
    setColor(newColor);
    setBorderColor(id, newColor);
  };

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Divider</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col  py-3 gap-2'>
          <div className='mx-6 text-[14px] mt-2 gap-2 flex justify-between'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Divider Width</h1>
              <input
                type='range'
                min='150'
                max='750'
                step={1}
                defaultValue={150}
                onChange={widthChanger}
                className=''
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Line Thickness</h1>
              <input
                type='range'
                min='1'
                max='8'
                step={1}
                defaultValue={1}
                onChange={thicknessChanger}
                className=''
              />
            </div>
          </div>
          <div className='mx-6 text-[14px] mt-2 gap-2 flex justify-between'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Top Padding</h1>
              <input
                type='range'
                min='2'
                max='30'
                step={1}
                defaultValue={2}
                onChange={topPaddingChanger}
                className=''
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold'>Bottom Padding</h1>
              <input
                type='range'
                min='2'
                max='30'
                step={1}
                defaultValue={2}
                onChange={bottomPaddingChanger}
                className=''
              />
            </div>
          </div>
          <div className='flex flex-col mx-6'>
            <h2 className='font-bold text-[14px]'>Line Style</h2>
            <div className='flex w-full justify-between text-[13px]'>
              <label>
                Dashed
                <div className='border-dashed border w-full h-[1px] my-1 border-black'></div>
                <input
                  type='radio'
                  name={`border-${id}`}
                  className=' w-full'
                  onChange={() => styleChanger('dashed')}
                />
              </label>
              <label>
                Solid
                <div className='border-solid border w-full h-[1px] my-1 border-black'></div>
                <input
                  type='radio'
                  name={`border-${id}`}
                  className=' w-full'
                  onChange={() => styleChanger('solid')}
                />
              </label>
              <label>
                Dotted
                <div className='border-dotted  border w-full h-[1px] my-1 border-black'></div>
                <input
                  type='radio'
                  name={`border-${id}`}
                  onChange={() => styleChanger('dotted')}
                  className=' w-full'
                />
              </label>
              <label>
                Double
                <div className='border-double border w-full h-[1px] my-1 border-black'></div>
                <input
                  type='radio'
                  name={`border-${id}`}
                  onChange={() => styleChanger('double')}
                  className=' w-full'
                />
              </label>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-[14px] mx-6'>
            <h2 className='font-bold'>Color</h2>
            <div
              className='p-1 w-fit rounded-[1px] border border-gray-400'
              onClick={() => setShowPalette(!showPalette)}
            >
              <div
                className=' w-10 h-6 border border-white '
                style={{ backgroundColor: color }}
              ></div>
            </div>{' '}
            {showPalette && (
              <HexColorPicker color={color} onChange={colorChanger} />
            )}
          </div>
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

export default Divider;
