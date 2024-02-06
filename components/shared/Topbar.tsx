import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignedOut } from "@clerk/nextjs";

function Topbar() {   
    return (
    <nav className="topbar">
        <Link href="/" className="flex items-center gap-4">
            <Image src="/assets/logo.svg" alt="logo" width={28} height={28}/> 
            <p className="text-heading3-bold text-light-1 max-xl:hidden">Threads</p>
        </Link>
        <div className="flex items-center gap-1">
            <div className="block md:hidden"> {/* md for mobile devices it will fit in */}
            <SignedIn>  {/* Code within this will only work if you are signed up */}
                <SignedOut>
                    <div className="flex cursor-pointer">
                        <Image 
                        src="/assets/logout.svg"
                        alt="logout"
                        width={24}
                        height={24}
                        />
                    </div>
                </SignedOut>
            </SignedIn>
            </div>
            <OrganizationSwitcher 
            
            />
        </div>
    </nav>

    
)}

export default Topbar;