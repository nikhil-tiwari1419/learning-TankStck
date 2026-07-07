import React, { useState } from 'react'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletepost, fetchPosts, updatePost } from '../API/api';
import { NavLink } from 'react-router-dom'

function FetchQuery() {

    const [pageNumber, setPageNumber] = useState(0);
    const queryClient = useQueryClient();

    const getPostData = async () => {
        try {
            const res = await fetchPosts(pageNumber)
            return {
                posts: res.data,
                total: Number(res.headers["x-total-count"]),
            };
        } catch (err) {
            console.error(err)
            throw err;
        }
    }


    // useQuery -> get the data 
    // useMutation -> use for CRUD operation's

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: getPostData,
        placeholderData: keepPreviousData,  // jab tak new data  recive nahi hota old data ko sho karo 

        // gcTimeut: 1000 * 60 * 5, // 5 minutes
        // staleTime: 9000, // 9sec

        // refetchInterval: 5000 -> it auto refetch after 5 sec, if you want to stop it then use refetchInterval: false

        // refetchIntervalInBackground: true, this is polling method continouse calling api in background even if you are not on the page, if you want to stop it then use refetchIntervalInBackground: false
    });


    // Mutation function to delete the post 
    const deleteMutation = useMutation({
        mutationKey: ['deletepost'],
        mutationFn: (id) => deletepost(id),
        onSuccess: (data, id) => {  // onsuccess is a callback function that is called when the mutation is successful, it takes two arguments, data and id, data is the response from the server and id is the id of the post that was deleted
            queryClient.setQueryData(['posts', pageNumber], (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    posts: oldData.posts.filter(post => post.id !== id),
                    total: oldData.total - 1,
                };
            })
            console.log('post deleated', data, id);
        },
        onError: (error, id) => {
            console.log("delete failed");
            console.log(error);
            console.log("Failed id:", id);
        },
    });

    // Mutation functino to update the post  
    const updateMutation = useMutation({
        mutationKey: ['updatePost'],
        mutationFn: (id) => updatePost(id),
        onSuccess: (apidata, postId) => {
            queryClient.setQueryData(['posts', pageNumber], (oldData) => {
                console.log(apidata, postId)
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    posts: oldData.posts.map((currentPost) =>
                        currentPost.id === postId
                            ? { 
                                ...currentPost, 
                                title: apidata.data.title, 
                                body: apidata.data.body,
                            } 
                            : currentPost
                        ),
                };
            });
        },
        onError: (error, id) => {
            console.log("delete failed");
            console.log(error);
            console.log("Failed id:", id);
        },
    });

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{error.message || 'Something went wrong'}</h1>
    }

    const PAGE_SIZE = 3;
    const totalpages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;


    return (
        <div className='min-h-screen'>
            <ul className='pb-20 p-3 m-3 rounded '>
                <h1 className='text-xs font-bold mb-2'>Modern style component fetch using React Query</h1>
                {data?.posts.map((curElem) => {
                    const { id, title, body } = curElem;
                    return (
                        <li key={id} className='list-disc border-b p-2 text-left'>
                            <NavLink to={`/qr/${id}`}>
                                <p className='font-bold'>ID: {id}</p>
                                <p className='font-bold uppercase text-lg text-green-500'>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                            <button
                                className='bg-red-400 text-black p-2 m-2 rounded mt-2 font-semibold cursor-pointer hover:bg-red-600'
                                onClick={() => deleteMutation.mutate(id)}>Delete</button>
                            <button
                                className='bg-red-400 text-black m-2 p-2 rounded mt-2 font-semibold cursor-pointer hover:bg-red-600'
                                onClick={() => updateMutation.mutate(id)}>Update</button>
                        </li>
                    )
                })}
            </ul>

            <div className='text-black font-semibold pb-30 flex gap-20 px-5'>
                <button
                    disabled={pageNumber === 0 ? true : false}
                    onClick={() => setPageNumber((prev) => prev - 3)}
                    className="border bg-green-500 rounded p-2 cursor-pointer disabled:opacity-50">Prev</button>
                <p className="font-bold text-white">{pageNumber / 3}</p>
                <button
                    disabled={(pageNumber / PAGE_SIZE) + 1 >= totalpages}
                    onClick={() => setPageNumber((prev) => prev + 3)}
                    className="border bg-green-500 rounded p-2 cursor-pointer disabled:opacity-50">Next</button>
            </div>
        </div>
    )
}

export default FetchQuery


