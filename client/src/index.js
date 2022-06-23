import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil";

const theme = {
  bgColor: "#dfe6e9",
  textColor: "#2d3436",
  accentColor: "#0984e3"
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        </BrowserRouter>
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);