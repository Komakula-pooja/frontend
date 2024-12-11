import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";


export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog} =useBlog({
        id:id || ""
    });

    if(loading || !blog){
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog
            blog={blog}  
            id={Number(id)}
            initialLikes={blog.likeCount || 0}
            isLikedInitially={blog.isLiked || false}
            BACKEND_URL={BACKEND_URL}
            date={new Date (blog.createdAt)}/>
    </div>

}