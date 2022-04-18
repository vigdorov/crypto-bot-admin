import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import App from './components/page';

ReactDOM.render(
    <HashRouter >
        <App />
    </HashRouter>,
    document.getElementById('root')
);
