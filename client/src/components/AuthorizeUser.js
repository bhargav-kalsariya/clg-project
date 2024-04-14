import React, { useEffect } from 'react'
import { KEY_ACCESS_TOKEN, getToken } from '../utilities/localStorageManager';
import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/Slices/userSlice';

function AuthorizeUser() {

    const user = getToken(KEY_ACCESS_TOKEN);
    const disPatch = useDispatch();

    useEffect(() => {

        disPatch(getMyProfile());

    }, [disPatch])

    return (

        user ? <Outlet /> : <Navigate to='/login' />

    )
}

export default AuthorizeUser