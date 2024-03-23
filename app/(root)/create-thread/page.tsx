
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import {redirect} from "next/navigation";
async function Page(){
    const user =await currentUser();
    console.log(`Fetching currentUser inside Page component. Fetched when /create-thread is hit.`)
    if (!user) return null;

    const userInfo=await fetchUser(user.id);

    console.log(`Completed fetchUser api call inside Page component, userInfor:${userInfo}`);
    if (!userInfo?.onboarded) redirect ('/onboarding'); // If user doesn't exist , send them back to onboarding page
  
    return (
      <>
          <h1 className="head-text">Create Thread</h1>
          <PostThread userId={userInfo._id}/>
      </>  
    )
}

export default Page;