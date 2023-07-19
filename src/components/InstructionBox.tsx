import React, { useContext, useState } from 'react';
import TextEditor from './TextEditor';
import { WorkSheetContext } from '@/pages/context/WorkSheetContext';
import { HexColorPicker } from 'react-colorful';

import { MdDelete } from 'react-icons/md';

interface InstructionProps {
  id: string;
  index: number;
  onUpdate: (id: string, newInstruction: string) => void;
}

const InstructionBox = ({ id, index, onUpdate }: InstructionProps) => {
  const [instruction, setInstruction] = useState(
    'Write your instructions here'
  );
  const [show, setShow] = useState(true);

  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);
  const [border, setBorder] = useState('');

  const { setBorderSize, setBorderColor, setBorderStyle, handleDeleteOption } =
    useContext(WorkSheetContext);

  const handleInstructionChange = (newInstruction: string) => {
    setInstruction(newInstruction);
    onUpdate(id, newInstruction);
  };

  const borderChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setBorderSize(id, size);
  };

  const colorChanger = (newColor: string) => {
    setColor(newColor);
    setBorderColor(id, newColor);
  };

  const styleChanger = (style: string) => {
    setBorder(style);
    setBorderStyle(id, style);
  };

  return (
    <>
      <div className='w-full  bg-white'>
        <div
          className='py-2 bg-indigo-200 text-center cursor-pointer'
          onClick={() => setShow(!show)}
        >
          <h2 className='text-indigo-700 font-bold'>Instruction Box</h2>
        </div>
        {show && (
          <div className='flex flex-col '>
            <TextEditor val={instruction} onChange={handleInstructionChange} />
            <div className='flex justify-between  mx-6 mb-5 text-[14px]'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold'>Border Color</h2>
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
              <div className='flex flex-col mr-2'>
                <h2 className='font-bold text-[14px]'>Border</h2>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between text-[12px]'>
                    <p>Thin</p>
                    <p>Thick</p>
                  </div>
                  <input
                    type='range'
                    min='0'
                    max='8'
                    step={2}
                    defaultValue={0}
                    onChange={borderChanger}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col mx-6'>
              <h2 className='font-bold text-[14px]'>Border Style</h2>
              <div className='gap-2 flex justify-between text-[13px]'>
                <label>
                  Dashed
                  <div className='border-dashed border w-full h-[1px] my-1 border-black'></div>
                  <input
                    type='radio'
                    name={`border-${id}`}
                    className='mx-2'
                    checked={border === 'dashed'}
                    onChange={() => styleChanger('dashed')}
                  />
                </label>
                <label>
                  Solid
                  <div className='border-solid border w-full h-[1px] my-1 border-black'></div>
                  <input
                    type='radio'
                    name={`border-${id}`}
                    checked={border === 'solid'}
                    className='mx-2'
                    onChange={() => styleChanger('solid')}
                  />
                </label>
                <label>
                  Dotted
                  <div className='border-dotted border w-full h-[1px] my-1 border-black'></div>
                  <input
                    type='radio'
                    name={`border-${id}`}
                    checked={border === 'dotted'}
                    onChange={() => styleChanger('dotted')}
                    className='mx-2'
                  />
                </label>
                <label>
                  Double
                  <div className='border-double border w-full h-[1px] my-1 border-black'></div>
                  <input
                    type='radio'
                    name={`border-${id}`}
                    checked={border === 'double'}
                    onChange={() => styleChanger('double')}
                    className='mx-2'
                  />
                </label>
              </div>
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
    </>
  );
};

export default InstructionBox;
