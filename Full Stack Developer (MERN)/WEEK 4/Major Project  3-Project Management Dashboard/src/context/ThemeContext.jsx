import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   THEME CONTEXT
========================================================= */

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "taskflow_theme";

/* =========================================================
   GET INITIAL THEME
========================================================= */

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    );

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      return savedTheme;
    }

    return "light";
  } catch (error) {
    console.error(
      "Failed to read TASKFLOW theme:",
      error
    );

    return "light";
  }
}

/* =========================================================
   THEME PROVIDER
========================================================= */

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    getInitialTheme
  );

  /* =======================================================
     APPLY THEME TO HTML ELEMENT
  ======================================================= */

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        theme
      );
    } catch (error) {
      console.error(
        "Failed to save TASKFLOW theme:",
        error
      );
    }
  }, [theme]);

  /* =======================================================
     TOGGLE THEME
  ======================================================= */

  function toggle() {
    setTheme((currentTheme) => {
      if (currentTheme === "light") {
        return "dark";
      }

      return "light";
    });
  }

  /* =======================================================
     SET SPECIFIC THEME
  ======================================================= */

  function setThemeMode(nextTheme) {
    if (
      nextTheme !== "light" &&
      nextTheme !== "dark"
    ) {
      console.warn(
        `Invalid TASKFLOW theme: ${nextTheme}`
      );

      return;
    }

    setTheme(nextTheme);
  }

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const contextValue = useMemo(
    () => ({
      theme,
      toggle,
      setTheme: setThemeMode,
      isDark: theme === "dark",
      isLight: theme === "light",
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================================================
   USE THEME HOOK
========================================================= */

export function useTheme() {
  const context = useContext(
    ThemeContext
  );

  if (!context) {
    throw new Error(
      "useTheme must be used inside a ThemeProvider"
    );
  }

  return context;
}

export default ThemeContext;