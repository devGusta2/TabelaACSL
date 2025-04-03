import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Insights from './Pages/Insights/Insights.jsx';
import RawData from "./Pages/Rawdata/RawData.jsx";
import Predict from './Pages/predict/index.jsx';
import ProtectedRoutes from './Auth/Auth.jsx';
import Login from './Pages/Login/index.jsx';
import Cadastro from './Pages/Cadastro/index.jsx';
import Home from './Pages/Home/index.jsx';
import FinalReport from './Pages/FinalReport/FinalReport.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Stats from "./Pages/Stats/Stats.jsx";
import Description1 from './Pages/Description/Description-1/index.jsx';
import Description2 from './Pages/Description/Description-2/index.jsx';
// Renderização correta com React 18

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/Cadastro" element={<Cadastro />} />
        <Route path="/pages/Description/Description-1" element={<Description1 />} />
        <Route path="/pages/Description/Description-2" element={<Description2 />} />
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/pages/Home" element={<Home />} />
          <Route path="/pages/predict" element={<Predict />} />
          <Route path="/pages/Rawdata" element={<RawData />} />
          <Route path="/pages/insights" element={<Insights />} />
          <Route path="/pages/FinalReport" element={<FinalReport />} />
          <Route path="/pages/Dashboard" element={<Dashboard />} />
          <Route path="/pages/Stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>
);
