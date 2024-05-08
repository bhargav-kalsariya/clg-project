import React, { useEffect, useState } from 'react'
import './CreateCategory.scss';
import { BsCardImage } from 'react-icons/bs';
import { axiosClient } from '../../utilities/axiosClient';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/Slices/CategorySlice';

function CreateCategory() {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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

            await axiosClient.post('/category/create', {
                name,
                image
            })
            dispatch(fetchCategories());


        } catch (error) {

            return Promise.reject(error);

        } finally {

            setName('');
            setImage('');

        }

    }

    return (
        <div className='category-wrapper'>

            <h1 className='center'>Create Category</h1>
            <div className='CreateCategory'>
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

                    <input value={name} type="text" className='Input' placeholder=' Enter name here ' onChange={(e) => setName(e.target.value)} /> <br />
                    <button className='btn-primary' type="submit" onClick={handleSubmit}>Create Category</button>

                </div>

            </div>

        </div >
    )
}

export default CreateCategory