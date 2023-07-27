import { WorkSheetContext } from '@/context/WorkSheetContext';
import React, { useState, useContext, useMemo } from 'react';
import { HexColorPicker } from 'react-colorful';
import { MdDelete } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';

interface WordBankProps {
  id: string;
  index: number;
}

const WordBank = ({ id, index }: WordBankProps) => {
  const {
    handleDeleteOption,
    words,
    updateWords,
    setBorderColor,
    setBorderSize,
    setBorderStyle,
  } = useContext(WorkSheetContext);

  const [showPanel, setShowPanel] = useState(true);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);
  const [border, setBorder] = useState('');
  const [extraOptions, setExtraOptions] = useState(false);
  const [sortingOption, setSortingOption] = useState('');
  const [textCaseOption, setTextCaseOption] = useState('');

  const currentWords = useMemo(() => {
    return words[id] || [];
  }, [words, id]);

  const handleSortingOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);

    let sortedWords: string[] = [];

    if (selectedOption === 'alphabetically') {
      sortedWords = [...currentWords].sort();
    } else if (selectedOption === 'random') {
      sortedWords = [...currentWords];
      for (let i = sortedWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortedWords[i], sortedWords[j]] = [sortedWords[j], sortedWords[i]];
      }
    } else {
      return;
    }

    updateWords(id, sortedWords);
  };

  const toTitleCase = (str: string) => {
    return str.replace(
      /\b\w+/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
  };

  const handleTextCaseOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = e.target.value;
    setTextCaseOption(selectedOption);

    let modifiedWords: string[] = [];
    if (selectedOption === 'title-case') {
      modifiedWords = currentWords.map(toTitleCase);
    } else if (selectedOption === 'uppercase') {
      modifiedWords = currentWords.map((word) => word.toUpperCase());
    } else if (selectedOption === 'lowercase') {
      modifiedWords = currentWords.map((word) => word.toLowerCase());
    } else {
      return;
    }
    updateWords(id, modifiedWords || []);
  };

  const handleWordChange = (index: number, value: string) => {
    const updatedWords = [...currentWords];
    updatedWords[index] = value;
    updateWords(id, updatedWords);
  };

  const handleDeleteWord = (index: number) => {
    const updatedWords = [...currentWords];
    updatedWords.splice(index, 1);
    updateWords(id, updatedWords);
  };

  const handleAddWord = () => {
    const newWords = '';
    const updatedWords = [...currentWords, newWords];
    updateWords(id, updatedWords);
  };

  const colorChanger = (newColor: string) => {
    setColor(newColor);
    setBorderColor(id, newColor);
  };

  const borderChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(e.target.value);
    setBorderSize(id, size);
  };

  const styleChanger = (style: string) => {
    setBorder(style);
    setBorderStyle(id, style);
  };

  return (
    <div className='w-full  bg-white'>
      <div
        className='py-2 bg-indigo-200 text-center cursor-pointer'
        onClick={() => setShowPanel(!showPanel)}
      >
        <h2 className='text-indigo-700 font-bold'>Word Bank</h2>
      </div>
      {showPanel && (
        <div className='flex flex-col mt-3 py-3 gap-2'>
          {currentWords.map((word, index) => (
            <div key={index} className='relative mx-6'>
              <input
                className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                value={word}
                placeholder='Add Word'
                onChange={(e) => handleWordChange(index, e.target.value)}
              />
              <MdDelete
                size={25}
                className='hover:bg-gray-200 h-full absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2'
                onClick={() => handleDeleteWord(index)}
              />
            </div>
          ))}
          <button
            onClick={handleAddWord}
            className='px-2 py-1 mx-6 bg-green-800 text-white'
          >
            Add Word
          </button>
          <div className='flex flex-col mx-6 mt-1'>
            <div className='flex w-full  gap-2'>
              <div className='flex-1 '>
                <h1 className='text-[13px] font-bold'>Sort Words</h1>
                <select
                  className='select-dropdown w-full mt-1 bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  value={sortingOption}
                  onChange={handleSortingOptionChange}
                >
                  <option value=''>Choose Option</option>
                  <option value='alphabetically'>Alphabetically</option>
                  <option value='random'>Random</option>
                </select>
              </div>
              <div className='flex-1  '>
                <h1 className='text-[13px] font-bold'>Text Case</h1>
                <select
                  className='select-dropdown w-full mt-1 bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  value={textCaseOption}
                  onChange={handleTextCaseOptionChange}
                >
                  <option value=''>Choose Option</option>
                  <option value='title-case'>Title Case</option>
                  <option value='uppercase'>UPPERCASE</option>
                  <option value='lowercase'>lowercase</option>
                </select>
              </div>
            </div>
            <div className='my-2 flex w-full items-center justify-center'>
              <button onClick={() => setExtraOptions(!extraOptions)}>
                <HiOutlineDotsCircleHorizontal
                  size={25}
                  className='cursor-pointer hover:text-gray-600'
                />
              </button>
            </div>
            {extraOptions && (
              <>
                <h1 className='text-center font-bold'>
                  Word Bank Border Options
                </h1>
                <div className='flex w-full mt-3 text-[14px] justify-between'>
                  <div className='flex flex-col gap-2'>
                    <h2 className='font-bold'>Line Color</h2>
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
                    <h2 className='font-bold text-[14px]'>Line Thickness</h2>
                    <div className='flex flex-col gap-2'>
                      <div className='flex justify-between text-[12px]'>
                        <p>Thin</p>
                        <p>Thick</p>
                      </div>
                      <input
                        type='range'
                        min='0'
                        max='12'
                        step={2}
                        defaultValue={0}
                        onChange={borderChanger}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col mt-4'>
                  <h2 className='font-bold text-[14px]'>Line Style</h2>
                  <div className='flex w-full justify-between text-[13px]'>
                    <label>
                      Dashed
                      <div className='border-dashed border w-full h-[1px] my-1 border-black'></div>
                      <input
                        type='radio'
                        name={`border-${id}`}
                        className=' w-full'
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
                        checked={border === 'dotted'}
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
                        checked={border === 'double'}
                        onChange={() => styleChanger('double')}
                        className=' w-full'
                      />
                    </label>
                  </div>
                </div>
              </>
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

export default WordBank;
