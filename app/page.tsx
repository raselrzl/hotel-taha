import { Button} from 'antd';
import { UserButton } from "@clerk/nextjs";
import { connectMongoDB } from '@/config/db';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';
import { UserType } from './interfaces';
connectMongoDB()
export default async function Home() {
  const response:any=await GetCurrentUserFromMongoDB();
  let mongouser : UserType | null=null;
  if(response.success){
    mongouser=response.data
  }
  let clerkUserId="";
  let name="";
  let email="";
  
  /* console.log(currentUserData) */
  if(mongouser){
    clerkUserId=mongouser.clerkUserId;
    name=mongouser.name;
    email=mongouser.email;

  }

  return (
    <div className="flex flex-col items-center">
      <h1>Home Page</h1>
      <h1>Clerk:{clerkUserId}</h1>
      <h1>name: {name}</h1>
      <h1>email: {email}</h1>
      <Button type="default">Start</Button>
      <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  );
}
