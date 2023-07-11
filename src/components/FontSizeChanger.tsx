import React, { useState } from 'react';

interface FontSizeChangerProps {
  onChange: (fontSize: number, type: string) => void;
  initialValue?: number;
  type: string;
}

const FontSizeChanger: React.FC<FontSizeChangerProps> = ({
  onChange,
  initialValue = 16,
  type,
}) => {
  const [fontSize, setFontSize] = useState<number>(initialValue);

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(event.target.value);
    setFontSize(newFontSize);
    onChange(newFontSize, type);
  };

  return (
    <div>
      <input
        type='range'
        min='10'
        max='52'
        value={fontSize}
        onChange={handleFontSizeChange}
        className='py-2'
      />
      <p>{fontSize}px</p>
    </div>
  );
};

export default FontSizeChanger;
