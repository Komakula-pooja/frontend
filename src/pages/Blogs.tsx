import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mt-8">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-slate-600 hover:bg-gray-400 focus:outline-none 
              focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-lg px-8 py-3 
              text-center transition-all duration-300">
            Create Blog
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="mt-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              authorId={blog.authorId}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
              initialLikes={blog.likes}
              isLikedInitially={blog.isLiked}
              BACKEND_URL={BACKEND_URL}
              date={new Date(blog.createdAt)}
              commentsCount={blog.commentsCount || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
