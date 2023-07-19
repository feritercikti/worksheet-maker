import React, { createContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  id: string;
  optionType: string;
}

type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

interface WorkSheetContextProps {
  borderSizes: Record<string, number>;
  fontSizes: Record<string, number>;
  borderColors: Record<string, string>;
  borderStyles: Record<string, string>;
  fontColors: Record<string, string>;
  answers: Record<string, string[]>;
  checklistOptions: Record<string, string[]>;
  columnNumbers: Record<string, number>;
  showDirections: Record<string, boolean>;
  textAlignments: Record<string, TextAlign | undefined>;
  setTextAlignment: (id: string, alignment: TextAlign | undefined) => void;
  setShowDirections: (id: string, show: boolean) => void;
  setBorderSize: (id: string, size: number) => void;
  setFontSize: (id: string, size: number) => void;
  setBorderColor: (id: string, color: string) => void;
  setFontColor: (id: string, color: string) => void;
  setBorderStyle: (id: string, style: string) => void;
  updateCheckList: (id: string, answers: string[]) => void;
  updateAnswers: (id: string, answers: string[]) => void;
  updateColumnNumber: (id: string, columnNumber: number) => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddClick: (id: string) => void;
  handleInstructionChange: (id: string, newInstruction: string) => void;
  handleQuestionChange: (id: string, newQuestion: string) => void;
  handleDirectionChange: (id: string, newDirection: string) => void;
  handleHeaderChange: (id: string, newHeader: string) => void;
  handleDeleteOption: (id: string, index?: number) => void;
  selectedOption: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  instructions: string[];
  questions: string[];
  directions: string[];
  headers: string[];
}

export const WorkSheetContext = createContext<WorkSheetContextProps>({
  borderSizes: {},
  fontSizes: {},
  borderColors: {},
  borderStyles: {},
  textAlignments: {},
  fontColors: {},
  answers: {},
  checklistOptions: {},
  columnNumbers: {},
  showDirections: {},
  setShowDirections: () => {},
  setBorderSize: () => {},
  setFontSize: () => {},
  setBorderColor: () => {},
  setFontColor: () => {},
  setBorderStyle: () => {},
  setTextAlignment: () => {},
  updateCheckList: () => {},
  updateAnswers: () => {},
  updateColumnNumber: () => {},
  handleOptionChange: () => {},
  handleAddClick: () => {},
  handleInstructionChange: () => {},
  handleQuestionChange: () => {},
  handleDirectionChange: () => {},
  handleHeaderChange: () => {},
  handleDeleteOption: () => {},
  selectedOption: '',
  options: [],
  setOptions: () => {},
  instructions: [],
  questions: [],
  directions: [],
  headers: [],
});

export const WorkSheetProvider = ({ children }: { children: ReactNode }) => {
  const [borderSizes, setBorderSizes] = useState<Record<string, number>>({});
  const [fontSizes, setFontSizes] = useState<Record<string, number>>({});
  const [borderColors, setBorderColors] = useState<Record<string, string>>({});
  const [borderStyles, setBorderStyles] = useState<Record<string, string>>({});

  const [textAlignments, setTextAlignments] = useState<
    Record<string, TextAlign | undefined>
  >({});

  const [fontColors, setFontColors] = useState<Record<string, string>>({});

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

  const [selectedOption, setSelectedOption] = useState('open-response');

  const [options, setOptions] = useState<Option[]>([]);

  const [instructions, setInstructions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAddClick = (currentOptionId: string) => {
    const newOption = {
      id: uuidv4(),
      optionType: selectedOption,
    };

    if (options.length > 0) {
      const currentIndex = options.findIndex(
        (option) => option.id === currentOptionId
      );

      const updatedOptions = [
        ...options.slice(0, currentIndex),
        newOption,
        ...options.slice(currentIndex),
      ];

      setOptions(updatedOptions);
    } else {
      setOptions((prevOptions) => [...prevOptions, newOption]);
    }
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

  const handleDirectionChange = (id: string, newDirection: string) => {
    setDirections((prevDirections) => {
      const updatedDirections: string[] = [...prevDirections];
      const index = options.findIndex((option) => option.id === id);
      if (index !== -1) {
        updatedDirections[index] = newDirection;
      }
      return updatedDirections;
    });
  };

  const handleHeaderChange = (id: string, newHeader: string) => {
    setHeaders((prevHeaders) => {
      const updatedHeaders: string[] = [...prevHeaders];
      const index = options.findIndex((option) => option.id === id);
      if (index !== -1) {
        updatedHeaders[index] = newHeader;
      }
      return updatedHeaders;
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

  const setFontSize = (id: string, size: number) => {
    setFontSizes((prevSizes) => ({
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

  const setTextAlignment = (id: string, alignment: TextAlign | undefined) => {
    setTextAlignments((prevAlignments) => ({
      ...prevAlignments,
      [id]: alignment,
    }));
  };

  const setFontColor = (id: string, color: string) => {
    setFontColors((prevColors) => ({
      ...prevColors,
      [id]: color,
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
        fontSizes,
        borderColors,
        borderStyles,
        answers,
        checklistOptions,
        columnNumbers,
        setBorderColor,
        textAlignments,
        setBorderSize,
        setFontSize,
        setBorderStyle,
        setFontColor,
        setTextAlignment,
        fontColors,
        updateAnswers,
        updateColumnNumber,
        updateCheckList,
        showDirections,
        setShowDirections: setShowDirectionsForChecklist,
        handleOptionChange,
        handleAddClick,
        handleInstructionChange,
        handleQuestionChange,
        handleDirectionChange,
        handleHeaderChange,
        handleDeleteOption,
        setOptions,
        selectedOption,
        options,
        instructions,
        headers,
        questions,
        directions,
      }}
    >
      {children}
    </WorkSheetContext.Provider>
  );
};
