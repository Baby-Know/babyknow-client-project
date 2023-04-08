import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d4d7db",
          200: "#a8aeb6",
          300: "#7d8692",
          400: "#515d6d",
          500: "#263549",
          600: "#1e2a3a",
          700: "#17202c",
          800: "#0f151d",
          900: "#080b0f",
        },

        tealAccent: {
          100: "#deecf3",
          200: "#bdd9e7",
          300: "#9dc6dc",
          400: "#7cb3d0",
          500: "#5ba0c4",
          600: "#49809d",
          700: "#376076",
          800: "#24404e",
          900: "#122027",
        },
        darkTealAccent: {
          100: "#d6e4ed",
          200: "#adc9db",
          300: "#83afc9",
          400: "#5a94b7",
          500: "#3179a5",
          600: "#276184",
          700: "#1d4963",
          800: "#143042",
          900: "#0a1821",
        },
        greenAccent: {
          100: "#eff3dc",
          200: "#dee6b9",
          300: "#ceda96",
          400: "#bdcd73",
          500: "#adc150",
          600: "#8a9a40",
          700: "#687430",
          800: "#454d20",
          900: "#232710",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#080b0f",
          200: "#0f151d",
          300: "#17202c",
          400: "#1e2a3a",
          500: "#263549",
          600: "#515d6d",
          700: "#7d8692",
          800: "#a8aeb6",
          900: "#d4d7db",
        },
        tealAccent: {
          100: "#122027",
          200: "#24404e",
          300: "#376076",
          400: "#49809d",
          500: "#5ba0c4",
          600: "#7cb3d0",
          700: "#9dc6dc",
          800: "#bdd9e7",
          900: "#deecf3",
        },
        darkTealAccent: {
          100: "#0a1821",
          200: "#143042",
          300: "#1d4963",
          400: "#276184",
          500: "#3179a5",
          600: "#5a94b7",
          700: "#83afc9",
          800: "#adc9db",
          900: "#d6e4ed",
        },
        greenAccent: {
          100: "#232710",
          200: "#454d20",
          300: "#687430",
          400: "#8a9a40",
          500: "#adc150",
          600: "#bdcd73",
          700: "#ceda96",
          800: "#dee6b9",
          900: "#eff3dc",
        },
      }),
});

//material theme settings

export const themeSettings = (mode) => {
  //defining colors based on light or dark mode
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            //palette for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.tealAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[600],
            },
          }
        : {
            //palette for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.tealAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Puritan", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Cormorant Garamond", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  //holding state to determine light or dark mode
  const [mode, setMode] = useState("light");

  //use memo is allowing the caching of this result between renders
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  //determining the theme based on dark mode or light mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
