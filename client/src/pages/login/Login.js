import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utilities/axiosClient';
import { KEY_ACCESS_TOKEN, setToken } from '../../utilities/localStorageManager';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const naviget = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });

            if (response) {

                setToken(KEY_ACCESS_TOKEN, response.data.result.accessToken);
                naviget('/');

            }

        } catch (error) {

            console.error(error);

        }

    }

    return (
        <div className='login'>
            <div className='login-box'>
                <h2 className='heading'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" onChange={(e) => { setEmail(e.target.value) }} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />

                    <input type="submit" className="submit" id="" />
                </form>
                <p className='subheading'>Do not have account?
                    <Link to='/signup' className='singup-btn'>  Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login