import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, isAdmin } from '../../redux/Slices/userSlice';
import { Outlet, Navigate } from 'react-router-dom'

function Home() {

    const dispatch = useDispatch();

    const myProfile = useSelector(state => state.userReducer?.myProfile);
    const Admin = useSelector(state => state.userReducer?.isAdmin);

    useEffect(() => {

        dispatch(getMyProfile());

    }, [dispatch]);

    useEffect(() => {

        if (myProfile?.isAdmin) {
            dispatch(isAdmin(true));
        }

    }, [myProfile, dispatch]);

    return (
        Admin ? <Outlet /> : <h1>home page</h1>
    )
}

export default Home