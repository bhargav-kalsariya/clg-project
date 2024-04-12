import React, { useEffect, useState } from 'react'
import './Collection.scss'
import Product from '../../components/Product/Product'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { axiosClient } from '../../utilities/axiosClient';

function Collection() {

    const navigate = useNavigate();
    const params = useParams();
    const [categoryId, setCategoryId] = useState('');
    const [products, setProducts] = useState([]);
    const categories = useSelector(state => state.categoryReducer.categories);

    const sortOptions = [{
        value: 'price - Low To High',
        sort: 'price'
    }, {
        value: 'Newest First',
        sort: 'createdAt'
    }];

    const [sortBy, setSortBy] = useState(sortOptions[0].sort);

    async function fetchProducts() {
        const products = await axiosClient.get('/product/all');
        setProducts(products.data.result.products);
    }


    useEffect(() => {

        setCategoryId(params.categoryId);
        fetchProducts();

    }, [params, sortBy])

    function updateCategory(e) {
        navigate(`/category/${e.target.value}`)
    }

    return (
        <div className='Categories'>
            <div className="container">
                <div className="header">
                    <div className="info">
                        <h2>Explore All Print And Artwork</h2>
                        <p>India's largest collection of wall posters for your bedroom,living room,kids room,kitchen and posters & art prints at highest quality lowest price quaranteed.</p>
                    </div>
                    <div className="sort-by">
                        <div className="sort-by-wrapper">
                            <h3 className='sort-by-text'>Sort By</h3>
                            <select className='select-sort-by' name="sort-by" id="sort-by" onChange={(e) => setSortBy(e.target.value)}>
                                {sortOptions.map((item) => <option value={item.sort} key={item.sort}>{item.value}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="filter-box">
                        <h3>Category</h3>
                        {categories?.map(item => (
                            <div key={item._id} className="filter-radio">
                                <input
                                    type="radio"
                                    name='category'
                                    value={item._id}
                                    id={item.id}
                                    onChange={updateCategory}
                                    checked={item._id === categoryId}
                                />
                                <label htmlFor={item._id}>{item.title}</label>
                            </div>))}
                    </div>
                    <div className="product-box">
                        {products?.map((product) => <Product key={product._id} product={product} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection