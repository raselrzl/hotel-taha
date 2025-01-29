"use client";
import React from "react";
import Header from "./header";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import { UserType } from "@/app/interfaces";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");

  /* const [loading, setLoading] = React.useState(true); */

 /*  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await GetCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }; */

  const getUserData = async () => {
    try {
      const response = await fetch("/api/get-user");
      const data = await response.json();
  
      if (data.success) {
        setLoggedInUserData(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
/*   const getUserData = async () => {
    try {
      const response = await fetch("/api/get-user");
      const data = await response.json();
  
      if (data.success) {
        setLoggedInUserData(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }; */
    
  React.useEffect(() => {
    if (!loggedInUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isAuthRoute) {
    return children;
  }

  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <div>
        <Header loggedInUserData={loggedInUserData} />
        <div className="text-center text-sm text-gray-500 py-20 px-5 lg:px-20">
          You are not authorized to access this page!!!
        </div>
      </div>
    );
  }

 /*  if (loading) {
    return <Spinner fullHeight />;
  } */

  return (
    <div>
      <Header loggedInUserData={loggedInUserData} />
      <div className="px-5 lg:px-20 mt-10">{children}</div>
    </div>
  );
}

export default LayoutProvider;