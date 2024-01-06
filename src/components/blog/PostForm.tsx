import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RichEditor, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/db";
import { error, success } from "../../utils/toasts";

interface Props {
  post?: Record<string, any>;
}

const PostForm = ({ post = {} }: Props) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(post?.featuredImage);

  useEffect(() => {
    setImage(post?.featuredImage);
  }, [post.featuredImage]);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      values: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: null,
      },
    });

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  const submit = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const file =
        post.featuredImage !== data.featuredImage &&
        data?.featuredImage &&
        data?.featuredImage[0]
          ? await databaseService.uploadFile(data.featuredImage[0])
          : null;

      if (post.$id) {
        file && image && databaseService.deleteFile(image);

        const dbBlog = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file?.$id : post?.featuredImage,
        });

        dbBlog
          ? success("Blog Updated...")
          : error("Oops! Failed to update blog!");

        setImage(file ? file?.$id : post?.featuredImage);
        setLoading(false);
      } else {
        const dbBlog = await databaseService.createPost({
          ...data,
          featuredImage: file ? file?.$id : null,
          userId: user.$id,
        });

        dbBlog
          ? success("Blog Created...")
          : error("Oops! Failed to create blog!");

        dbBlog && navigate(`/edit-blog/${dbBlog.$id}`);
      }
    } catch (err: any) {
      error(err.message);
    }
  };

  const generateSlug = useCallback((value: string) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", generateSlug(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, generateSlug, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          defaultValue={getValues("slug")}
          onInput={(e: SyntheticEvent<HTMLInputElement>) => {
            setValue("slug", generateSlug(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RichEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage")}
        />

        {image && (
          <div className="w-full mb-4">
            <img
              src={`${
                image
                  ? databaseService.getFilePreview(image)
                  : "/fallbackimage.jpg"
              }`}
              alt={post?.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["publish", "draft"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={
            post?.$id
              ? "bg-teal-700 hover:bg-teal-800"
              : "bg-teal-700 hover:bg-teal-800"
          }
          className="w-full"
          disabled={loading}
        >
          {post?.$id
            ? loading
              ? "Updating"
              : "Update"
            : loading
            ? "Creating"
            : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
