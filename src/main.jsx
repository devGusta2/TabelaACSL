import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Adm from './adm/index.jsx';

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
]);

// Renderização com React 18
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
