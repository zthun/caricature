import { ZFashionThemeContext } from '@zthun/fashion-boutique';
import { createLightTheme } from '@zthun/fashion-theme';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZCaricatureApp } from './app/app';

const container = createRoot(document.getElementById('zthunworks-caricature')!);
const lightTheme = createLightTheme();

container.render(
  <React.StrictMode>
    <ZFashionThemeContext.Provider value={lightTheme}>
      <ZCaricatureApp />
    </ZFashionThemeContext.Provider>
  </React.StrictMode>
);
