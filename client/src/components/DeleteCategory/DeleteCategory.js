import React from 'react'
import './DeleteCategory.scss';
import { useSelector } from 'react-redux';
import { axiosClient } from '../../utilities/axiosClient';

function DeleteCategory() {

    const categories = useSelector(state => state.categoryReducer?.categories);

    // async function handleDelete(categoryId) {

    //     await axiosClient.delete(`/category/delete/${categoryId}`);

    // }

    return (
        <div className='CategoryList'>

            {categories.map((category) =>
                <div className='CategoryItem'>
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