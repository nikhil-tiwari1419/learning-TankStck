import React from 'react'
import { fetchIndividualData } from '../../API/api'
import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'

function FetchIndv() {

  const { id } = useParams()
  const fetchIndvpost = async () => {
    try {
      const res = await fetchIndividualData(id)
      return res.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: fetchIndvpost
  });

  if (isPending) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>{error.message || 'Something went wrong'}</h1>
  }

  return (
    <>
      <div className='border p-3 m-3 text-left rounded'>
        <p className='text-center font-mono'>Post ID Number : {id}</p>
        <p className='font-bold '>ID: {data.id}</p>
        <h4 className='text-lg font-bold text-blue-400 capitalize'>Title: {data.title}</h4>
        <p className='text-gray-400 text-lg font-semibold'>Body: {data.body}</p>

      </div>
      <NavLink to={'/qr'} >
        <button className='border flex mx-3 p-2 rounded bg-green-400 font-semibold text-sm text-black'>Go back</button>
      </NavLink>  
    </>
  )
}

export default FetchIndv

