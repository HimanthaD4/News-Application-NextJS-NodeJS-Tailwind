"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isLogin, logOut } from "@/utils/auth";
import AdminDashboard from "@/app/adminDashboard/page";
import ArticlePage from "@/app/articles/page"; 
import Header from "../components/Header"; 

interface User {
  name: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<User>({ name: "" });
  const [pageReady, setPageReady] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setAdmin(loggedIn.data);
        setIsLoggedIn(true);
        setPageReady(true);
      } else {
        setIsLoggedIn(false); 
        setPageReady(true);
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/admin");
  };

  return (
    <div>
      {pageReady && (
        <>
          {isLoggedIn ? (
            <>
              <Header adminName={admin.name} onLogOut={handleLogOut} />
              <AdminDashboard />
            </>
          ) : (
            <>
              <ArticlePage />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
