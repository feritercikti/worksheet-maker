import dynamic from 'next/dynamic';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
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
import PageContainer from '@/components/PageComponents/PageContainer';
import { v4 as uuidv4 } from 'uuid';

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
  const [fontSize, setFontSize] = useState<number>(26);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);
  const [showStudentPalette, setShowStudentPalette] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([
    { name: 'Name', fontSize: 16 },
  ]);
  const [studentInfoColor, setStudentInfoColor] = useState('#000000');
  const [selectedOption, setSelectedOption] = useState('open-response');
  const [options, setOptions] = useState<{ id: string; optionType: string }[]>(
    []
  );
  const [instructions, setInstructions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

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
    const newOption = {
      id: uuidv4(),
      optionType: selectedOption,
    };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const handleInstructionChange = (id: string, newInstruction: string) => {
    setInstructions((prevInstructions) => {
      const updatedInstructions: string[] = [...prevInstructions];
      const index = options.findIndex((option) => option.id === id);
      if (index !== -1) {
        updatedInstructions[index] = newInstruction;
      }
      return updatedInstructions;
    });
  };

  const handleQuestionChange = (id: string, newQuestion: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions: string[] = [...prevQuestions];
      const index = options.findIndex((option) => option.id === id);
      if (index !== -1) {
        updatedQuestions[index] = newQuestion;
      }
      return updatedQuestions;
    });
  };

  const handleDeleteOption = (id: string, index?: number) => {
    setOptions((prevOptions) => {
      const updatedOptions = prevOptions.filter((option) => option.id !== id);
      return updatedOptions;
    });

    setInstructions((prevInstructions) => {
      const updatedInstructions = prevInstructions.filter(
        (_, i) => i !== index
      );
      return updatedInstructions;
    });
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((_, i) => i !== index);
      return updatedQuestions;
    });
  };

  console.log(options);

  return (
    <div className='flex  mt-20 mx-10 justif-center gap-10'>
      <div className='flex-[1.2_1.2_0%] mb-5  h-[600px]  overflow-y-auto px-2  top-5 sticky scrollbar'>
        <div className='w-full mb-5 bg-white'>
          <div className='py-2 bg-indigo-200 text-center cursor-pointer'>
            <h2 className='text-indigo-700 font-bold'>Worksheet Header</h2>
          </div>
          <div className='flex flex-col mx-6 py-3 gap-3'>
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
              <div className='flex flex-col mr-2'>
                <h2 className='font-bold text-[14px]'>Font Size</h2>
                <FontSizeChanger
                  onChange={handleFontSizeChange}
                  initialValue={26}
                  type='title'
                />
              </div>
            </div>
            <h3 className='font-bold'>Student Info</h3>
            {studentInfo.map((info, idx) => (
              <div key={idx} className='relative '>
                {' '}
                <input
                  className='w-full border-2 h-8 px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                  value={info.name || ''}
                  placeholder={info.placeholder}
                  onChange={(e) => handleStudentInfoChange(e, idx)}
                />
                <MdDelete
                  size={25}
                  className=' hover:bg-gray-200 h-full  absolute  cursor-pointer right-0  top-1/2 transform -translate-y-1/2'
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
                  initialValue={16}
                  type='info'
                />
              </div>
            </div>
          </div>
        </div>
        {options.map((option, index) => (
          <div key={option.id} className='flex'>
            <div className='w-full mb-5 bg-white'>
              {option.optionType === 'multiple-choice' && (
                <MultipleChoice
                  id={option.id}
                  onUpdate={handleQuestionChange}
                />
              )}
              {option.optionType === 'open-response' && <OpenResponse />}
              {option.optionType === 'fill-in-the-blank' && <FillBlank />}
              {option.optionType === 'checklist' && <Checklist />}
              {option.optionType === 'instruction-box' && (
                <InstructionBox
                  id={option.id}
                  onUpdate={handleInstructionChange}
                />
              )}
              {option.optionType === 'section-header' && (
                <SectionHeader key={option.id} />
              )}
              {options.length > 0 && (
                <div className='w-full flex flex-col '>
                  <span className='w-full bg-gray-300 h-[1px]'></span>
                  <div className='w-full flex justify-end'>
                    <MdDelete
                      size={25}
                      className=' text-red-500  m-2 cursor-pointer hover:text-red-800 '
                      onClick={() => handleDeleteOption(option.id, index)}
                    />
                  </div>
                </div>
              )}
            </div>
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
        <div className='flex flex-col h-[900px] mb-20 gap-2 ml-12 bg-white w-[800px] p-10 '>
          <div className='flex justify-between w-full flex-end'>
            <div className='flex-1 break-words w-[330px]'>
              <h1
                dangerouslySetInnerHTML={{ __html: value }}
                className='text-3xl'
                style={{
                  color: color,
                  fontSize: `${fontSize}px`,
                  lineHeight: '1',
                }}
              ></h1>
            </div>
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
          {options.map((option, index) => {
            const multipleChoiceIndex =
              options.filter(
                (opt, idx) =>
                  idx < index && opt.optionType === 'multiple-choice'
              ).length + 1;
            return (
              <div key={option.id} className='break-words mt-4'>
                {option.optionType === 'multiple-choice' && (
                  <PageMultipleChoice
                    question={questions[index]}
                    id={option.id}
                    index={multipleChoiceIndex}
                  />
                )}
                {option.optionType === 'open-response' && <PageOpenResponse />}
                {option.optionType === 'fill-in-the-blank' && <PageFillBlank />}
                {option.optionType === 'checklist' && <PageCheckList />}
                {option.optionType === 'instruction-box' && (
                  <PageInstructions
                    instruction={instructions[index]}
                    id={option.id}
                  />
                )}
                {option.optionType === 'section-header' && (
                  <PageSectionHeader key={option.id} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
