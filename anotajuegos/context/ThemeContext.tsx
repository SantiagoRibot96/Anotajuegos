import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

type Theme = typeof Colors.light;

const ThemeContext = createContext<Theme>(Colors.light);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();

  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);