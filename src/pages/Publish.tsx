import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks";

export const Publish = () => {
  const { setBlogs } = useBlogs(); // Get the setter for blogs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const newBlog = response.data.blog;

    // Call the handleNewBlog function to add the new blog at the top
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);

    // Navigate to the newly created blog
    navigate(`/blog/${newBlog.id}`);
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8 px-4 md:px-8">
        <div className="max-w-screen-lg w-full">
          {/* Title Input */}
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Title"
          />

          {/* Text Editor */}
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          {/* Publish Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="mt-4">
      <div className="w-full mb-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-white">
            <label className="sr-only">Write your article</label>
            <textarea
              onChange={onChange}
              rows={8}
              className="focus:outline-none block w-full text-sm text-gray-800 bg-white border-0 px-4 py-2"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

