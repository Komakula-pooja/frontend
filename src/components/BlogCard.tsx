import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";

interface BlogCardProps {
  id: number;
  authorName: string;
  authorId: number;
  title: string;
  content: string;
  publishedDate: string;
  initialLikes: number;
  isLikedInitially: boolean;
  BACKEND_URL: string;
  date: Date;
  commentsCount: number;
}

export const BlogCard = ({
  id,
  authorName,
  authorId,
  title,
  content,
  initialLikes,
  isLikedInitially,
  BACKEND_URL,
  date,
}: BlogCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-4 border-b border-slate-200 w-full max-w-screen-md mx-auto">
      <Link to={`/blog/${id}`}>
        <div className="flex items-center">
          <Link to={`/otherprofile/${authorId}`}>
            <Avatar name={authorName} />
          </Link>
          <div className="font-extralight pl-2 text-sm flex flex-col">
            {authorName}
          </div>
          <div className="text-lg pl-2">·</div>
          <div className="pl-2 font-thin text-slate-500 text-sm">
            {formattedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <Link to={`/blog/${id}`} className="text-blue-600">
            {title}
          </Link>
        </div>
        <div className="text-md font-thin">
          <Link to={`/blog/${id}`} className="text-gray-800">
            {content.slice(0, 100) + "..."}
          </Link>
        </div>
      </Link>
      <div className="flex items-center justify-start pt-4 space-x-6">
        <LikeButton
          blogId={id}
          initialLikes={initialLikes}
          isLikedInitially={isLikedInitially}
          BACKEND_URL={BACKEND_URL}
        />

        <CommentButton blogId={id} />
      </div>
    </div>
  );
};

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center
      overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

