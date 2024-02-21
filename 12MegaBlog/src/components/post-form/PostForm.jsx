import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  // console.log("postform post:" + post.featuredImage)
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("data" + data)
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      // console.log("file.$id"+ file.$id)
      // console.log("file" + file)

      if (file) {
        console.log('file : post.featuredImage:' + post.featuredImage)
        // appwriteService.deleteFile(post.featuredImage);
      }
      // if(file){
      //   var imageId = await file.$id
      //   console.log("imageId"+imageId)
      // }
     
      const dbPost = await appwriteService.updatePost(post.$id,{...data,featuredImage:file?file.$id:undefined});
      console.log("dbPost"+dbPost);
      // console.log("file$id"+file.$id)
      // console.log(await appwriteService.updatePost(post.$id));
      if (dbPost) {
        navigate(`/post/${post.$id}`);
      }

      // data = { ...data, featuredImage: data.image[0] };
    }
  // const submit = async (data) => {
  //   console.log("Data received for submission:", data);
 
  //   if (post) {
  //       console.log("Editing existing post:", post);
 
  //       const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
  //       console.log("Uploaded file:", file);
 
  //       if (file) {
  //           console.log("Deleting previous featured image:", post.featuredImage);
  //           appwriteService.deleteFile(post.featuredImage);
  //       }
 
  //       // const updatedData = {
  //       //     ...data,
  //       //     featuredImage: file ? file.$id : undefined 
  //       // };
  //       // console.log("Updated post data:", updatedData);
 
  //       const dbPost = await appwriteService.updatePost(post.$id,{...data,featuredImage:file?file.$id:undefined} );
  //       console.log("Updated post in the database:", dbPost);
 
  //       if (dbPost) {
  //           console.log("Navigating to updated post:", dbPost);
  //           navigate(`/post/${dbPost.$id}`);
  //       }
  //     }
  else {
      const file = await appwriteService.uploadFile(data.image[0]);
      console.log(file);
      if (file) {
        // await appwriteService.uploadFile(data.image[0]);
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
      // Added by me
      // else {
      //   console.error("Please upload an image");
      // }
    }
  };
  //Slug creation, remove space and etc.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

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
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")         
         
          }
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;
