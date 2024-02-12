"use server"

import { connectToDB } from '../mongoose';
import User from "../models/user.model";
import { revalidatePath } from 'next/cache';

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