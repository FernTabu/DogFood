import { createContext } from "react";

export const themes = {
	light: {
		color: '#000000',
	  	background: '#ffffff',
	},
	dark: {
		color: '#ffffff',
		background: '#fff1a0',
	},
  };

  export const ThemeContext = createContext({
	theme: themes.dark,
	toggleTheme: () => {},
  });
