import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero/Hero'
import Category from '../../components/Category/Category'
import Product from '../../components/Product/Product'
import './Home.scss';
import { axiosClient } from '../../utilities/axiosClient';
import { useSelector } from 'react-redux';

function Home() {

    const categories = useSelector(state => state.categoryReducer?.categories);
    const [topProducts, setTopProducts] = useState(null);

    async function fetchData() {
        const topProductsResponse = await axiosClient.get(`/product/all`);
        setTopProducts(topProductsResponse.data.result.products);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='Home'>
            <Hero />
            <section className="collection container">
                <div className="info">
                    <div className="heading">Shop by Categories</div>
                    <p className="subheading">
                        Shop from the best, our Film and Tv Posters Collection.
                    </p>
                </div>
                <div className="content">
                    {categories?.map(category => <Category category={category} key={category._id} />)}
                </div>
            </section>

            <section className="collection container">
                <div className="info">
                    <div className="heading">Our Products</div>
                    <p className="subheading">
                        All New Designs, Same Old Details.
                    </p>
                </div>
                <div className="content">
                    {topProducts?.map(product => <Product product={product} key={product._id} />)}
                </div>
            </section>
        </div>
    )
}

export default Home