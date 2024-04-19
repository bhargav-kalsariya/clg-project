import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import AuthorizeUser from './components/AuthorizeUser';
import IfNotLogin from './components/IfNotLogin';
import Collection from './pages/collection/Collection';
import ProductDetail from './pages/productDetails/ProductDetails';
import Footer from './components/Footer/Footer';
import Admin from './pages/admin/Admin';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route element={<AuthorizeUser />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/category/:categoryId?' element={<Collection />} />
                    <Route path='/products/:productId' element={<ProductDetail />} />
                    <Route path='/admin/dashboard' element={<Admin />} />


                </Route>
                <Route element={<IfNotLogin />}>

                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/login' element={<Login />}></Route>

                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
