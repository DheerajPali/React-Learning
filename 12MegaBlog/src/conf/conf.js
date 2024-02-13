const conf = {
    appwriteUrl:String(import.meta.env.VITE_),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketid:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf

//Environment variable must be in the form of string , and 
// we must ensure them to be in string that's why we are doing this, also if there will be any issue in environmenmt var. whole site will crash , and we'll unable to find the problem.
