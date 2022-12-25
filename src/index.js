import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './view/index.js'
import {ThemeProvider} from "./ThemeContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/*<ThemeProvider>*/}
          <Home />
      {/*</ThemeProvider>*/}
  </React.StrictMode>
);

