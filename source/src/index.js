import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout/Layout';
import Minesweeper from './pages/minesweeper/Minesweeper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Layout>
            <Minesweeper />
        </Layout>
    </React.StrictMode>
);
