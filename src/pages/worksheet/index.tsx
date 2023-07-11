import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from 'react-colorful';
import FontSizeChanger from '@/components/FontSizeChanger';
import MultipleChoice from '@/components/MultipleChoice';
import OpenResponse from '@/components/OpenResponse';
import FillBlank from '@/components/FillBlank';
import Checklist from '@/components/Checklist';
import InstructionBox from '@/components/InstructionBox';
import SectionHeader from '@/components/SectionHeader';
import PageCheckList from '@/components/PageComponents/PageCheckList';
import PageFillBlank from '@/components/PageComponents/PageFillBlank';
import PageOpenResponse from '@/components/PageComponents/PageOpenResponse';
import PageMultipleChoice from '@/components/PageComponents/PageMultipleChoice';
import PageInstructions from '@/components/PageComponents/PageInstructions';
import PageSectionHeader from '@/components/PageComponents/PageSectionHeader';

interface StudentInfo {
  name?: string;
  placeholder?: string;
  fontSize?: number;
}

const Worksheet = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [value, setValue] = useState<string>('My Worksheet Title');
  const [fontSize, setFontSize] = useState<number>(16);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);
  const [showStudentPalette, setShowStudentPalette] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([
    { name: 'Name', fontSize: 16 },
  ]);
  const [studentInfoColor, setStudentInfoColor] = useState('#000000');
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState(['']);

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  const handleFontSizeChange = (fontSize: number, type: string) => {
    if (type === 'title') {
      setFontSize(fontSize);
    } else if (type === 'info') {
      setStudentInfo((prevInfo) =>
        prevInfo.map((info) => ({ ...info, fontSize }))
      );
    }
  };

  const handleStudentInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setStudentInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = { ...updatedInfo[index], name: value };
      return updatedInfo;
    });
  };

  const handleAddInput = () => {
    setStudentInfo((prevInfo) => {
      const lastFontSize = prevInfo[prevInfo.length - 1]?.fontSize || 16;
      return [
        ...prevInfo,
        {
          name: '',
          placeholder: 'Name, Date, Age, Class, etc.',
          fontSize: lastFontSize,
        },
      ];
    });
  };

  const handleDeleteStudentInfo = (index: number) => {
    setStudentInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo.splice(index, 1);
      return updatedInfo;
    });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleAddClick = () => {
    setOptions((prevOptions) => [...prevOptions, selectedOption]);
  };

  return (
    <div className='flex  mt-20 mx-10 justif-center gap-10'>
      <div className='flex-[1.2_1.2_0%] mb-5  h-[600px]  overflow-y-auto px-2  top-5 sticky scrollbar'>
        <div className='w-full mb-5 bg-white'>
          <div className='py-2 bg-indigo-200 text-center cursor-pointer'>
            <h2 className='text-indigo-700 font-bold'>Worksheet Header</h2>
          </div>
          <div className='flex flex-col mx-6  py-3 gap-3'>
            <ReactQuill
              theme='snow'
              modules={modules}
              formats={formats}
              value={value}
              onChange={setValue}
              className='w-[330px]'
            />
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-[14px]'>Font color</h2>
                <div
                  className='p-1 w-fit rounded-[1px] border border-gray-400'
                  onClick={() => setShowPalette(!showPalette)}
                >
                  <div
                    className=' w-10 h-6 border border-white '
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
                {showPalette && (
                  <HexColorPicker color={color} onChange={setColor} />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-[14px]'>Font Size</h2>
                <FontSizeChanger
                  onChange={handleFontSizeChange}
                  initialValue={10}
                  type='title'
                />
              </div>
            </div>
            <h3 className='font-bold'>Student Info</h3>
            {studentInfo.map((info, idx) => (
              <div key={idx} className='relative'>
                {' '}
                <input
                  className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                  value={info.name || ''}
                  placeholder={info.placeholder}
                  onChange={(e) => handleStudentInfoChange(e, idx)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className='absolute px-2 bg-gray-300 py-[8px] cursor-pointer hover:bg-gray-500 right-0  top-1/2 transform -translate-y-1/2'
                  onClick={() => handleDeleteStudentInfo(idx)}
                />
              </div>
            ))}
            <button
              onClick={handleAddInput}
              className='px-2 py-1 bg-green-800 text-white'
            >
              Add New Field
            </button>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-[14px]'>Font color</h2>
                <div
                  className='p-1 w-fit rounded-[1px] border border-gray-400'
                  onClick={() => setShowStudentPalette(!showStudentPalette)}
                >
                  <div
                    className=' w-10 h-6 border border-white '
                    style={{ backgroundColor: studentInfoColor }}
                  ></div>
                </div>
                {showStudentPalette && (
                  <HexColorPicker
                    color={studentInfoColor}
                    onChange={setStudentInfoColor}
                  />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-[14px]'>Font Size</h2>
                <FontSizeChanger
                  onChange={handleFontSizeChange}
                  initialValue={fontSize}
                  type='info'
                />
              </div>
            </div>
          </div>
        </div>
        {options.map((option, index) => (
          <div key={index}>
            {option === 'multiple-choice' && <MultipleChoice />}
            {option === 'open-response' && <OpenResponse />}
            {option === 'fill-in-the-blank' && <FillBlank />}
            {option === 'checklist' && <Checklist />}
            {option === 'instruction-box' && <InstructionBox />}
            {option === 'section-header' && <SectionHeader />}
          </div>
        ))}
        <div className='w-full items-center justify-center flex gap-2 '>
          <select
            className='select-dropdown bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value='open-response'>Open Response</option>
            <option value='multiple-choice'>Multiple Choice</option>
            <option value='fill-in-the-blank'>Fill in the blank</option>
            <option value='checklist'>Checklist</option>
            <option value='instruction-box'>Instruction box</option>
            <option value='section-header'>Section Header</option>
          </select>
          <button
            className='add-button bg-blue-500 text-white py-2 px-4  shadow hover:bg-blue-600'
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>

      <div className='flex-[3_3_0%] flex '>
        <div className='flex flex-col h-[900px] mb-20 gap-2 ml-12 bg-white w-[800px] p-10'>
          <div className='flex justify-between w-full flex-end'>
            <h1
              dangerouslySetInnerHTML={{ __html: value }}
              className='text-3xl '
              style={{
                color: color,
                fontSize: `${fontSize}px`,
                lineHeight: '1',
              }}
            ></h1>

            <div className='flex flex-col gap-2 items-end'>
              {studentInfo.map((info, idx) => (
                <div key={idx} className='flex items-end justify-center gap-2'>
                  <h2
                    style={{
                      color: studentInfoColor,
                      fontSize: `${info.fontSize}px`,
                    }}
                  >
                    {info.name}:
                  </h2>
                  <span className='w-[140px] bg-black h-[1px]'></span>
                </div>
              ))}
            </div>
          </div>
          {options.map((option, index) => (
            <div key={index}>
              {option === 'multiple-choice' && <PageMultipleChoice />}
              {option === 'open-response' && <PageOpenResponse />}
              {option === 'fill-in-the-blank' && <PageFillBlank />}
              {option === 'checklist' && <PageCheckList />}
              {option === 'instruction-box' && <PageInstructions />}
              {option === 'section-header' && <PageSectionHeader />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
