"use client"

import { useForm } from "react-hook-form";
//import { Form } from "../ui/form";
import {zodResolver} from '@hookform/resolvers/zod';
import { UserValidation } from "@/lib/validations/user";
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

import '../../app/globals.css'
interface Props {
    user:{
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle:string;
}

const AccountProfile=({user,btnTitle}:
    Props)=>{
        const [files,setFiles]=useState<File[]>([])
        const form =useForm({
            resolver:zodResolver(UserValidation),
            defaultValues:{
                profile_photo:user?.image||'',
                name:user?.name|| '',
                username:user?.username|| '',
                bio:user?.bio||''
            }
        }); {/** form data to pass into shadcn component. Validation has to
            be passed. Filled with default values from User prop obtained 
            from sign-in data */}
    
    const handleImage=(e:ChangeEvent<HTMLInputElement>, fieldChange:(value:string) =>void ) => {
        e.preventDefault(); //prevents browser reload
        const fileReader=new FileReader(); // read file from the useState

        if (e.target.files && e.target.files.length>0){
            const file=e.target.files[0];
        
        setFiles(Array.from(e.target.files));
        if (!file.type.includes('image')) return; // if filetype is not an image return

        /**  --> Taken from MDN docs
         * 
         * The FileReader object lets web applications asynchronously read the contents 
         * of files  (or raw data buffers) stored on the user's computer, using File or 
         * Blob objects  to specify the file or data to read.File objects may be 
         * obtained from a FileList object returned as a result 
         * of a user selecting files using the <input> element, or 
         * from a drag and drop operation's DataTransfer object.
         *  
         */

        fileReader.onload=async(event)=>{
            const imageDataUrl=event.target?.result?.toString()||'';
            fieldChange(imageDataUrl);
        }
        fileReader.readAsDataURL(file);
    }
    }

    function onSubmit(values: z.infer<typeof UserValidation>) {
       // reupload image and update user data in db.
        console.log(values)
      }
    
    return (
        <Form {...form}>
        <form 
        className="flex flex-col justify-center gap-10"
        onSubmit={form.handleSubmit(onSubmit)} 
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem  className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                 {field.value ?(
                    <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                    />
                 ) : (
                    <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="rounded-full object-contain"
                    />
                 )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-grey-200">
                  <Input 
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image_input"
                  onChange={(e)=>handleImage(e,field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem  className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                 Name
                </FormLabel>
                <FormControl>
                  <Input 
                  type="text"
                  className="account-form_image_input"
                  {...field}
                  
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem  className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                 Username
                </FormLabel>
                <FormControl>
                  <Input 
                  type="text"
                  className="account-form_image_input"
                  {...field}
                  
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
                <FormItem  className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                 Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                  rows={10}
                  className="account-form_image_input"
                  {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">Submit</Button>
        </form>
      </Form>
    )
}

export default AccountProfile;