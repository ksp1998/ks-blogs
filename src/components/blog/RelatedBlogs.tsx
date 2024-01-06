import { useEffect, useState } from "react";
import databaseService from "../../appwrite/db";
import { Link } from "react-router-dom";
import { Button } from "..";

const RelatedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts: any) => posts && setBlogs(posts.documents));
  }, []);

  if (blogs.length === 0) return;

  return (
    <aside
      aria-label="Related articles"
      className="py-8 lg:py-24 bg-teal-50 dark:bg-gray-800"
    >
      <div className="px-4 mx-auto max-w-screen-xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Related Articles
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map(
            (blog: any, i) =>
              i < 4 && (
                <article key={blog.$id} className="group max-w-xs rounded-lg">
                  <Link to={`/blog/${blog?.$id}`}>
                    <img
                      src={`${
                        blog?.featuredImage
                          ? databaseService.getFilePreview(blog?.featuredImage)
                          : "/placeholder.jpg"
                      }`}
                      className="w-full mb-5 rounded-lg object-cover group-hover:scale-105 duration-300"
                      alt={blog?.title}
                    />
                  </Link>

                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <Link to={`/blog/${blog?.$id}`}>{blog?.title}</Link>
                  </h2>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    {blog?.content
                      ?.replaceAll(/<\/?[-a-zA-Z\d/:=#.?,&%;"_\s]+>/g, "")
                      .replaceAll(/&[a-zA-Z]+;/g, " ")
                      .substring(0, 75)}
                    ...
                  </p>
                  <Link to={`/blog/${blog?.$id}`}>
                    <Button
                      bgColor="bg-transparent hover:bg-transparent focus:ring-teal-100"
                      textColor="text-teal-700"
                      className="border-2 border-teal-800"
                    >
                      Read more
                    </Button>
                  </Link>
                </article>
              )
          )}
        </div>
      </div>
    </aside>
  );
};

export default RelatedBlogs;
