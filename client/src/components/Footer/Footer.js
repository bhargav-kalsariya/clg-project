import React from 'react'
import './Footer.scss';
import { AiOutlineCreditCard, AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail, AiOutlineTwitter } from 'react-icons/ai'

function Footer() {
    return (
        <footer className='Footer'>
            <div className="container">
                <div className="content">
                    <div className="footer-left">
                        <h3 className='title'>follow us</h3>
                        <ul className='follow'>
                            <li className='hover-link center'>
                                <AiOutlineInstagram />
                            </li>
                            <li className='hover-link center'>
                                <AiOutlineFacebook />
                            </li>
                            <li className='hover-link center'>
                                <AiOutlineTwitter />
                            </li>
                            <li className='hover-link center'>
                                <AiOutlineMail />
                            </li>
                        </ul>
                    </div>
                    <div className="footer-right">
                        <h3 className="title">Company</h3>
                        <ul className='company'>
                            <li className="hover-link">Contect Us</li>
                            <li className="hover-link">Privacy Policy</li>
                            <li className="hover-link">Returns And Exchanges Policy</li>
                            <li className="hover-link">Shipping Policy</li>
                            <li className="hover-link">Terms & Conditions</li>
                        </ul>
                    </div>

                </div>
                <div className="subfooter center">
                    <ul className="credit-card-icon">
                        <li className='hover-link center'>
                            <AiOutlineCreditCard />
                        </li>
                    </ul>
                    <p>Copyright {new Date().getFullYear()} , <strong>POSTERZ.</strong></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer