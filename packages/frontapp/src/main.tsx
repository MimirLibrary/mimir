import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import { theme } from '@mimir/ui-kit';
import { store } from './app/store';
import './normalize.css';
import './index.css';
import '@mimir/localization'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
