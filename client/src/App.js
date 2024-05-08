import React, { useEffect, useRef } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import AuthorizeUser from './components/AuthorizeUser';
import IfNotLogin from './components/IfNotLogin';
import Collection from './pages/collection/Collection';
import ProductDetail from './pages/productDetails/ProductDetails';
import Admin from './pages/admin/Admin';
import Payments from './components/Payments/Payments';
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from 'react-redux';

export const TOAST_SUCCESS = 'toast-success'
export const TOAST_FAILURE = 'toast-failure'

function App() {

    const toastData = useSelector(state => state.userReducer.toastData);
    const isLoading = useSelector(state => state.userReducer.isLoading);
    const LoadingRef = useRef(null);

    useEffect(() => {

        if (isLoading) {
            LoadingRef.current?.continuousStart();
        } else {
            LoadingRef.current?.complete();
        }

    })

    useEffect(() => {

        switch (toastData.type) {
            case TOAST_SUCCESS:
                toast.success(toastData.message);
                break;

            case TOAST_FAILURE:
                toast.error(toastData.message);
                break;

            default:
                break;

        }

    }, [toastData])

    return (
        <div className="App">

            <LoadingBar color='blue' ref={LoadingRef} />
            <div><Toaster /></div>

            <Routes>
                <Route element={<AuthorizeUser />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/admin/dashboard' element={<Admin />} />
                    <Route path='/category/:categoryId?' element={<Collection />} />
                    <Route path='/products/:productId' element={<ProductDetail />} />
                    <Route path='/payments/:status' element={<Payments />} />


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
