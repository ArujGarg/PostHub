import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";


type PostType = {
    author: {
        profilePic: string,
        username: string,
        name: string
    }
    likeCount: number,
    commentCount: number,
    content: string,
    publishedAt: string,
    updatedAt: string,
    id: number
}

export const usePosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    const fetchPosts = useCallback(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/home`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
            setPosts(response.data.posts);
            setLoading(false)
        }).catch(error => {
            console.error(error);
            console.log(BACKEND_URL)
            setLoading(false)
        })
    }, [])
    

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])

    const addNewPost = (newPost: PostType) => {
        setPosts(prevPosts => [newPost, ...prevPosts])
        setTimeout(() => {
            fetchPosts()
        }, 2000);
    }

    return ({
        loading,
        posts,
        addNewPost
    })
}


export const usePost = (id: number) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<PostType>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setPost(response.data)
            setLoading(false)
        })

    }, [id]);

    return {
        loading,
        post
    }
}