import { MessageSquare } from "lucide-react"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const CommentButton = ({ blogId, }: { blogId: number;  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      axios.get(`${BACKEND_URL}/api/v1/comment/${blogId}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        setComments(response.data.comments);
        setLoadingComments(false);
      }).catch(() => {
        setLoadingComments(false);
      });
    }
  }, [isModalOpen, blogId]);

  const handleCommentSubmit = () => {
    axios.post(`${BACKEND_URL}/api/v1/comment`, {
      blogId,
      content: comment
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
      setComments([...comments, response.data.response]);
      setComment("")
    });
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="flex items-center text-gray-600 hover:text-red-600 hover:scale-110 ">
        <MessageSquare className="h-6 w-6 " />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-24 border p-2 mb-4"
              placeholder="Write your comment here"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Comment
            </button>

            {/* <h3 className="mt-6 text-lg">Previous Comments</h3> */}
            <div className="max-h-60 overflow-y-auto mt-2">
              {loadingComments ? (
                <div>Loading comments...</div>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="border-t flex pt-2 mt-2">
                    <p className="text-sm font-semibold">{comment.users.name}: </p>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
