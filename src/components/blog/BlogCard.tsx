import { Link } from "react-router-dom";
import databaseService from "../../appwrite/db";

interface Props {
  blog: {
    $id: string;
    title: string;
    content: string;
    featuredImage: string;
  };
}

function BlogCard({ blog: { $id, title, content, featuredImage } }: Props) {
  return (
    <article className="group max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Link to={`/blog/${$id}`} className="">
        <img
          className="w-full h-[200px] object-cover group-hover:scale-105 duration-300"
          src={`${
            featuredImage
              ? databaseService.getFilePreview(featuredImage)
              : "/placeholder.png"
          }`}
          alt={title}
        />
      </Link>
      <div className="p-5">
        <Link to={`/blog/${$id}`}>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content
            ?.replaceAll(/<\/?[-a-zA-Z\d/:=#.?,&%;"_\s]+>/g, " ")
            .replaceAll(/&[a-zA-Z]+;/g, " ")
            .substring(0, 75)}
          ...
        </p>
        <Link
          to={`/blog/${$id}`}
          className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-teal-700 rounded-md hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
