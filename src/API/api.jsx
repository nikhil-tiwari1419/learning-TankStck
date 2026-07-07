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
export const deletepost = (id) => {
    return api.delete(`/posts/${id}`)
};


// // update post
// export const updatePost = (id) => {
//     return api.patch(`/posts/${id}`, { title: "i have updated" });
// };
// update post
export const updatePost = (id) => {
    return api.put(`/posts/${id}`,
        { title: "i have updated",body: " this is new updated body"}
    );
};


//scroll infinite
export const fetchUsers = async({pageParam = 1}) =>{
 try {
    const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
    return res.data;

 } catch (error) {
    console.log(error)
 }
}

