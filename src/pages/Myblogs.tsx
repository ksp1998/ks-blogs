import { useEffect, useState } from "react";
import databaseService from "../appwrite/db";
import { BlogCard, Button } from "../components";
import { useSelector } from "react-redux";
import { error } from "../utils/toasts";
import { Link } from "react-router-dom";

const Myblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    databaseService
      .getMyPosts()
      .then((posts: any) => posts && setBlogs(posts.documents))
      .catch((err) => error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section aria-label="All blogs" className="py-8 lg:py-24 dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-screen-xl">
        <h1 className="mb-16 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          My Blogs
        </h1>

        {loading && (
          <h2 className="mb-16 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Loading...
          </h2>
        )}

        {!loading && blogs.length === 0 && (
          <div className="w-full py-16 max-w-[940px] m-auto flex flex-col items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold mb-12">
              No blogs found in your account
            </h2>
            <Link to="/create">
              <Button>Post a Blog</Button>
            </Link>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog: any) => {
            if (user?.$id === blog?.userId) {
              return <BlogCard key={blog.$id} blog={blog} />;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Myblogs;
