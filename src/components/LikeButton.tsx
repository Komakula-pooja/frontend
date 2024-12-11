import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
//import { BACKEND_URL } from "../config"; 
import axios from "axios";

interface LikeButtonProps {
  blogId: number;
  initialLikes: number;
  isLikedInitially: boolean;
  BACKEND_URL:string;
}

export const LikeButton = ({
  blogId,
  initialLikes,
  isLikedInitially,
  BACKEND_URL,
}: LikeButtonProps) => {
  const [likeCount, setLikeCount] =  useState<number>(isNaN(initialLikes) ? 0 : initialLikes || 0);
  const [isLiked, setIsLiked] = useState(isLikedInitially);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/like/${blogId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const data = response.data;
        if (data && data.success) {
          setIsLiked(data.isLiked);
          setLikeCount(data.totalLikes);
        }else {
            console.error("Failed to fetch like status:", data);
          }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [blogId, BACKEND_URL]);


  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/like/${blogId}`,
        {}, 
        {
          headers: {
            Authorization: localStorage.getItem("token"), 
          },
        }
      );
      console.log(response)
      
      const data = response.data; 
      if (data.success) {
        setIsLiked(data.action === "liked");
        setLikeCount((prev) => Math.max(0, prev + (data.action === "liked" ? 1 : -1)));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };


  return (
    <button
      onClick={handleLike}
      className="flex items-center justify-center p-2 transition-transform transform hover:scale-110"
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <Heart
        className={`w-6 h-6 transition-colors duration-200 ${
          isLiked ? "text-red-600" : "text-gray-500"
        }`}
      />
      <span className="ml-2 text-gray-700">{likeCount}</span>
    </button>
  );
};
