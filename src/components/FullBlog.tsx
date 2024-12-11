import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
import { LikeButton } from "./LikeButton"
import { CommentButton } from "./CommentButton"

interface FullBlogProps {
    blog: Blog;
    id: number;
    initialLikes: number;
    isLikedInitially: boolean;
    BACKEND_URL: string;
    date:Date;
}

export const FullBlog = ({
    blog,
    id,
    initialLikes,
    isLikedInitially,
    BACKEND_URL,
    date
  }: FullBlogProps) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short", 
        year: "numeric", 
        month: "short", 
        day: "numeric"
    });
    return (
      <div className="min-h-screen flex flex-col">
        <Appbar />
        <div className="flex justify-center">
          <div className="grid grid-cols-12 gap-4 px-4 sm:px-10 w-full max-w-screen-xl py-12">
            <div className="col-span-12 md:col-span-8">
              <div className="text-3xl font-extrabold">{blog.title}</div>
              <div className="text-slate-500 pt-2">{formattedDate}</div>
              <div className="pt-4">{blog.content}</div>
              <div className="flex">
              <div className="pt-4">
                <LikeButton
                  blogId={id}
                  initialLikes={initialLikes}
                  isLikedInitially={isLikedInitially}
                  BACKEND_URL={BACKEND_URL}
                />
              </div>
              <div className="pt-6 mx-4">
                <CommentButton blogId={id} />
              </div>
              </div>
            </div>

            <div className="hidden md:block md:col-span-4">
              <div className="text-slate-600 text-lg">Author</div>
              <div className="flex w-full pt-4">
                <div className="pr-4 flex flex-col justify-center">
                  <Avatar size="big" name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                  <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                  <div className="pt-2 text-slate-500">
                  Exploring ideas and sharing insights—bringing words to life with stories that connect us all.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  