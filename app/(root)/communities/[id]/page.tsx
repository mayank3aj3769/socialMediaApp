import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { communityTabs } from "@/constants";

import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

const Page = async ({params}:{params:{id:string}}) => {
    /**
     * params are from url
     * As with the 'create-thread' logic we have to figure out 
     * whether the user exists.
     */
    const user =await currentUser();
    if (!user) return null;
   
    const commmunityDetails=await fetchCommunityDetails(params.id);

   
    return (
        <section>
            <ProfileHeader
                accountId={commmunityDetails.id}
                authUserId={user.id}
                name={commmunityDetails.name}
                username={commmunityDetails.username}
                imgUrl={commmunityDetails.image}
                bio={commmunityDetails.bio}
                type="Community"
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value}
                            className="tab">
                                <Image
                                  src={tab.icon}
                                  alt={tab.label}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label==='Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {commmunityDetails.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent  value="threads" className="w-full text-light-1">
                        <ThreadsTab 
                            currentUserId={user.id}
                            accountId={commmunityDetails._id}
                            accountType="Community"
                        />
                    </TabsContent>
                    <TabsContent  value="members" className="w-full text-light-1">
                        <section className="mt-9 flex flex-col gap-10">
                           {commmunityDetails?.members.map((member:any)=>( 
                            <UserCard
                                key={member.id}
                                id={member.id}
                                name={member.name}
                                username={member.username}
                                imgUrl={member.image}
                                personType="User"
                            />
                           ))}
                        </section>
                    </TabsContent>
                    <TabsContent  value="requests" className="w-full text-light-1">
                        <ThreadsTab 
                            currentUserId={user.id}
                            accountId={commmunityDetails._id}
                            accountType="Community"
                        />
                    </TabsContent>    
                </Tabs>
            </div>
        </section>
    )

}

export default Page;