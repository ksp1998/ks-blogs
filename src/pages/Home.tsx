import { useEffect, useState } from "react";
import { BlogCard } from "../components";
import databaseService from "../appwrite/db";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts: any) => {
        posts && setBlogs(posts.documents);
      })
      .catch((error) => console.log(error));
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

export default Home;
