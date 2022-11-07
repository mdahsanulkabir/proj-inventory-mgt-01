
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminPanel from './components/Admin/AdminPanel';
import AppSetup from './components/Admin/AppSetup';
import UserManagement from './components/Admin/UserManagement';
import AllParts from './components/AllParts/AllParts';
import AllSku from './components/AllSku/AllSku';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login';
import TestApp from './components/Admin/UpdateWarehouse';
import ShowProduction from './components/Production/ShowProduction';
import ProductionHistoryDaily from './components/Production/ProductionHistoryDaily';


const App = () => {
    return (
        <div>
            
            <Routes>
                <Route path="/" element={<Login></Login>} />
                <Route path="/testApp" element={<TestApp></TestApp>}></Route>
                <Route path="/layout" element={<Layout></Layout>}>
                    <Route index element={<Dashboard></Dashboard>} />
                    <Route path="allSKU" element={<AllSku></AllSku>} />
                    <Route path="allParts" element={<AllParts></AllParts>} />

                    <Route path="admin" element={<AdminPanel></AdminPanel>} >
                        <Route index element={<AdminDashboard></AdminDashboard>} />
                        <Route path="userMgt" element={<UserManagement/>} />
                        <Route path="appSetup" element={<AppSetup/>} />
                    </Route>

                    <Route path="showProduction" element={<ShowProduction></ShowProduction>}>
                        <Route index element={<ProductionHistoryDaily></ProductionHistoryDaily>}/>
                    </Route>
                </Route>
            </Routes>

        </div>
    );
};

export default App;