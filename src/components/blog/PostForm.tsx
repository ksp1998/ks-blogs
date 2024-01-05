import { SyntheticEvent, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RichEditor, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/db";

interface Props {
  post?: Record<string, any>;
}

export default function PostForm({ post = {} }: Props) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      values: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage || null,
      },
    });

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  const submit = async (data: Record<string, any>) => {
    const file =
      data?.featuredImage && data?.featuredImage[0]
        ? await databaseService.uploadFile(data.featuredImage[0])
        : null;

    if (post.$id) {
      file && databaseService.deleteFile(post.featuredImage);

      const dbBlog = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file?.$id : null,
      });

      if (!dbBlog) {
        alert("Oops! Failed to update blog!");
      }
    } else {
      const dbBlog = await databaseService.createPost({
        ...data,
        featuredImage: file ? file?.$id : null,
        userId: user.$id,
      });

      dbBlog && navigate(`/edit-blog/${dbBlog.$id}`);
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
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage")}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={`${
                post?.featuredImage
                  ? databaseService.getFilePreview(post?.featuredImage)
                  : "/fallbackimage.jpg"
              }`}
              alt={post?.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["publish", "draft"]}
          value={"publish"}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post?.$id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
