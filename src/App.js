import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminPanel from "./components/Admin/AdminPanel";
import AppSetup from "./components/Admin/AppSetup";
import UserManagement from "./components/Admin/UserManagement";
import AllParts from "./components/AllParts/AllParts";
import AllSku from "./components/AllSku/AllSku";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import TestApp from "./components/Admin/UpdateWarehouse";
import ShowProduction from "./components/Production/ShowProduction";
import ProductionHistoryDaily from "./components/Production/ProductionHistoryDaily";
import ProductionHistoryWeekly from "./components/Production/ProductionHistoryWeekly";
import ProductionHistoryMonthly from "./components/Production/ProductionHistoryMonthly";
import ProductionHistoryYearly from "./components/Production/ProductionHistoryYearly";
import Test from "./components/Admin/test";
import AllBOM from "./components/AllBOM/AllBOM";
import AllBOMDashboard from "./components/AllBOM/AllBOMDashboard";
import ShowBOM from "./components/AllBOM/ShowBOM"
import BOMAnalyse from "./components/AllBOM/BOMAnalyse"
import BOMforMRP from "./components/AllBOM/BOMforMRP";

export const TokenContext = createContext('')

const App = () => {
    const [ myToken, setMyToken ] = useState('');

    const tokenHandler = (props) => {
        setMyToken(props);
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login tokenHandler={tokenHandler}/>} />

                <Route path="/test2" element={<Test />} />
                <Route path="/testApp" element={<TestApp />} />
                
                    <Route path="/layout" element={
                        <TokenContext.Provider value={myToken}>
                            <Layout />
                        </TokenContext.Provider>
                    }>
                        <Route index element={<Dashboard />} />
                        <Route path="allSKU" element={<AllSku />} />

                        <Route path="allParts" element={<AllParts />} />

                        <Route path="allbom" element={<AllBOM />}>
                            <Route index element={<AllBOMDashboard />} />
                            <Route path="showBOM" element={<ShowBOM />} />
                            <Route path="bomAnalyse" element={<BOMAnalyse />} />
                            <Route path="bomMRP" element={<BOMforMRP />} />
                        </Route>
                        
                        <Route path="admin" element={<AdminPanel />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="userMgt" element={<UserManagement />} />
                            <Route path="appSetup" element={<AppSetup />} />
                        </Route>
                        <Route path="showProduction" element={<ShowProduction />}>
                            <Route index element={<ProductionHistoryDaily />}/>
                            <Route path="weeklyProduction" element={<ProductionHistoryWeekly />}/>
                            <Route path="monthlyProduction" element={<ProductionHistoryMonthly />}/>
                            <Route path="yearlyProduction" element={<ProductionHistoryYearly />}/>
                        </Route>
                    </Route>
            </Routes>
        </div>
    );
};

export default App;
