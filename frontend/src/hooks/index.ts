import axios from "axios";
import { useEffect, useState } from "react"
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

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/post/home`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setPosts(response.data.posts);
            setLoading(false);
        })
    }, [])

    return ({
        loading,
        posts
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