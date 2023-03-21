import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './client';

const root = createRoot(document.getElementById('root'));

root.render(

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();