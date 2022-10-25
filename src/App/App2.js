import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './App2.css';

const App2 = () => {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<h1>Hello</h1>} />
                </Routes>
            </Layout>
        </div>
    );
};

export default App2;