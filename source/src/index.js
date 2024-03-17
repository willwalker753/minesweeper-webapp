import React from 'react';
import ReactDOM from 'react-dom/client';
import Minesweeper from './pages/minesweeper/Minesweeper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Minesweeper />
    </React.StrictMode>
);
