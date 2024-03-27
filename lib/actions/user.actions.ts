"use server"

import { connectToDB } from '../mongoose';
import User from "../models/user.model";
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';

interface Params{
    userId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path:string;
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}:Params ) : Promise<void> {
    
    try{
        connectToDB();
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {upsert: true} //  update or insert , whichever applicable
        );
          if (path === '/profile/edit'){
            revalidatePath(path);
          } // revalidatePath allows you to purge cached data on-demand for a specific path
    } catch( error:any ){
        throw new Error(`Failed to create/update user: ${error.message}`);
    }       
}

export async function fetchUser(userId: string){

    try{
        connectToDB();
        // console.log(`Inside fetchUser api - , params are , userId:${userId}`);
        const users=await User.findOne({ id: userId });
        return users;
    }catch(error:any){
        throw new Error(`Failed to fetch user:${error.message}`)
    }
}

export async function fetchUserPosts(userId: string) {
    try {
      connectToDB();
  
      // Find all threads authored by the user with the given userId
      const threads = await User.findOne({ id: userId })
        .populate({
            path: "threads",
            model: Thread,
            populate: [
            //   {
            //     path: "community",
            //     model: Community,
            //     select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
            //   },
            {
                path: "children",
                model: Thread,
                populate: {
                path: "author",
                model: User,
                select: "name image id", // Select the "name" and "_id" fields from the "User" model
                },
            },
            ],
        }).lean();
      return threads;
    } catch (error) {
      console.error("Error fetching user threads:", error);
      throw error;
    }
  }
  