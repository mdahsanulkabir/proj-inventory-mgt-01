
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminPanel from '../components/Admin/AdminPanel';
import AllParts from '../components/AllParts/AllParts';
import AllSku from '../components/AllSku/AllSku';
import Dashboard from '../components/Dashboard/Dashboard';
import Layout from '../components/Layout/Layout'
import Login from '../components/Login/Login';

import './App2.css';

const App2 = () => {
    return (
        <div>
            
            <Routes>
                <Route path="/" element={<Login></Login>} />
                <Route path="/layout" element={<Layout></Layout>}>
                    <Route index element={<Dashboard></Dashboard>} />
                    <Route path="allSKU" element={<AllSku></AllSku>} />
                    <Route path="allParts" element={<AllParts></AllParts>} />
                    <Route path="admin" element={<AdminPanel></AdminPanel>} >
                        <Route index element={<AdminDashboard></AdminDashboard>} />
                    </Route>
                </Route>
            </Routes>

        </div>
    );
};

export default App2;