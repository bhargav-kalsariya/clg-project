import React from 'react'
import { KEY_ACCESS_TOKEN, getToken } from '../utilities/localStorageManager';
import { Navigate, Outlet } from 'react-router-dom';

function IfNotLogin() {

    const user = getToken(KEY_ACCESS_TOKEN);

    return (

        user ? <Navigate to='/' /> : <Outlet />

    )
}

export default IfNotLogin