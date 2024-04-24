import React, { useEffect } from 'react'
import { KEY_ACCESS_TOKEN, getToken } from '../utilities/localStorageManager';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/Slices/userSlice';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function AuthorizeUser() {

    const user = getToken(KEY_ACCESS_TOKEN);
    const disPatch = useDispatch();

    useEffect(() => {

        disPatch(getMyProfile());

    }, [disPatch])

    return (

        user ? <>
            <Navbar />
            <Outlet />
            <Footer />
        </> : <Navigate to='/login' />

    )
}

export default AuthorizeUser