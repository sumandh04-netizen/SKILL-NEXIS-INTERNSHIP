import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem("shoploop_theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("shoploop_theme", dark ? "dark" : "light");
  }, [dark]);

  return <ThemeContext.Provider value={{ dark, setDark, toggle: () => setDark(v => !v) }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
