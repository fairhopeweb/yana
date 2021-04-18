import Color from 'color';
import React, { useContext } from 'react';
import { useSettings } from '../appdata/AppDataProvider';

export interface Theme {
  primaryColor: string;
  sidebarColor: string;
  sidebarHoverColor: string;
  sidebarTextColor: string;
  topBarColor: string;
  title?: string;
}

const defaultPrimaryColor = '#2c3e50';

export const defaultTheme: Theme = {
  primaryColor: '#377cc3',
  sidebarColor: defaultPrimaryColor,
  sidebarHoverColor: Color(defaultPrimaryColor).lighten(0.1).toString(),
  sidebarTextColor: Color(defaultPrimaryColor).lighten(2).mix(new Color('#444'), 0.3).toString(),
  topBarColor: Color(defaultPrimaryColor).darken(0.1).toString(),
};

export const ThemeContext = React.createContext(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = props => {
  const settings = useSettings();
  return (
    <ThemeContext.Provider
      value={{
        primaryColor: settings.themePrimaryColor,
        sidebarColor: settings.themeSidebarColor,
        sidebarTextColor: settings.themeSidebarTextColor,
        sidebarHoverColor: settings.themeSidebarHoverColor,
        topBarColor: settings.themeTopbarColor,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
