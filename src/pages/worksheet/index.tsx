import dynamic from 'next/dynamic';
import React, { useMemo, useState, useContext, useRef } from 'react';
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
import { WorkSheetContext } from '../../context/WorkSheetContext';
import AddOption from '@/components/AddOption';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Header from '@/components/Header';
import BasicText from '@/components/BasicText';
import PageBasicText from '@/components/PageComponents/PageBasicText';
import Divider from '@/components/Divider';
import PageDivider from '@/components/PageComponents/PageDivider';
import WordBank from '@/components/WordBank';
import PageWordBank from '@/components/PageComponents/PageWordBank';
import jsPDF from 'jspdf';

interface StudentInfo {
  name?: string;
  placeholder?: string;
  fontSize?: number;
}

interface ShowAddOptionState {
  [optionId: string]: boolean;
}

const Worksheet = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const {
    handleOptionChange,
    selectedOption,
    options,
    texts,
    handleAddClick,
    answerKey,
    setAnswerKey,
  } = useContext(WorkSheetContext);

  const [showHeader, setShowHeader] = useState(true);
  const [value, setValue] = useState<string>('My Worksheet Title');
  const [fontSize, setFontSize] = useState<number>(26);
  const [color, setColor] = useState('#000000');
  const [showPalette, setShowPalette] = useState(false);
  const [showStudentPalette, setShowStudentPalette] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([
    { name: 'Name', fontSize: 16 },
  ]);
  const [studentInfoColor, setStudentInfoColor] = useState('#000000');
  const [showAddOption, setShowAddOption] = useState<ShowAddOptionState>({});
  const [showTitle, setShowTitle] = useState(true);
  const [showStudentInfo, setShowStudentInfo] = useState(true);

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

  const toggleShowAddOption = (optionId: string) => {
    setShowAddOption((prevState) => ({
      ...prevState,
      [optionId]: !prevState[optionId],
    }));
  };

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

  const generatePDF = async () => {
    const doc = new jsPDF('p', 'px', [780, 900]);

    doc.html(pdfRef.current!, {
      async callback(doc) {
        await doc.deletePage(2);

        await doc.save('document');
      },
    });
  };

  return (
    <>
      <Header />
      <div className='flex gap-2 mt-2'>
        <label className='flex w-fit  mx-12 items-center top-[90px] sticky'>
          <div className='relative w-10 h-4'>
            <input
              type='checkbox'
              className='sr-only'
              checked={answerKey}
              onChange={() => setAnswerKey(!answerKey)}
            />
            <div
              className={`w-full h-full rounded-full shadow-inner ${
                answerKey ? 'bg-indigo-400' : 'bg-gray-200 '
              }`}
            ></div>
            <div
              className={`absolute left-0 top-0 w-4 h-4  rounded-full shadow-md transform transition-transform ${
                answerKey
                  ? 'translate-x-6 bg-white border border-gray-400'
                  : 'translate-x-0 bg-gray-500'
              }`}
            ></div>
          </div>
          <span className='ml-2 text-white'>Answer Key</span>
        </label>
        <button
          onClick={generatePDF}
          className='mx-12 w-fit mt-2 rounded px-2 py-2 text-white bg-green-700 hover:bg-green-900'
        >
          Click to Generate PDF
        </button>
      </div>
      <div className='flex  mt-5 mx-10 justify-center gap-10'>
        <div className='flex-[1.2_1.2_0%] mb-5  h-[600px]  overflow-y-auto px-2  top-[87px] sticky scrollbar'>
          <div className='w-full mb-5 bg-white'>
            <div
              className='py-2 bg-indigo-200 text-center cursor-pointer'
              onClick={() => setShowHeader(!showHeader)}
            >
              <h2 className='text-indigo-700 font-bold'>Worksheet Header</h2>
            </div>
            {showHeader && (
              <div className='flex flex-col mx-6 py-3 gap-3'>
                <div className='flex items-center gap-2'>
                  <input
                    className=' border-2 h-[15px] w-[15px] px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                    type='checkbox'
                    checked={showTitle}
                    onChange={() => setShowTitle(!showTitle)}
                  />
                  <h2 className='font-bold '>Worksheet Title</h2>
                </div>
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
                  <div className='flex flex-col mr-2 gap-2'>
                    <h2 className='font-bold text-[14px]'>Font Size</h2>
                    <FontSizeChanger
                      onChange={handleFontSizeChange}
                      initialValue={26}
                      type='title'
                    />
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    className=' border-2 h-[15px] w-[15px] px-2 text-gray-800 placeholder-gray-400 focus-within:outline-gray-400'
                    type='checkbox'
                    checked={showStudentInfo}
                    onChange={() => setShowStudentInfo(!showStudentInfo)}
                  />
                  <h2 className='font-bold '>Student Info</h2>
                </div>
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
            )}
          </div>
          {options.map((option, index) => (
            <div key={option.id} className='flex flex-col'>
              {options.length > 0 && (
                <div key={option.id}>
                  {showAddOption[option.id] ? (
                    <AddOption
                      id={option.id}
                      toggleShowAddOption={toggleShowAddOption}
                    />
                  ) : (
                    <div className='w-full h-[1px] flex justify-center items-center bg-white mb-5 '>
                      <button onClick={() => toggleShowAddOption(option.id)}>
                        <AiOutlinePlusCircle
                          className='text-white bg-gray-800 rounded-[50%] cursor-pointer'
                          size={20}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className='w-full mb-5 '>
                {option.optionType === 'multiple-choice' && (
                  <MultipleChoice
                    id={option.id}
                    index={index}
                    key={option.id}
                  />
                )}
                {option.optionType === 'open-response' && (
                  <OpenResponse id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'word-bank' && (
                  <WordBank id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'fill-in-the-blank' && (
                  <FillBlank id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'checklist' && (
                  <Checklist id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'instruction-box' && (
                  <InstructionBox
                    id={option.id}
                    index={index}
                    key={option.id}
                  />
                )}
                {option.optionType === 'section-header' && (
                  <SectionHeader id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'divider' && (
                  <Divider id={option.id} index={index} key={option.id} />
                )}
                {option.optionType === 'basic-text' && (
                  <BasicText
                    id={option.id}
                    index={index}
                    key={option.id}
                    val='Write your text here'
                  />
                )}
              </div>
            </div>
          ))}

          <div className='w-full items-center mb-5 justify-center flex '>
            <select
              className='select-dropdown w-full bg-white border border-gray-300 py-2 px-4  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value='instruction-box'>Instruction box</option>
              <option value='multiple-choice'>Multiple Choice</option>
              <option value='fill-in-the-blank'>Fill in the blank</option>
              <option value='checklist'>Checklist</option>
              <option value='section-header'>Section Header</option>
              <option value='open-response'>Open Response</option>
              <option value='word-bank'>Word Bank</option>
              <option value='basic-text'>Basic Text</option>
              <option value='divider'>Divider</option>
            </select>
            <button
              className='add-button bg-blue-500 text-white py-2 px-4  shadow hover:bg-blue-600'
              onClick={() => handleAddClick('')}
            >
              Add
            </button>
          </div>
        </div>

        <div className='flex-[3_3_0%] flex '>
          <div
            className='flex flex-col h-[900px] mb-20 gap-2 ml-10 bg-white w-[700px] p-10'
            ref={pdfRef}
          >
            {answerKey && (
              <h2 className='text-center justify-between text-red-500 text-2xl'>
                ANSWER &nbsp; KEY
              </h2>
            )}

            <div className='flex justify-between w-full flex-end'>
              <div className='flex-1 break-words w-[330px]'>
                {showTitle && (
                  <h1
                    dangerouslySetInnerHTML={{ __html: value }}
                    className='text-3xl'
                    style={{
                      color: color,
                      fontSize: `${fontSize}px`,
                      lineHeight: '1',
                    }}
                  ></h1>
                )}
              </div>
              {showStudentInfo && (
                <div className='flex flex-col gap-2 items-end'>
                  {studentInfo.map((info, idx) => (
                    <div
                      key={idx}
                      className='flex items-end justify-center gap-2'
                    >
                      <h2
                        style={{
                          color: studentInfoColor,
                          fontSize: `${info.fontSize}px`,
                        }}
                      >
                        {info.name}:
                      </h2>
                      <span
                        className='w-[140px] h-[1px]'
                        style={{
                          background: studentInfoColor,
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {options.map((option, index) => {
              const multipleChoiceIndex =
                options.filter(
                  (opt, idx) =>
                    idx < index && opt.optionType === 'multiple-choice'
                ).length + 1;
              const checkListIndex =
                options.filter(
                  (opt, idx) => idx < index && opt.optionType === 'checklist'
                ).length + 1;
              const fillBlankIndex =
                options.filter(
                  (opt, idx) =>
                    idx < index && opt.optionType === 'fill-in-the-blank'
                ).length + 1;

              const openresponseIndex =
                options.filter(
                  (opt, idx) =>
                    idx < index && opt.optionType === 'open-response'
                ).length + 1;

              return (
                <div key={option.id} className='break-words mt-4'>
                  {option.optionType === 'multiple-choice' && (
                    <PageMultipleChoice
                      question={texts[index]}
                      id={option.id}
                      index={multipleChoiceIndex}
                      key={option.id}
                    />
                  )}
                  {option.optionType === 'open-response' && (
                    <PageOpenResponse
                      key={option.id}
                      prompt={texts[index]}
                      id={option.id}
                      index={openresponseIndex}
                    />
                  )}
                  {option.optionType === 'word-bank' && (
                    <PageWordBank key={option.id} id={option.id} />
                  )}
                  {option.optionType === 'fill-in-the-blank' && (
                    <PageFillBlank
                      key={option.id}
                      id={option.id}
                      index={fillBlankIndex}
                    />
                  )}
                  {option.optionType === 'checklist' && (
                    <PageCheckList
                      direction={texts[index]}
                      id={option.id}
                      index={checkListIndex}
                      key={option.id}
                    />
                  )}
                  {option.optionType === 'instruction-box' && (
                    <PageInstructions
                      instruction={texts[index]}
                      id={option.id}
                    />
                  )}
                  {option.optionType === 'section-header' && (
                    <PageSectionHeader
                      id={option.id}
                      header={texts[index]}
                      key={option.id}
                    />
                  )}
                  {option.optionType === 'basic-text' && (
                    <PageBasicText
                      id={option.id}
                      text={texts[index]}
                      key={option.id}
                    />
                  )}
                  {option.optionType === 'divider' && (
                    <PageDivider id={option.id} key={option.id} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Worksheet;
