import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAdmin } from '../../redux/Slices/userSlice';
import CreateProduct from '../../components/CreateProduct/CreateProduct';

function Admin() {

    const curUser = useSelector(state => state.userReducer?.myProfile);
    const Admin = useSelector(state => state.userReducer?.isAdmin);
    const dispatch = useDispatch();

    useEffect(() => {

        curUser?.isAdmin ? dispatch(isAdmin(true)) : dispatch(isAdmin(false));

    }, [dispatch, curUser, Admin]);


    return (

        <div>

            {Admin && <CreateProduct />}
            {!Admin && <h1>you are not admin</h1>}

        </div>

    )
}

export default Admin