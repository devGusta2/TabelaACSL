import { Outlet, Navigate, BrowserRouter, Routes, Route} from "react-router-dom";

const ProtectedRoutes = () =>{
    const user = false;
    return user ? <Outlet /> : <Navigate to='./Pages/Login'/>
}
export default ProtectedRoutes; 


// import React from 'react';
// import {Switch, Route} from 'react-router-dom';

// import App from './App.jsx';
// import Adm from './adm/index.jsx';
// import Insights from './adm/Insights/Insights.jsx';
// import RawData from "./adm/Rawdata/RawData.jsx";
// import Predict from './adm/predict/index.jsx';
// import Login from './Pages/Login/index.jsx';

// export default ProtectedRoutes;

// <BrowserRouter>
//     <Routes>
//         <Route element={<Login/>} path="/Login"/>
//         {/* Rotas protegidas */}
//             <Route element={<ProtectedRoutes />}>
//                 <Route element={<Predict/>} path="/Login"/>
//             </Route>
//     </Routes>
// </BrowserRouter>


// export default function Routes(){
//     return(
//         <Switch>
//             <Route exact path='/Pages/Login' Component={Login}/>

//             <Route exact path='/adm' Component={Adm}/>
//             <Route exact path='/adm/insights' Component={Insights}/>
//             <Route exact path='/adm/raw-data' Component={RawData}/>
//             <Route exact path='/adm/predict' Component={Predict}/>
            
            
//         </Switch>
//     );
// }