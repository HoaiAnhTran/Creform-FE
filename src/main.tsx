import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import { store } from '@/redux/store.ts';
import { Layout } from '@/templates/Layout/Layout.tsx';

import App from './App';
import { customTheme } from './utils';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={customTheme}>
        <ReduxProvider store={store}>
          <Layout>
            <App />
          </Layout>
        </ReduxProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
