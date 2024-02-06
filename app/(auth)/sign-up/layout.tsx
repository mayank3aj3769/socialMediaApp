import { ClerkProvider } from "@clerk/nextjs"
import {Inter} from "next/font/google"

import '../../globals.css'

export const metadata={
    title:'Threads',
    description:'A Next.js 13 Meta Threads Application'
}

const inter = Inter({subsets: ["latin"]}) //for applying this fonts to entire class

export default function RootLayout({ 
    children
    }:{
    children: React.ReactNode
    }){ // passing props as parameters
    return(

        <ClerkProvider> 
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}> 
                    {children}  {/* This renders the children*/}
                </body>
            </html>

        </ClerkProvider>
    )
}