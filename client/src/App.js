import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
