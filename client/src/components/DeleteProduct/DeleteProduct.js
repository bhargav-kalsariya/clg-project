import React, { useEffect, useState } from 'react'
import './DeleteProduct.scss'
import { axiosClient } from '../../utilities/axiosClient';

function DeleteProduct() {

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');

    async function fetchData() {
        const product = await axiosClient.get(`/product/all`);
        setProducts(product.data.result.products);
    }
    useEffect(() => {
        fetchData()
    }, [])

    async function handleDelete() { }

    return (
        <div className='ProductList'>

            {products.map((product) =>
                <div className='ProductItem'>
                    <div className="product-container">
                        <div className="product-img">
                            <div className="img-container">
                                <img src={product?.image?.url} alt={product?.title} className='product-image' />
                            </div>
                        </div>
                        <div className="product-info">
                            <div className="product-title">{product?.title}</div>
                            <div className="product-price">
                                ₹ {product?.price}</div>
                            <button className="delete-button" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default DeleteProduct