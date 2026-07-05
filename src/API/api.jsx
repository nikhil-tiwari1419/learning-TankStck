import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

// to fetch all posts

export const fetchPosts = (pageNumber) => {
    return api.get(`/posts?_start=${pageNumber}&_limit=3`);
};


// to fetch the individual data 


export const fetchIndividualData = (id) => {
    return api.get(`/posts/${id}`)
}


// DELETE THE POST 
    export const deletepost = (id) =>{
        return api.delete(`/posts/${id}`)
    };
    