import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Home from '../home/Home';

function Dashboard() {

    const Admin = useSelector(state => state.userReducer?.isAdmin);

    return (
        <>

            {Admin && 'welcome'}
            {!Admin && <Home />}

        </>
    )
}

export default Dashboard