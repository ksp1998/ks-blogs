import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/blog/PostForm";
import { useEffect, useState } from "react";
import databaseService from "../appwrite/db";

function EditBlog() {
  const [blog, setBlog] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post: any) => post && setBlog(post));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <PostForm post={blog} />
    </div>
  );
}

export default EditBlog;
