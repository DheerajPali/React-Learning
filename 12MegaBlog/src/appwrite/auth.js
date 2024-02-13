import conf from '../conf/conf'
import {Client,Account,ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // async method for account creation , which will take some parameters.
    async createAccount({email,password,name}){

        // always use try catch for better error handling, core js
        try{
            // console.log(data);
            const userAccount= await this.account.create
            (ID.unique(),email,password,name);
            if (userAccount) {
                //call another method to direct login after creating account. 
                return this.login({email,password});
            } else {
                return userAccount;
            } 
        }
        catch(error){
            throw error;
        }
    }


    // Creating async method , which will always take same parameter ,and you can change your backend resource anytime without facing any issue. 
    async createLogin({email,password}){

        // always use try catch for better error handling, core js
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // Here you'll get error on console , for your custom error. 
            console.log("appwrite servece :: getCurrentUser :: error",error);
        }
    // if we won't get any user , then it will return null , but if any error occured and 
    // if it's returning something , then we may face issues. That's why ....
        return null; 
    }

    
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error",error);
        }
    }

}

const authService = new AuthService();
export default authService;



// This code is written with best approach , like if we're going to change whole backend , then also here won't be even a single change in UI. 
// WE CAN USE THIS FILE IN MULTIPLE PROJECTS , BECAUSE LOGIN PROCESS WILL BE SAME FOR MULTIPLE PROJECTS.