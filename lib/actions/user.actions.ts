"use server"

import { connectToDB } from '../mongoose';
import User from "../models/user.model";
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import { getJsPageSizeInKb } from 'next/dist/build/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import Community from '../models/community.model';

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
        const users=await User.findOne({ id: userId }).populate({
            path: "communities",
            model: Community,
          });
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
              {
                path: "community",
                model: Community,
                select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
              },
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

export async function fetchtUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}:{
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}){
    try{
        connectToDB();

        const skipAmount = (pageNumber-1)* pageSize; // for pagination
        
        const regex = new RegExp(searchString,"i"); // regex for query param

        const query:FilterQuery<typeof User> ={
           id:{$ne:userId} 
        }

        if(searchString.trim()!==''){
            query.$or=[
                { username: { $regex:regex }},
                { name: { $regex:regex }}
            ]
        } 

        const sortOptions = {createdAt:sortBy};

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
        
        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount>skipAmount + users.length;

        return {users , isNext};

    }catch(error:any){
        throw new Error(`Failed to fetch users. Error :${error}`);
    }
}

export async function getActivity(userId:string) {
    try{
        connectToDB();

        // find all threads created by user
        const userThreads = await Thread.find({author:userId});

        //collect all the child thread ids (replies) from the 'children' field
        const childThreadIds = userThreads.reduce((acc,userThread)=>{ // acts as a for each and 
            return acc.concat(userThread.children);      //simply concatenates in a list of all the comments
        },[])

        const replies = await Thread.find({
            _id: {$in: childThreadIds},
            author: {$ne: userId}
        }).populate({
            path:'author',
            model: User,
            select: 'name image _id'
        })
        
        return replies;
    }catch(error:any){
        throw new Error (`Failed to fetch activity ${error.message}`);
    }
}