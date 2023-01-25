import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { App } from '@src/App';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './index.scss';

const root = document.querySelector('#root') as Element;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
);
