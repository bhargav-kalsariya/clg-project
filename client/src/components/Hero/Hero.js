import React from 'react'
import './Hero.scss';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
    return (
        <div className='Hero'>
            <div className="hero-content center">
                <div className="heading">Exclusive print and Artwork</div>
                <p className="subheading">Exclusive Art Pieces , for the Exclusive You</p>
                <button className='btn-primary cta' onClick={() => { navigate('category') }}>Explore more</button>
            </div>
        </div>
    )
}

export default Hero