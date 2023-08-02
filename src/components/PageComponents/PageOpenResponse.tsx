import React from 'react';

interface PageOpenResponseProps {
  id: string;
  prompt: string;
}

const PageOpenResponse = ({ id, prompt }: PageOpenResponseProps) => {
  return (
    <div
      className={`w-full mt-2 bg-white 
      `}
    >
      <h1 dangerouslySetInnerHTML={{ __html: prompt }}></h1>
    </div>
  );
};

export default PageOpenResponse;
