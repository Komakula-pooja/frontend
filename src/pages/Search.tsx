import { Appbar } from "../components/Appbar"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
 
interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
    };
    createdAt: string;
  }

export const Search=()=>{
    const [searchQuery, setSearchQuery] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        const trimmedQuery = searchQuery.trim();

        if (!trimmedQuery) {
            setError("Please enter a search title.");
            return;
        }
        setLoading(true);
        setError("");

        try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/search`, {
            params: { title: trimmedQuery },
            headers :{
                Authorization:localStorage.getItem('token')
            }
        });

        if (response.data.success) {
            setBlogs(response.data.blogs);
        } else {
            setError("No blogs found.");
        }
        } catch (err) {
        setError("Something went wrong while fetching blogs.");
        } finally {
        setLoading(false);
        }
    };
    return <div>
        <Appbar />
        <div className=" flex flex-col justify-center ">
            <div className="flex justify-center text-3xl font-bold mt-3 underline decoration-solid decoration-slate-400">
                Search Blog Titles
            </div>
            <div className="flex items-center max-w-sm mx-auto mt-4 ">                         
                <div className="relative w-full">
                    <input type="text"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5" placeholder="Enter blog title..." required />
                </div>
                <button onClick={handleSearch} type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 ">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </div>
        </div>
        {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">By {blog.author.name}</p>
              <p className="text-sm text-gray-700">{blog.content.slice(0, 100)}...</p>
              <a
                href={`/blogs/${blog.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
}