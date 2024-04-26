import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin } from '../../redux/Slices/userSlice';
import CreateProduct from '../../components/CreateProduct/CreateProduct';
import UpdateProduct from '../../components/UpdateProduct/UpdateProduct';
import DeleteProduct from '../../components/DeleteProduct/DeleteProduct';
import CreateCategory from '../../components/CreateCategory/CreateCategory';
import DeleteCategory from '../../components/DeleteCategory/DeleteCategory';
import { IoIosAddCircle } from "react-icons/io";
import './Admin.scss';

function Admin() {
    const curUser = useSelector(state => state.userReducer?.myProfile);
    const Admin = useSelector(state => state.userReducer?.isAdmin);
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState('createProduct');

    useEffect(() => {
        curUser?.isAdmin ? dispatch(isAdmin(true)) : dispatch(isAdmin(false));
    }, [dispatch, curUser, Admin]);

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case 'createProduct':
                return <CreateProduct />;
            case 'updateProduct':
                return <UpdateProduct />;
            case 'deleteProduct':
                return <DeleteProduct />;
            case 'createCategory':
                return <CreateCategory />;
            case 'deleteCategory':
                return <DeleteCategory />;
            default:
                return null;
        }
    };

    return (
        <>
            {Admin && <h1 className="admin-header">Admin Dashboard</h1>}
            {Admin && (
                <div className='admin-container'>
                    <div className="flex-menu-rendercompo">
                        <nav className="menu">
                            <ul>
                                <li onClick={() => setSelectedOption('createProduct')}><IoIosAddCircle className='icons' />Create Product</li> <br />
                                <li onClick={() => setSelectedOption('createCategory')}><IoIosAddCircle className='icons' />Create Category</li><br />
                                <li onClick={() => setSelectedOption('updateProduct')}><IoIosAddCircle className='icons' />Update Product</li><br />
                                <li onClick={() => setSelectedOption('deleteProduct')}><IoIosAddCircle className='icons' />Delete Product</li><br />
                                <li onClick={() => setSelectedOption('deleteCategory')}><IoIosAddCircle className='icons' />Delete Category</li>
                            </ul>
                        </nav>
                        <div className="selected-component">
                            {renderSelectedComponent()}
                        </div>
                    </div>
                </div>
            )}
            {!Admin && <h1 className='not-admin-warning'>you are not admin</h1>}
        </>
    );
}

export default Admin;
