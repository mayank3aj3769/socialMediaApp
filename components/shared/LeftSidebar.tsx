"use client";

import Link from "next/link";
import { sidebarLinks } from "../../constants";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import { SignOutButton, SignedIn,useAuth } from "@clerk/nextjs";

const LeftSidebar =()=> {
    const router=useRouter(); 
    const pathname=usePathname();
    const { userId }=useAuth();
    return (
        <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
         {/* flex-col so that elements appear on top of each other.
            w-full for full width. Gap-6 for spacing and px for padding.

            sidebarLinks contains a simple constant data structures
            we are simplying mapping over it, for the functionalities in 
            the simple side bar */}
        {sidebarLinks.map((link) => {
          const isActive =(pathname.includes(link.route) && link.route.length > 1) 
          || pathname === link.route;
                
                if (link.route==='/profile'){
                    link.route=`${link.route}/${userId}`;
                }
                return (
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}> {/* blue color for highlighting the sidebar */}
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={24}
                        height={24}
                    />

                    <p className="text-light-1 max-lg:hidden">{link.label} </p>
                    
                    </Link>  
                );
             })}
             
            </div>
            <div className="mt-10 px-6">
            <SignedIn>  {/* Code within this will only work if you are signed up */}
                <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
                    <div className="flex cursor-pointer gap-4 p-4">
                        <Image 
                        src="/assets/logout.svg"
                        alt="logout"
                        width={24}
                        height={24}
                        />
                    </div>
                </SignOutButton>
            </SignedIn>
            </div>
        </section>

    );
};

export default LeftSidebar;