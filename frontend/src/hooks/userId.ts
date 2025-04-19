import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"

export const useUserId = (username: string) => {
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/${username}`)
                const authorId = response.data.userPosts[0]?.authorId;
                setUserId(authorId);
            } catch (error) {
                console.log("error fetching posts", error);
                setUserId(null)
            }
        }
        if(username) fetchData();
        
    }, [username])

    return ({
        userId
    })
}