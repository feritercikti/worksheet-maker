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
  numberOfLines: Record<string, number>;
  setNumberOfLines: (id: string, numberOfLines: number) => void;
  answerType: Record<string, string>;
  setAnswerType: (id: string, type: string) => void;
  letterBlanks: Record<string, boolean>;
  setLetterBlanks: (id: string, isOpen: boolean) => void;
  borderSizes: Record<string, number>;
  fontSizes: Record<string, number>;
  borderColors: Record<string, string>;
  borderStyles: Record<string, string>;
  lineThicknesses: Record<string, number>;
  topPaddings: Record<string, number>;
  bottomPaddings: Record<string, number>;
  fontColors: Record<string, string>;
  fillwords: Record<string, { words: string[]; hidden: boolean[] }>;
  setHiddenWords: (id: string, newHidden: boolean[]) => void;
  answers: Record<string, string[]>;
  words: Record<string, string[]>;
  hiddenWords: Record<string, boolean[]>;
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
  handleTextChange: (id: string, newText: string) => void;
  handleDeleteOption: (id: string, index?: number) => void;
  selectedOption: string;
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  texts: string[];
  answerKey: boolean;
  setAnswerKey: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkSheetContext = createContext<WorkSheetContextProps>({
  numberOfLines: {},
  setNumberOfLines: () => {},
  answerType: {},
  setAnswerType: () => {},
  letterBlanks: {},
  setLetterBlanks: () => {},
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
  fillwords: {},
  hiddenWords: {},
  setHiddenWords: () => {},
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
  handleTextChange: () => {},
  handleDeleteOption: () => {},
  selectedOption: '',
  options: [],
  setOptions: () => {},
  texts: [],
  answerKey: false,
  setAnswerKey: () => {},
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
  const [fillwords, setFillWords] = useState<
    Record<string, { words: string[]; hidden: boolean[] }>
  >({});

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
  const [texts, setTexts] = useState<string[]>([]);
  const [hiddenWordsState, setHiddenWordsState] = useState<
    Record<string, boolean[]>
  >({});

  const [letterBlanks, setLetterBlanks] = useState<Record<string, boolean>>({});
  const [answerKey, setAnswerKey] = useState<boolean>(false);

  const [answerTypeState, setAnswerTypeState] = useState<
    Record<string, string>
  >({});
  const [numberOfLines, setNumberOfLines] = useState<Record<string, number>>(
    {}
  );

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

  const handleDeleteOption = (id: string, index?: number) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );

    if (index !== undefined) {
      setTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
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

  const setHiddenWords = (id: string, newHidden: boolean[]) => {
    setFillWords((prevFillWords) => ({
      ...prevFillWords,
      [id]: {
        words: prevFillWords[id]?.words || [],
        hidden: newHidden,
      },
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

  const handleSetLetterBlanks = (id: string, isOpen: boolean) => {
    setLetterBlanks((prevLetterBlanks) => ({
      ...prevLetterBlanks,
      [id]: isOpen,
    }));
  };

  const setAnswerType = (id: string, type: string) => {
    setAnswerTypeState((prev) => ({
      ...prev,
      [id]: type,
    }));
  };
  const setNumberOfLine = (id: string, numberOfLines: number) => {
    setNumberOfLines((prevNumberOfLines) => ({
      ...prevNumberOfLines,
      [id]: numberOfLines,
    }));
  };

  return (
    <WorkSheetContext.Provider
      value={{
        numberOfLines,
        setNumberOfLines: setNumberOfLine,
        answerType: answerTypeState,
        setAnswerType,
        answerKey,
        setAnswerKey,
        letterBlanks,
        setLetterBlanks: handleSetLetterBlanks,
        fillwords,
        hiddenWords: hiddenWordsState,
        setHiddenWords,
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
        handleTextChange,
        handleDeleteOption,
        setOptions,
        texts,
        selectedOption,
        options,
      }}
    >
      {children}
    </WorkSheetContext.Provider>
  );
};
