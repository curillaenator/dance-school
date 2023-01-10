import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@src/App';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './index.scss';

const root = document.querySelector('#root') as Element;

ReactDOM.createRoot(root).render(<App />);
