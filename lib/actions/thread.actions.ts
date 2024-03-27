"use server"
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
    text: string,
    author: string,
    communityId: null,
    path: string,
}

export async function createThread({ text,author,communityId,path }:Params ){
    try{
        await connectToDB(); 
        console.log(`Inside create Thread api , text:${text}  , author:${author} , communityId:${communityId}`);
        const createThread=await Thread.create({
            text,
            author,
            community:null
        });
   
        // Update user model for the user who created the thread
        // await User.findByIdAndUpdate(author,{
        //     $push: {thread:createThread._id}
        // });
        const user=await User.findById(author);
        
        user.threads.push(createThread._id);
        await user.save();
        revalidatePath(path);
    }catch(error){
        throw new Error(`Error creating thread:${error}`);
    }
};

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    try{
        connectToDB();
    
        const skipAmount = (pageNumber - 1) * pageSize;
    
        const postsQuery = await Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
            path: "author",
            model: User,
            select: "_id name image" 
        })
        .populate({
            path: "children",
            populate: {
            path: "author",
            model: User,
            select: "_id name image",
            },
        }).exec();

        // Convert each post and its nested objects into a plain object. 

        /* Ensure that all data passed from server-side logic to client-side components in Next.js 
        (or similar SSR frameworks) must be easily serializable to JSON. This means avoiding passing
        Mongoose documents or any other complex JavaScript objects that have methods or non-serializable 
        properties directly to components. */
        const posts = postsQuery.map(post => {
            const postObj = post.toObject({ virtuals: true }); // Converts to plain object, retaining virtuals if needed
            postObj._id = postObj._id.toString(); // Convert ObjectId to string
            if (postObj.author) postObj.author._id = postObj.author._id.toString();
            postObj.children = postObj.children.map(child => {
                child._id = child._id.toString();
                if (child.author) child.author._id = child.author._id.toString();
                return child;
            });
            return postObj;
        });
        
        const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

        const isNext = totalPostsCount > skipAmount + posts.length;
    
        return { posts, isNext };
    }catch(error){
        throw new Error(`Error creating thread:${error}`);
    }
};


export async function fetchThreadById(id:string){
    try{
        connectToDB();
        //TODO: Populate Community
        const thread = await Thread.findById(id)
            .populate({
                path : 'author',
                model : User,
                select : "_id id name image"
            })
            .populate({
                path:'children',
                populate:[
                    {
                    path:'author',
                    model: User,
                    select: "_id id name parentId image"
                    },
                    {
                    path: 'children',
                    model: Thread,
                    populate:{
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                        },
                    },
                ],
            }).exec();

            
            const threadObj = thread.toObject({ virtuals: true }); // Converts to plain object, retaining virtuals if needed
            threadObj._id = threadObj._id.toString(); // Convert ObjectId to string
            if (threadObj.author) threadObj.author._id = threadObj.author._id.toString();
            threadObj.children = threadObj.children.map(child => {
                child._id = child._id.toString();
                if (child.author) child.author._id = child.author._id.toString();
                return child;
            });

            return threadObj;
    }catch(error:any){
        throw new Error (`Error fetching thread: ${error.message}`);
    }
}

export async function addCommentToThread(
    threadId:string,
    commentText:string,
    userId:string,
    path:string){
        try{
            connectToDB();
            //Find the original thread for the comment
            const originalThread=await Thread.findById(threadId);
            if(!originalThread){
                throw new Error("Thread not found");
            }

            //Create new thread with comment text
            const commentThread=new Thread({
                text : commentText,
                author : userId,
                parentId : threadId,
            });

            //save new thread
            const savedCommentThread=await commentThread.save();

            //update the original thread to include the new comment
            //const newId=JSON.stringify(savedCommentThread._id);
            console.log(`Inside addCommentToThread api --> savedCommentThread._id :${savedCommentThread._id}`);
            originalThread.children.push(savedCommentThread._id);

            //save the original thread
            await originalThread.save(); // In mongoose the changes made to a document has to be explicitly saved.

            revalidatePath(path);

        }catch(error:any){
            throw new Error(`Error adding comment to thread: ${error.message}`);
        }
        
    }