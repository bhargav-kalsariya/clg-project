import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { axiosClient } from './../../utilities/axiosClient';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        const response = await axiosClient.post('/auth/signup', {
            name,
            email,
            password
        });

        if (response) {

            return navigate('/login');

        }
    }

    return (
        <div className='signup'>
            <div className='signup-box'>
                <h2 className='heading'>Login</h2>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label>
                    <input type="text" className="name" id="name" onChange={(e) => { setName(e.target.value) }} />

                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

                    <input type="submit" className="submit" id="" />
                </form>
                <p className='subheading'>Already have an account?
                    <Link to='/login' className='login-btn'>  Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup