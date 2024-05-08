import React, { useState } from 'react';
import CreateProduct from '../../components/CreateProduct/CreateProduct';
import DeleteProduct from '../../components/DeleteProduct/DeleteProduct';
import CreateCategory from '../../components/CreateCategory/CreateCategory';
import DeleteCategory from '../../components/DeleteCategory/DeleteCategory';
import { IoIosAddCircle } from "react-icons/io";
import './Admin.scss';

function Admin() {

    const [selectedOption, setSelectedOption] = useState('createProduct');

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case 'createProduct':
                return <CreateProduct />;
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
            <h1 className="admin-header">Admin Dashboard</h1>

            <div className='admin-container'>
                <div className="flex-menu-rendercompo">
                    <nav className="menu">
                        <ul>
                            <li onClick={() => setSelectedOption('createProduct')}><IoIosAddCircle className='icons' />Create Product</li> <br />
                            <li onClick={() => setSelectedOption('createCategory')}><IoIosAddCircle className='icons' />Create Category</li><br />
                            <li onClick={() => setSelectedOption('deleteProduct')}><IoIosAddCircle className='icons' />Delete Product</li><br />
                            <li onClick={() => setSelectedOption('deleteCategory')}><IoIosAddCircle className='icons' />Delete Category</li>
                        </ul>
                    </nav>
                    <div className="selected-component">
                        {renderSelectedComponent()}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Admin;
