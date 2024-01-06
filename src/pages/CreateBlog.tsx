import PostForm from "../components/blog/PostForm";

function CreateBlog() {
  return (
    <div className="container m-auto py-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Create Blog
      </h1>
      <PostForm />
    </div>
  );
}

export default CreateBlog;
