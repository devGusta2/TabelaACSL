import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Adm from './adm/index.jsx';
import Insights from './adm/Insights.jsx';
import RawData from "./adm/RawData.jsx";

// Configuração do roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Usar "element" para componentes
  },
  {
    path: '/adm',
    element: <Adm />, // Corrigido para "element"
  },
 {
    path: '/adm/insights',
    element: <Insights />, // Add the new route
  },
    {
      path: '/adm/raw-data',
      element: <RawData />, // Add the new route
    }
]);

// Renderização com React 18
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
