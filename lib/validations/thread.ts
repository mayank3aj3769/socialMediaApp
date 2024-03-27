"use client"

import * as z from 'zod';

// export const ThreadValidation=z.object({
//     thread:z.string().url().nonempty().min(3,{
//     message: 'Minimum 3 characters' }),
//     accountId:z.string()
// })   // This ThreadValidation fails to insert the thread in the schema. 

export const ThreadValidation = z.object({
    thread: z.string().min(1, "Please enter your thread content."),
    accountId: z.string().min(1, "Account ID is required."),
    // Include other fields as necessary and their validations
  });

  

// export const ThreadValidation = z.object({
//   thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
//   accountId: z.string(),
// });

  export const CommentValidation = z.object({
    thread: z.string().min(3, { message: "Minimum 3 characters." }),
  });