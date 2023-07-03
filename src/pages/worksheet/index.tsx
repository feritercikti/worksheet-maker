import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from 'react-colorful';

interface StudentInfo {
  name?: string;
  placeholder?: string;
}

const Worksheet = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [value, setValue] = useState('My Worksheet Title');
  const [color, setColor] = useState('#fff');
  const [showPalette, setShowPalette] = useState(false);
  const [showStudentPalette, setShowStudentPalette] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([
    { name: 'Name' },
  ]);
  const [studentInfoColor, setStudentInfoColor] = useState('#fff');

  const modules = {
    toolbar: [['bold', 'italic', 'underline']],
  };

  const formats = ['bold', 'italic', 'underline'];

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
    setStudentInfo((prevInfo) => [
      ...prevInfo,
      {
        name: '',
        placeholder: 'Name,Date,Age,Class etc.',
      },
    ]);
  };

  const handleDeleteStudentInfo = (index: number) => {
    setStudentInfo((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo.splice(index, 1);
      return updatedInfo;
    });
  };

  return (
    <div className='flex  mt-20 mx-10 justif-center gap-10'>
      <div className='flex-1  bg-white h-fit  top-5 sticky'>
        <div className='w-full mb-5'>
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
            />
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
                  className='absolute px-2 bg-gray-400 py-[8px] cursor-pointer hover:bg-gray-500 right-0  top-1/2 transform -translate-y-1/2'
                  onClick={() => handleDeleteStudentInfo(idx)}
                />
              </div>
            ))}
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
              <HexColorPicker color={color} onChange={setStudentInfoColor} />
            )}

            <button
              onClick={handleAddInput}
              className='px-2 py-1 bg-green-800 text-white'
            >
              Add New Field
            </button>
          </div>
        </div>
      </div>
      <div className='flex-[3_3_0%] flex '>
        <div className='flex justify-between h-[900px] mb-20 gap-2 ml-12 bg-white w-[800px] p-10'>
          <h1
            dangerouslySetInnerHTML={{ __html: value }}
            className='text-3xl '
            style={{ color: color }}
          ></h1>
          <div className='flex flex-col gap-2 items-end'>
            {studentInfo.map((info, idx) => (
              <div key={idx} className='flex items-end justify-center gap-2'>
                <h2 style={{ color: studentInfoColor }}>{info.name}</h2>
                <span>:</span>
                <span className='w-[120px] bg-black h-[1px]'></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
