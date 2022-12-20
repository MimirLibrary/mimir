import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import { theme } from '@mimir/ui-kit';
import { store, persist } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import './normalize.css';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '@mimir/apollo-client';
import '@mimir/localization';
import ErrorBoundary from './app/components/ErrorBoundary';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persist}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
