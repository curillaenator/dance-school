import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@src/App';

import '@src/index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = document.querySelector('#root') as Element;

ReactDOM.createRoot(root).render(<App />);
