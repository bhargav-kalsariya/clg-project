import React, { useEffect } from 'react'
import './DeleteCategory.scss';
import { axiosClient } from '../../utilities/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/Slices/CategorySlice';

function DeleteCategory() {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categoryReducer.categories);

    async function handleDelete(categoryId) {

        await axiosClient.delete(`/category/delete/${categoryId}`);

    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [categories, dispatch]);

    return (
        <div className='CategoryList'>

            {categories?.map((category) =>
                <div className='CategoryItem' key={category._id}>
                    <div className="category-container">
                        <div className="category-img">
                            <div className="img-container">
                                <img src={category?.image?.url} alt={category?.name} className='category-image' />
                            </div>
                        </div>
                        <div className="category-info">
                            <div className="category-title">{category?.name}</div>
                            <button className="delete-button" onClick={() => handleDelete(category?._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default DeleteCategory