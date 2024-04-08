import React, { useEffect } from 'react'
import { axiosClient } from '../../utilities/axiosClient'

function Home() {

    async function fetchData() {

        const response = await axiosClient.get('/product/all');
        console.log(response);

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home