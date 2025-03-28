import { useEffect, useState } from "react"

import { PostInterface } from "../model/Post";
import { usePostStore } from "../zustand/PostStore";


export const usePosts = () => {
    const [loading, setLoading] = useState(false);
    const posts = usePostStore((state) => state.posts);
    const fetchPosts = usePostStore((state) => state.fetchPosts);
    const addPost = usePostStore((state) => state.addPost);
    
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchPosts()
            setLoading(false);
        }
        fetchData();
    }, [])

    const addNewPost = (newPost: PostInterface) => {
        addPost(newPost)
    }

    return ({
        loading,
        posts,
        addNewPost
    })
}


export const usePost = (postId: number) => {
    const [loading, setLoading] = useState(true);
    const post = usePostStore((state) => state.posts.find(post => post.id === postId));
    const fetchSinglePost = usePostStore((state) => state.fetchSinglePost);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchSinglePost(postId);
            setLoading(false);
        }
        fetchData();
    }, [postId])

    return {
        loading,
        post
    }
}