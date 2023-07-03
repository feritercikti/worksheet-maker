import { createContext, useState, useContext, ReactNode } from 'react';

interface ColorSettings {
  [key: string]: string;
}

interface ColorContextProps {
  colorSettings: ColorSettings;
  setColor: (section: string, color: string) => void;
}

export const ColorContext = createContext<ColorContextProps>({
  colorSettings: {},
  setColor: () => {},
});

export const useColorContext = () => useContext(ColorContext);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorSettings, setColorSettings] = useState<ColorSettings>({});

  const setColor = (section: string, color: string) => {
    setColorSettings((prevSettings) => ({
      ...prevSettings,
      [section]: color,
    }));
  };

  return (
    <ColorContext.Provider value={{ colorSettings, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};
