import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/blog/PostForm";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/db";
import { useSelector } from "react-redux";

function EditBlog() {
  const [blog, setBlog] = useState<Record<string, any>>({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post: any) => {
        if (post) {
          if (post.userId !== user.$id) {
            navigate("/404");
          }
          setBlog(post);
        } else {
          navigate("/404");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8 container m-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {blog?.title}
      </h1>
      <PostForm post={blog} />
    </div>
  );
}

export default EditBlog;
