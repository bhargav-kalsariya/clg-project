import React from 'react'
import './Product.scss';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

    console.log(product);
    const navigate = useNavigate();

    return (
        <div className='Product' onClick={() => { navigate(`/products/${product?._id}`) }}>
            <div className="product-container">
                <div className="product-img">
                    <div className="img-container">
                        <img src={product?.image} alt={product?.title} id='imag' />
                    </div>
                </div>
                <div className="product-info">
                    <div className="title">{product?.title}</div>
                    <div className="price">
                        ₹ {product?.price}</div>
                </div>
            </div>
        </div>
    )
}

export default Product