import { useEffect, useState } from "react";
import databaseService from "../../appwrite/db";
import { Link } from "react-router-dom";
import { Button } from "..";
import { error } from "../../utils/toasts";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts: any) => {
        posts && setBlogs(posts.documents);
      })
      .catch((err) => error(err.message))
      .finally(() => setLoading(false));
  }, []);

  // First blog details
  const { $id, title, content, featuredImage, $createdAt } = blogs[0] ?? {};

  return (
    <section className="relative py-20 bg-teal-50 overflow-hidden">
      <div className="relative">
        <div className="mx-auto max-w-xl lg:max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-teal-900 uppercase">
              Our blogs
            </span>
            <h1 className="text-5xl font-bold">Latest Blogs</h1>

            {loading && (
              <h2 className="m-8 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Loading...
              </h2>
            )}
          </div>
          {blogs.length > 0 && (
            <>
              <div className="my-18 -mx-4 flex flex-wrap px-4">
                <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
                  <Link className="group block w-full" to={`/blog/${$id}`}>
                    <img
                      className="mb-5 block w-full rounded-lg"
                      src={`${
                        featuredImage
                          ? databaseService.getFilePreview(featuredImage)
                          : "/placeholder.jpg"
                      }`}
                      alt={title}
                    />
                    <span className="mb-5 block text-gray-500">
                      {new Date($createdAt).toDateString()}
                    </span>
                    <h4 className="mb-5 text-3xl font-semibold text-gray-900">
                      {title}
                    </h4>
                    <p className="max-w-xl text-lg text-gray-500">
                      {blogs[0]
                        ? String(content)
                            ?.replaceAll(
                              /<\/?[-a-zA-Z\d/:=#.?,&%;"_\s]+>/g,
                              " "
                            )
                            .replaceAll(/&[a-zA-Z]+;/g, " ")
                            .substring(0, 150)
                        : ""}
                      ...
                    </p>
                  </Link>
                </div>
                <div className="w-full px-4 lg:w-1/2">
                  {blogs.map(
                    ({ $id, title, content, featuredImage, $createdAt }, i) => {
                      if (i === 0 || i > 3) return;
                      return (
                        <Link
                          key={$id}
                          className="group mb-8 md:flex"
                          to={`/blog/${$id}`}
                        >
                          <img
                            className="h-28 w-48 rounded-lg object-cover"
                            src={`${
                              featuredImage
                                ? databaseService.getFilePreview(featuredImage)
                                : "/placeholder.jpg"
                            }`}
                            alt=""
                          />
                          <div className="my-4 pt-2 md:ml-6 md:mt-0">
                            <span className="mb-2 block text-gray-500">
                              {new Date($createdAt).toDateString()}
                            </span>
                            <h4 className="text-xl font-semibold text-gray-900">
                              {title}
                            </h4>
                            <p>
                              {String(content)
                                ?.replaceAll(
                                  /<\/?[-a-zA-Z\d/:=#.?,&%;"_\s]+>/g,
                                  " "
                                )
                                .replaceAll(/&[a-zA-Z]+;/g, " ")
                                .substring(0, 50)}
                              ...
                            </p>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="mt-14 text-center">
                <Link to="/blogs">
                  <Button
                    bgColor="bg-transparent"
                    textColor="text-teal-700 hover:text-teal-800"
                    className="border-2 border-teal-800 focus:ring-teal-100"
                  >
                    View All Blogs
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
