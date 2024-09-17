import React, { createContext, useState, useContext } from 'react';

// Create a Context for the app settings
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode, fontSize, setFontSize }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
