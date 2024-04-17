import React, { useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import Cart from '../Cart/Cart';
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from 'react-redux';

function Navbar() {

    const navigate = useNavigate();
    const [openCart, setOpenCart] = useState(false);
    const categories = useSelector(state => state.categoryReducer.categories);
    const cart = useSelector(state => state.cartReducer.cart);
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    return (
        <>
            <nav className='Navbar'>
                <div className="container nav-container">
                    <div className="nav-left">
                        <ul className='link-group'>
                            {categories?.map((category) => (
                                <li className='hover-link' key={category?._id}>
                                    <Link className='link' to={`/category/${category?._id}`}>{category?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="nav-center">
                        <Link to={'/'}>
                            <h1 className='banner'>Posterz.</h1>
                        </Link>
                    </div>
                    <div className="nav-right">
                        <div className="nav-admin hover-link" onClick={() => navigate('/admin/dashboard')}>
                            <MdAdminPanelSettings className='icon' />
                        </div>
                        <div className="nav-cart hover-link" onClick={() => setOpenCart(!openCart)}>
                            <BsCart2 className="icon" />
                            {totalItems > 0 && <span className='cart-count center'> {totalItems} </span>}
                        </div>
                    </div>
                </div>
            </nav >
            {openCart && <Cart onClose={() => { setOpenCart(false) }} />
            }
        </>
    )
}

export default Navbar