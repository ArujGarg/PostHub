import { create } from "zustand"
import { PostInterface } from "../model/Post"
import axios from "axios"
import { BACKEND_URL } from "../../config"

interface PostState {
    posts: PostInterface[],
    userPosts: PostInterface[],
    singlePost: PostInterface | null,
    addPost: (post: PostInterface) => void,
    removePost: (postId: number) => void,
    toggleLike: (postId: number) => void,
    fetchPosts: () => Promise<void>,
    fetchUserPosts: (userId: number) => Promise<void>,
    fetchSinglePost: (postId: number) => Promise<void>
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    userPosts: [],
    singlePost: null,

    addPost: (post) => set((state) => ({
        posts: [...state.posts, post]
    })),

    removePost: (postId) => set((state) => ({
        posts: state.posts.filter((post) => post.id != postId)
    })),

    toggleLike: (postId: number) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
                  liked: !post.liked
                }
              : post
          ),
        })),

        fetchPosts: async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/post/home`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(response);
            const data = response.data.posts;
            set({posts: data})
        },

        fetchUserPosts: async (userId: number) => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/post?userId=${userId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            const data = response.data
            console.log(data || 0)
            set({userPosts: data});
        },

        fetchSinglePost: async (postId: number) => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/post/${postId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            const data = response.data;
            set({singlePost: data})
        }



}))