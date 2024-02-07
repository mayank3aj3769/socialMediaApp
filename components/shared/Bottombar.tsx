"use client";
import Link from "next/link";
import { sidebarLinks } from "../../constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Bottombar(){
    const pathname =usePathname();
    
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {/* We are adding this bottombar for our mobile navigation, so you 
                would be able to see the leftsidebar at the bottom in a mobile application */}
                {sidebarLinks.map((link) => {
                    const isActive =(pathname.includes(link.route) && link.route.length > 1) 
                    || pathname === link.route;
                
                return (
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={`bottombar_link ${isActive && "bg-primary-500 "}`}> {/* blue color for highlighting the sidebar */}
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={24}
                        height={24}
                    />

                    <p className="text-subtle-medium text-light-1 max-sm:hidden"> 
                        {link.label.split(/\s+/)[0]}
                    </p> {/** This shows the text as well icon in the tablet view  */}
                    
                    </Link>  
                );
             })}
            </div>

        </section>
    )
}

export default Bottombar;