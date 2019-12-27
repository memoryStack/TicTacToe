import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const renderBoard = () => {
    var root = document.getElementById('app');
    ReactDOM.render(<App renderBoard={renderBoard}/>, root);
}
renderBoard()
