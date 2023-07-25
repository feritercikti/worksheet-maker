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
  lineThicknesses: Record<string, number>;
  topPaddings: Record<string, number>;
  bottomPaddings: Record<string, number>;
  fontColors: Record<string, string>;
  answers: Record<string, string[]>;
  words: Record<string, string[]>;
  checklistOptions: Record<string, string[]>;
  columnNumbers: Record<string, number>;
  showDirections: Record<string, boolean>;
  textAlignments: Record<string, TextAlign | undefined>;
  setTextAlignment: (id: string, alignment: TextAlign | undefined) => void;
  setShowDirections: (id: string, show: boolean) => void;
  setBorderSize: (id: string, size: number) => void;
  setLineThickness: (id: string, size: number) => void;
  setTopPadding: (id: string, size: number) => void;
  setBottomPadding: (id: string, size: number) => void;
  setFontSize: (id: string, size: number) => void;
  setBorderColor: (id: string, color: string) => void;
  setFontColor: (id: string, color: string) => void;
  setBorderStyle: (id: string, style: string) => void;
  updateCheckList: (id: string, answers: string[]) => void;
  updateAnswers: (id: string, answers: string[]) => void;
  updateWords: (id: string, answers: string[]) => void;
  updateColumnNumber: (id: string, columnNumber: number) => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddClick: (id: string) => void;
  handleInstructionChange: (id: string, newInstruction: string) => void;
  handleTextChange: (id: string, newInstruction: string) => void;
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
  texts: string[];
  headers: string[];
}

export const WorkSheetContext = createContext<WorkSheetContextProps>({
  borderSizes: {},
  fontSizes: {},
  borderColors: {},
  borderStyles: {},
  textAlignments: {},
  fontColors: {},
  lineThicknesses: {},
  topPaddings: {},
  bottomPaddings: {},
  answers: {},
  words: {},
  checklistOptions: {},
  columnNumbers: {},
  showDirections: {},
  setShowDirections: () => {},
  setBorderSize: () => {},
  setLineThickness: () => {},
  setTopPadding: () => {},
  setBottomPadding: () => {},
  setFontSize: () => {},
  setBorderColor: () => {},
  setFontColor: () => {},
  setBorderStyle: () => {},
  setTextAlignment: () => {},
  updateCheckList: () => {},
  updateAnswers: () => {},
  updateWords: () => {},
  updateColumnNumber: () => {},
  handleOptionChange: () => {},
  handleAddClick: () => {},
  handleInstructionChange: () => {},
  handleTextChange: () => {},
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
  texts: [],
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
  const [lineThicknesses, setLineThicknesses] = useState<
    Record<string, number>
  >({});
  const [topPaddings, setTopPaddings] = useState<Record<string, number>>({});
  const [bottomPaddings, setBottomPaddings] = useState<Record<string, number>>(
    {}
  );
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [words, setWords] = useState<Record<string, string[]>>({});

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
  const [texts, setTexts] = useState<string[]>([]);

  const [headers, setHeaders] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAddClick = (currentOptionId: string) => {
    const newOption = {
      id: uuidv4(),
      optionType: selectedOption,
    };

    const currentIndex = options.findIndex(
      (option) => option.id === currentOptionId
    );
    setOptions((prevOptions) => {
      if (currentIndex !== -1) {
        return [
          ...prevOptions.slice(0, currentIndex),
          newOption,
          ...prevOptions.slice(currentIndex),
        ];
      } else {
        return [...prevOptions, newOption];
      }
    });

    setTexts((prevTexts) => {
      const updatedTexts = [...prevTexts];
      if (currentIndex !== -1) {
        updatedTexts.splice(currentIndex, 0, 'Write your text here');
      } else {
        updatedTexts.push('Write your text here');
      }
      return updatedTexts;
    });

    setHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      if (currentIndex !== -1) {
        updatedHeaders.splice(currentIndex, 0, 'Write your header here');
      } else {
        updatedHeaders.push('Write your header here');
      }
      return updatedHeaders;
    });

    setInstructions((prevInstructions) => {
      const updatedInstructions = [...prevInstructions];
      if (currentIndex !== -1) {
        updatedInstructions.splice(
          currentIndex,
          0,
          'Write your instruction here'
        );
      } else {
        updatedInstructions.push('Write your instruction here');
      }
      return updatedInstructions;
    });

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      if (currentIndex !== -1) {
        updatedQuestions.splice(currentIndex, 0, 'Write your question here');
      } else {
        updatedQuestions.push('Write your question here');
      }
      return updatedQuestions;
    });

    setDirections((prevDirections) => {
      const updatedDirections = [...prevDirections];
      if (currentIndex !== -1) {
        updatedDirections.splice(currentIndex, 0, 'Write your direction here');
      } else {
        updatedDirections.push('Write your direction here');
      }
      return updatedDirections;
    });

    setChecklistOptions((prevChecklistOptions) => {
      const updatedChecklistOptions = { ...prevChecklistOptions };
      if (currentIndex !== -1) {
        updatedChecklistOptions[newOption.id] = ['Option 1', 'Option 2'];
      } else {
        updatedChecklistOptions[newOption.id] = ['Option 1', 'Option 2'];
      }
      return updatedChecklistOptions;
    });
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

  const handleTextChange = (id: string, newText: string) => {
    setTexts((prevTexts) => {
      const updatedTexts: string[] = [...prevTexts];
      const index = options.findIndex((option) => option.id === id);
      if (index !== -1) {
        updatedTexts[index] = newText;
      }
      return updatedTexts;
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
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );

    if (index !== undefined) {
      setInstructions((prevInstructions) =>
        prevInstructions.filter((_, i) => i !== index)
      );
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, i) => i !== index)
      );
      setTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
      setHeaders((prevHeaders) => prevHeaders.filter((_, i) => i !== index));
      setDirections((prevDirections) =>
        prevDirections.filter((_, i) => i !== index)
      );
      setChecklistOptions(({ [id]: _, ...rest }) => rest);
    }
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

  const setLineThickness = (id: string, size: number) => {
    setLineThicknesses((prevThicknesses) => ({
      ...prevThicknesses,
      [id]: size,
    }));
  };

  const setTopPadding = (id: string, size: number) => {
    setTopPaddings((prevPaddings) => ({
      ...prevPaddings,
      [id]: size,
    }));
  };

  const setBottomPadding = (id: string, size: number) => {
    setBottomPaddings((prevPaddings) => ({
      ...prevPaddings,
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

  const updateWords = (id: string, newWords: string[]) => {
    setWords((prevWords) => ({
      ...prevWords,
      [id]: newWords,
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
        lineThicknesses,
        fontSizes,
        borderColors,
        borderStyles,
        answers,
        words,
        topPaddings,
        bottomPaddings,
        checklistOptions,
        columnNumbers,
        setBorderColor,
        textAlignments,
        setBorderSize,
        setFontSize,
        setLineThickness,
        setTopPadding,
        setBottomPadding,
        setBorderStyle,
        setFontColor,
        setTextAlignment,
        fontColors,
        updateAnswers,
        updateWords,
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
        handleTextChange,
        handleDeleteOption,
        setOptions,
        texts,
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
