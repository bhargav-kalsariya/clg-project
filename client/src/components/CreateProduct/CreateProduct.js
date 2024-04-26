import React, { useState } from 'react';
import './CreateProduct.scss';
import { BsCardImage } from 'react-icons/bs';
import { axiosClient } from '../../utilities/axiosClient';
import { useSelector } from 'react-redux';

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const categories = useSelector(state => state.categoryReducer.categories);

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setImage(fileReader.result)
            }
        }
    }

    async function handleSubmit() {

        try {

            await axiosClient.post('/product/create', {
                title,
                description,
                image,
                price,
                category
            })

        } catch (error) {

            return Promise.reject(error);

        } finally {

            setTitle('');
            setImage('');
            setDescription('');
            setPrice('');
            setCategory('');

        }

    }

    return (
        <div className='product-wrapper'>

            <h1 className='center'>Create Product</h1>
            <div className='Createproduct'>
                <div className="left-part">
                    {image && <div className="img-container">
                        <img className='post-img' src={image} alt="post-img" />
                    </div>}

                    <div className="bottom-part">
                        <div className="input-post-img">
                            <label htmlFor="userImg" className='lableImg'>
                                <BsCardImage className='icon' />
                            </label>
                            <input className='inputImg' type="file" accept='image/*' id="userImg" onChange={handleImageChange} />
                        </div>
                    </div>
                </div>
                <div className="right-part">

                    <input value={title} type="text" className='Input' placeholder=' Enter title here ' onChange={(e) => setTitle(e.target.value)} /> <br />
                    <textarea value={description} className='Input' placeholder=' Enter description here ' onChange={(e) => setDescription(e.target.value)} /> <br />
                    <input value={price} type="text" className='Input' placeholder=' Enter price here ' onChange={(e) => setPrice(e.target.value)} /> <br />
                    <select className='Input'
                        name="category"
                        id="categories"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">select category</option>
                        {categories.map((category) =>
                            <option key={category?._id} value={category._id}>{category?.name}</option>
                        )}
                    </select> <br />
                    <button className='btn-primary' type="submit" onClick={handleSubmit}>Create Product</button>

                </div>

            </div>

        </div >
    );
};

export default CreateProduct;