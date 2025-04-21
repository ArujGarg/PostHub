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
        fetchPosts();
    }

    return ({
        loading,
        posts,
        addNewPost
    })
}


export const useUserPosts = (username: string) => {
    const [loading, setLoading] = useState(false);
    const userPosts = usePostStore((state) => state.userPosts)
    const fetchUserPosts = usePostStore((state) => state.fetchUserPosts)

    useEffect(() => {
        if(username == null) return;
        const fetchData = async () => {
            setLoading(true)
            await fetchUserPosts(username);
            setLoading(false)
        }
        fetchData();
    }, [username])

    return ({
        loading,
        userPosts
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