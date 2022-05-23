import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = {
  bgColor: "#dfe6e9",
  textColor: "#2d3436",
  accentColor: "#0984e3"
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>
);