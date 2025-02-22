import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Adm from './adm/index.jsx';
import Insights from './adm/Insights/Insights.jsx';
import RawData from "./adm/Rawdata/RawData.jsx";
import Predict from './adm/predict/index.jsx';
import ProtectedRoutes from './Auth/Auth.jsx';
import Login from './Pages/Login/index.jsx';
import Cadastro from './Pages/Cadastro/index.jsx';
import Home from './adm/Home/index.jsx';
import Dashboard from "./adm/Dashboard/Dashboard.jsx";
// Renderização correta com React 18
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adm" element={<Adm />} />
        
        
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/Cadastro" element={<Cadastro />} />
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/adm/Home" element={<Home />} />
          <Route path="/adm/predict" element={<Predict />} />
          <Route path="/adm/raw-data" element={<RawData />} />
          <Route path="/adm/insights" element={<Insights />} />
          <Route path={"/adm/dashboard"} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>
);
