import { useState, useEffect } from "react";
import databaseService from "../appwrite/db";
import { BlogCard } from "../components";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts: any) => posts && setBlogs(posts.documents));
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {blogs.map((blog: any) => (
          <div key={blog.$id} className="p-2 w-1/4">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBlogs;
