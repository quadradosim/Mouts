import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Register from './containers/Register/registerEmployee'
import EditUser from './containers/Register/editEmployee'
import CreateUser from './containers/Register/addEmployee'
import Login from './containers/Auth/index'
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from './hooks/Private'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>          
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} /> 
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/register/create-user" element={<CreateUser />} />
        </Routes>
      </AuthProvider>     
    </BrowserRouter>
  </StrictMode>
)
