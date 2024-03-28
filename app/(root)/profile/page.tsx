import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"

const ProfileRoot = async()=>{

    const user= await currentUser();
    const userInfo= await fetchUser(user.id);
    return (
        <ProfileHeader
            accountId={userInfo._id}
            authUserId={userInfo.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
        />
    )
}

export default ProfileRoot;