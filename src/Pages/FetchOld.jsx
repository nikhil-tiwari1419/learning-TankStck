import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../API/api';

function FetchOld() {

    const [post, setpost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getpostData = async () => {
        try {
            const res = await fetchPosts()
            if (res.status === 200) {
                setpost(res.data);
                setLoading(false);
            }
        } catch (err) {
            console.error(err)
            setError(true);
            setLoading(false);

        }
    }

    useEffect(() => {
        getpostData()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Something went wrong</h1>
    }

    return (
        <div className='p-3 pb-20 m-3 '>
            <ul className='border p-3 m-3 rounded text-left'>
                <h1>old style component fetch</h1>
                {post.map((curElem) => {
                    const { id, title, body } = curElem;
                    return (
                        <li key={id}>
                            <p className='font-bold text-lg capitalize text-yellow-400 '>{title}</p>
                            <p className='text-gray-400 text-xl'>{body}</p>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default FetchOld