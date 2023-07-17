import React, { useEffect, useRef, useState } from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const MAX_PAGE_HEIGHT = 900; // Maximum height of a page in pixels

const PageContainer = ({ children }: PageContainerProps) => {
  const [pages, setPages] = useState<JSX.Element[][]>([[]]);

  const currentPage = pages.length - 1;
  const currentPageComponents = pages[currentPage];

  const addComponentToPage = (component: JSX.Element) => {
    const updatedPages = [...pages];
    currentPageComponents.push(component);

    const pageHeight = currentPageComponents.reduce((acc, currComponent) => {
      // Calculate the height of each component
      // Adjust this calculation based on your component's height
      const componentHeight = 100; // Replace with the actual height of the component
      return acc + componentHeight;
    }, 0);

    if (pageHeight > MAX_PAGE_HEIGHT) {
      updatedPages.push([component]);
    }

    setPages(updatedPages);
  };

  return (
    <>
      {pages.map((page, index) => (
        <div
          key={index}
          className='flex flex-col h-[900px] mb-20 gap-2 ml-12 bg-white w-[800px] p-10'
        >
          {page.map((component, componentIndex) => (
            <div key={componentIndex} className='break-words mt-4'>
              {component}
            </div>
          ))}
        </div>
      ))}
      {children &&
        React.cloneElement(children as React.ReactElement, {
          addComponentToPage,
        })}
    </>
  );
};

export default PageContainer;
