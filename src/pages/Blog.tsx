import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/db";
import { Button } from "../components";
import parse from "html-react-parser";
import RelatedBlogs from "../components/blog/RelatedBlogs";
import { error, success } from "../utils/toasts";

const Blog = () => {
  const [blog, setBlog] = useState<Record<string, any>>({ loading: true });

  const { slug } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);

  const isAuthor = user && blog?.userId === user?.$id;

  useEffect(() => {
    if (slug) {
      databaseService
        .getPost(slug)
        .then((post) => {
          post && setBlog(post);
          !post && navigate("/404");
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })
        .catch(() => {
          error("Blog not found!");
          setBlog({});
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deleteBlog = () => {
    databaseService
      .deletePost(blog.$id)
      .then((status) => {
        if (status) {
          blog.featuredImage && databaseService.deleteFile(blog.featuredImage);
          success("Blog deleted!");
          navigate("/my-blogs");
        }
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  return (
    <>
      {blog?.$id && (
        <div className="py-16 max-w-[940px] m-auto">
          <h1 className="mb-16 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {blog?.title}
          </h1>
          <div className="w-full flex justify-center mb-4 relative rounded-xl">
            {blog.featuredImage && (
              <img
                src={`${
                  blog.featuredImage
                    ? databaseService.getFilePreview(blog.featuredImage)
                    : "/placeholder.png"
                }`}
                alt={blog.title}
                className="rounded-xl"
              />
            )}
          </div>

          <div className="flex">
            <address className="flex-grow flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={`https://eu.ui-avatars.com/api/?name=${
                    isAuthor ? user.name : "Anonymous"
                  }&size=64`}
                  alt={isAuthor ? user?.name : "Anonymous"}
                />
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {isAuthor ? user?.name : "Anonymous"}
                  </span>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      dateTime={new Date(blog?.$createdAt).toDateString()}
                      title="February 8th, 2022"
                    >
                      {new Date(blog?.$createdAt).toDateString()}
                    </time>
                  </p>
                </div>
              </div>
            </address>

            {isAuthor && (
              <div className="inline-flex gap-2">
                <Link to={`/edit-blog/${blog.$id}`}>
                  <Button
                    bgColor="bg-yellow-200 focus:ring-yellow-50"
                    textColor="text-yellow-900"
                  >
                    Edit
                  </Button>
                </Link>
                <span>
                  <Button
                    bgColor="bg-red-200 focus:ring-red-50"
                    textColor="text-red-900"
                    onClick={deleteBlog}
                  >
                    Delete
                  </Button>
                </span>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
          </div>
          <div className="browser-css no-tailwindcs">
            {blog.content && parse(blog.content)}
          </div>
        </div>
      )}

      {!blog.$id && !blog?.loading && (
        <div className="w-full py-16 max-w-[940px] m-auto flex flex-col items-center justify-center mb-4">
          <h1 className="text-5xl font-semibold mb-12">
            Oops! Blog does not exits!
          </h1>
          <Link to="/blogs">
            <Button>Back to Blags</Button>
          </Link>
        </div>
      )}

      <RelatedBlogs />
    </>
  );
};

export default Blog;
