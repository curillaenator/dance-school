import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@src/App';

import '@src/index.scss';

const root = document.querySelector('#root') as Element;

ReactDOM.createRoot(root).render(<App />);
