import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import AuthorizeUser from './components/AuthorizeUser';
import IfNotLogin from './components/IfNotLogin';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<AuthorizeUser />}>

                    <Route path='/' element={<Home />}></Route>

                </Route>
                <Route element={<IfNotLogin />}>

                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/login' element={<Login />}></Route>

                </Route>
            </Routes>
        </div>
    );
}

export default App;
