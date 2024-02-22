import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({
    text,author,communityId,path}:Params){
    try{
        connectToDB(); 
        const createThread=await Thread.create({
            text,
            author,
            community:null,
        });
   
        // Update user model for the user who created the thread
        await User.findByIdAndUpdate(author,{
            $push: {thread:createThread._id}
        })

        revalidatePath(path);
    }catch(error){
        throw new Error(`Error creating thread:${error}`);
    }
};