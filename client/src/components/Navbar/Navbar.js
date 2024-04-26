import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import Cart from '../Cart/Cart';
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout } from 'react-icons/ai';
import { axiosClient } from '../../utilities/axiosClient';
import { fetchCategories } from '../../redux/Slices/CategorySlice';
import { removeToken, KEY_ACCESS_TOKEN } from '../../utilities/localStorageManager';

function Navbar() {
    const disPatch = useDispatch();

    useEffect(() => {

        disPatch(fetchCategories());

    }, [disPatch])

    const navigate = useNavigate();
    const [openCart, setOpenCart] = useState(false);
    const categories = useSelector(state => state.categoryReducer.categories);
    const cart = useSelector(state => state.cartReducer.cart);
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);

    async function handleLogoutClicked() {

        await axiosClient.get('/auth/logout');
        removeToken(KEY_ACCESS_TOKEN);
        navigate('/login');

    }

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
                        <div className="nav-logout hover-link" onClick={handleLogoutClicked} >
                            <AiOutlineLogout className='icon' />
                        </div>
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