import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';


const theme = {
  bgColor: "#dfe6e9",
  textColor: "#2d3436",
  accentColor: "#0984e3"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

