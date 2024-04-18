import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import { Layout } from '@/templates/Layout/Layout.tsx';

import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Layout>
        <App />
      </Layout>
    </MantineProvider>
  </React.StrictMode>,
);
