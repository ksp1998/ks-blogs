import { useState, useEffect } from "react";
import databaseService from "../appwrite/db";
import { BlogCard } from "../components";
import { error } from "../utils/toasts";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts: any) => posts && setBlogs(posts.documents))
      .catch((err) => error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section aria-label="All blogs" className="py-8 lg:py-24 dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-screen-xl">
        <h1 className="mb-16 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          All Blogs
        </h1>

        {loading && (
          <h2 className="mb-16 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Loading...
          </h2>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog: any) => (
            <BlogCard key={blog.$id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllBlogs;
