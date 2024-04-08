import React from 'react'
import { KEY_ACCESS_TOKEN, getToken } from '../utilities/localStorageManager';
import { Outlet, Navigate } from 'react-router-dom';

function AuthorizeUser() {

    const user = getToken(KEY_ACCESS_TOKEN);

    return (

        user ? <Outlet /> : <Navigate to='/login' />

    )
}

export default AuthorizeUser