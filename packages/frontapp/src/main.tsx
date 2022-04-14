import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@mimir/ui-kit';
import './normalize.css';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
