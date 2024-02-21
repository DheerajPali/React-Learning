import conf from "../conf/conf";
import { Client,ID, Databases, Query,Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;


//constructor
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // post related services

    async createPost({title,slug,content,featuredImage,status,userId})
    {
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,{
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                )              
            } catch (error) {
                console.log("Appwrite service :: createPost ::error"
                ,error);
            }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // async updatePost(slug, {title, content, featuredImage, status}) {
    //     try {
    //         console.log("Updating post with slug:", slug);
    //         console.log("New post data:", {title, content, featuredImage, status});
    //         const result = await this.databases.updateDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             slug,
    //             {
    //                 title, content, featuredImage, status
    //             }
    //         );
     
    //         console.log("Post updated successfully:", result);
    //         return result;
    //     } catch (error) {
    //         console.error("Error updating post:", error);
    //         return false;
    //     }
    // }



    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPostById :: error"
            ,error)
            return false;
        }
    }

    //queris in appwrite....
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                // You can also do pagination here with quirie's help.
            )
            
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error",
            error);
            return false;
        }
    }
        

    // file upload service

    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketid,
                ID.unique(),
                file
            )   
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }

    // delete file 
    async deleteFile(fileId)
    {
        console.log(fileId)
        console.log("FileId"+fileId);
        console.log("BucketId"+ conf.appwriteBucketid)
        try {
          await this.bucket.deleteFile(conf.appwriteBucketid,fileId)
        //   console.log("FileId"+fileId);
        // console.log("BucketId"+ conf.appwriteBucketid)
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
            
        }
    }

    // file preview
     getFilePreview(fileId)
    {
        // console.log(fileId)
        try {
           return  this.bucket.getFilePreview(
                conf.appwriteBucketid,
                fileId,    
                      
            )     
        } catch (error) {
            console.log("Appwrite service :: previewFile :: error",error);
            return false;
        }
    }
}


const service = new Service();
export default service;