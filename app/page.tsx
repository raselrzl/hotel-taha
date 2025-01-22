import { Button} from 'antd';
import { UserButton } from "@clerk/nextjs";
import {currentUser } from "@clerk/nextjs/server";
import { connectMongoDB } from '@/config/db';
connectMongoDB()
export default async function Home() {
  let userId="";
  let name="";
  let email="";
  const currentUserData= await currentUser();
  /* console.log(currentUserData) */
  if(currentUserData){
    userId=currentUserData?.id;
    name=currentUserData?.firstName + " "+currentUserData?.lastName;
    email=currentUserData?.emailAddresses[0].emailAddress;

  }

  return (
    <div className="flex flex-col items-center">
      <h1>Home Page</h1>
      <h1>Clerk:{userId}</h1>
      <h1>name: {name}</h1>
      <h1>email: {email}</h1>
      <Button type="default">Start</Button>
      <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  );
}
