import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { useParams } from 'react-router-dom'
import './Payments.scss'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/Slices/CartSlice';

function Payments() {
    const params = useParams();
    const status = params.status;
    const disPatch = useDispatch();
    const infoData = {
        success: {
            message: 'Your order has been placed successfully',
            cta: 'Shop More',
            icon: <BsFillCartCheckFill />
        },
        failed: {
            message: 'Payment Failed',
            cta: 'Try again',
            icon: <BiErrorCircle />
        }
    }
    if (status === 'success') {
        disPatch(resetCart())
    }
    return (
        <div className='Payments'>
            <div className="icon">{infoData[status].icon}</div>
            <h2 className="message">{infoData[status].message}</h2>
            <button className="btn-primary">
                {infoData[status].cta}
            </button>
        </div>
    )
}

export default Payments