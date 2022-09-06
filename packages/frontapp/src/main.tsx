import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
      <ErrorBoundary>
        <GoogleOAuthProvider clientId="599384179420-k6tsfpgst2fsgp39iq8cdcb15pdrokih.apps.googleusercontent.com">
          <ApolloProvider client={client}>
            <PersistGate loading={null} persistor={persist}>
              <ThemeProvider theme={theme}>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </ThemeProvider>
            </PersistGate>
          </ApolloProvider>
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
