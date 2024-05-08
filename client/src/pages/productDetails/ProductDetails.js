import React, { useEffect, useState } from 'react'
import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../utilities/axiosClient';
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/Slices/CartSlice';

function ProductDetail() {

    const params = useParams();
    const [product, setProduct] = useState(null);
    const disPatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);
    const quantity = cart.find(item => item._id === params.productId)?.quantity || 0;

    async function fetchData() {

        const productResponse = await axiosClient.get(`/product/${params.productId}`);
        setProduct(productResponse.data.result.productDetails);

    }

    useEffect(() => {
        setProduct(null);
        fetchData();
    }, [params, disPatch])

    if (!product) {
        return <Loader />;
    }

    return (
        <div className='ProductDetail'>
            <div className="container">
                <div className="product-layout">
                    <div className="product-img center">
                        <img
                            src={product?.image?.url}
                            alt="product img" />
                    </div>
                    <div className="product-info">
                        <h1 className="heading">
                            {product?.title}
                        </h1>
                        <h3 className="price">₹ {product?.price}</h3>
                        <p className="description">
                            {product?.description}
                        </p>
                        <div className="cart-options">
                            <div className="quantity-selector">
                                <span className='btn decrement' onClick={() => disPatch(removeFromCart(product))}>-</span>
                                <span className='quantity'> {quantity} </span>
                                <span className='btn increment' onClick={() => disPatch(addToCart(product))}>+</span>
                            </div>
                            <button className="btn-primary add-to-cart" onClick={() => disPatch(addToCart(product))}>Add To Cart</button>
                        </div>
                        <div className="return-policy">
                            <ul>
                                <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde saepe ea laudantium.</li>
                                <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail