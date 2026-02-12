import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSettingWebapp, updateSettingWebapp } from '../services/settingWebapp';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeLight, setThemeLight] = useState('default');
  const [themeDark, setThemeDark] = useState('default');
  const [mode, setMode] = useState('light'); // o 'dark'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const setting = await getSettingWebapp();
      setThemeLight(setting?.theme_light || 'default');
      setThemeDark(setting?.theme_dark || 'default');
      if (!setting) {
        await updateSettingWebapp({ theme_light: 'default', theme_dark: 'default' });
      }
      // Rileva la modalità browser (prefer-color-scheme)
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
      // Applica subito il tema corretto
      const theme = prefersDark ? (setting?.theme_dark || 'default') : (setting?.theme_light || 'default');
      document.documentElement.setAttribute('data-theme', `${theme}-${prefersDark ? 'dark' : 'light'}`);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      const theme = mode === 'light' ? themeLight : themeDark;
      document.documentElement.setAttribute('data-theme', `${theme}-${mode}`);
    }
  }, [themeLight, themeDark, mode, loading]);

  const saveTheme = (light, dark) => {
    setThemeLight(light);
    setThemeDark(dark);
    updateSettingWebapp({ theme_light: light, theme_dark: dark });
    // Aggiorna subito il tema attivo
    const theme = mode === 'light' ? light : dark;
    document.documentElement.setAttribute('data-theme', `${theme}-${mode}`);
  };

  return (
    <ThemeContext.Provider value={{ themeLight, themeDark, mode, setMode, saveTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
