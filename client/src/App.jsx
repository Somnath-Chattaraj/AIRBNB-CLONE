import logo from './logo.svg';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Indexpage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './UserContext';

axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
