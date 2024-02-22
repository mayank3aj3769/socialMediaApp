"use client"

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
//import { Form } from "../ui/form";
import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "../ui/textarea";

import { usePathname,useRouter } from "next/navigation";
import '../../app/globals.css'

import { updateUser } from "@/lib/actions/user.actions";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";

interface Props {
    userId: string;    
}

const PostThread=({userId}: Props) => {

    const router = useRouter(); 
    const pathname = usePathname();

    const form =useForm({
        resolver:zodResolver(ThreadValidation),
        defaultValues:{
            thread: '',
            accountId: userId, 
        }
    });

    const onSubmit = async(values:z.infer<typeof ThreadValidation>) =>{
        await createThread({
          text:values.thread,
          author:userId,
          communityId:null,
          path: pathname
     });

     router.push("/")
    }
    
    return( 
    <Form {...form}>
        <form 
        className="flex flex-col justify-center gap-10"
        onSubmit={form.handleSubmit(onSubmit)} 
        ></form>
        <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem  className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                 Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea
                  rows={15}
                  {...field}
                  
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
              Post Thread
          </Button>
    </Form>
    )  
}

export default PostThread;