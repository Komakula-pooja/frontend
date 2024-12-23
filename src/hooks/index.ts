import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content":string;
    "title":string;
    "id":number;
    "authorId":number;
    "author":{
        "name":string;
    };
    publishedDate: string;
    likes: number;
    isLiked: boolean;
    likeCount?:number;
    createdAt:string;
    date:string;
    commentsCount?: number;
}


export const useBlog = ({id}:{id:string}) =>{
    const [loading, setLoading]=useState(true);
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response=>{
                setBlog(response.data.blog);
                setLoading(false);
                console.log(response.data.blog)
            })
    },[id])

    return {
        loading,
        blog
    }

}


export const useBlogs=()=>{
    const [loading, setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response=>{
                const sortedBlogs = response.data.blogs.sort((a: Blog, b: Blog) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                  setBlogs(sortedBlogs);
                setLoading(false);
            })
    },[])

    return {
        loading,
        blogs,
        setBlogs
    }
}
