import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/db";
import { Button } from "../components";
import parse from "html-react-parser";

const Blog = () => {
  const [blog, setBlog] = useState<Record<string, any>>({});
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
        })
        .catch(() => {});
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
          navigate("/");
        }
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  return blog ? (
    <div className="py-16 max-w-[940px] m-auto">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={`${
            blog.featuredImage
              ? databaseService.getFilePreview(blog.featuredImage)
              : "fallbackimage.jpg"
          }`}
          alt={blog.title}
          className="rounded-xl"
        />

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-blog/${blog.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deleteBlog}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
      </div>
      <div className="browser-css">{blog.content && parse(blog.content)}</div>
    </div>
  ) : null;
};

export default Blog;
