import React, { createContext, useState, ReactNode } from 'react';

interface WorkSheetContextProps {
  borderSizes: Record<string, number>;
  borderColors: Record<string, string>;
  borderStyles: Record<string, string>;
  answers: Record<string, string[]>;
  checklistOptions: Record<string, string[]>;
  columnNumbers: Record<string, number>;
  showDirections: Record<string, boolean>;
  setShowDirections: (id: string, show: boolean) => void;
  setBorderSize: (id: string, size: number) => void;
  setBorderColor: (id: string, color: string) => void;
  setBorderStyle: (id: string, style: string) => void;
  updateCheckList: (id: string, answers: string[]) => void;
  updateAnswers: (id: string, answers: string[]) => void;
  updateColumnNumber: (id: string, columnNumber: number) => void;
}

export const WorkSheetContext = createContext<WorkSheetContextProps>({
  borderSizes: {},
  borderColors: {},
  borderStyles: {},
  answers: {},
  checklistOptions: {},
  columnNumbers: {},
  showDirections: {},
  setShowDirections: () => {},
  setBorderSize: () => {},
  setBorderColor: () => {},
  setBorderStyle: () => {},
  updateCheckList: () => {},
  updateAnswers: () => {},
  updateColumnNumber: () => {},
});

export const WorkSheetProvider = ({ children }: { children: ReactNode }) => {
  const [borderSizes, setBorderSizes] = useState<Record<string, number>>({});
  const [borderColors, setBorderColors] = useState<Record<string, string>>({});
  const [borderStyles, setBorderStyles] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [checklistOptions, setChecklistOptions] = useState<
    Record<string, string[]>
  >({});
  const [columnNumbers, setColumnNumbers] = useState<Record<string, number>>(
    {}
  );
  const [showDirections, setShowDirections] = useState<Record<string, boolean>>(
    {}
  );

  const setShowDirectionsForChecklist = (id: string, show: boolean) => {
    setShowDirections((prevShowDirections) => ({
      ...prevShowDirections,
      [id]: show,
    }));
  };
  const setBorderSize = (id: string, size: number) => {
    setBorderSizes((prevSizes) => ({
      ...prevSizes,
      [id]: size,
    }));
  };

  const setBorderColor = (id: string, color: string) => {
    setBorderColors((prevColors) => ({
      ...prevColors,
      [id]: color,
    }));
  };

  const setBorderStyle = (id: string, style: string) => {
    setBorderStyles((prevStyles) => ({
      ...prevStyles,
      [id]: style,
    }));
  };

  const updateAnswers = (id: string, newAnswers: string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: newAnswers,
    }));
  };

  const updateCheckList = (id: string, newOptions: string[]) => {
    setChecklistOptions((prevOptions) => ({
      ...prevOptions,
      [id]: newOptions,
    }));
  };

  const updateColumnNumber = (id: string, columnNumber: number) => {
    setColumnNumbers((prevColumnNumbers) => ({
      ...prevColumnNumbers,
      [id]: columnNumber,
    }));
  };

  return (
    <WorkSheetContext.Provider
      value={{
        borderSizes,
        borderColors,
        borderStyles,
        answers,
        checklistOptions,
        columnNumbers,
        setBorderColor,
        setBorderSize,
        setBorderStyle,
        updateAnswers,
        updateColumnNumber,
        updateCheckList,
        showDirections,
        setShowDirections: setShowDirectionsForChecklist,
      }}
    >
      {children}
    </WorkSheetContext.Provider>
  );
};
