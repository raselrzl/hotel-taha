import { connectMongoDB } from '@/config/db';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';
connectMongoDB()
export default async function Home() {
  await GetCurrentUserFromMongoDB();
 

  return (
    <div className="flex flex-col items-center">
      <h1>Home Page</h1>
    </div>
  );
}
