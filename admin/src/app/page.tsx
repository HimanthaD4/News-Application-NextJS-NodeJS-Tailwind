"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isLogin, logOut } from "@/utils/auth";
import Dashboard from "@/app/dashboard/page";
// import Header from "../components/Header"; // Assuming the path to Header component is correct


interface User {
  name: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<User>({ name: "" });
  const [pageReady, setPageReady] = useState<boolean>(false);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setAdmin(loggedIn.data);
        setPageReady(true);
      } else {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <div>
      {/* <Header adminName={admin.name} onLogOut={handleLogOut} /> */}

      <Dashboard />
    </div>
  );
};

export default Home;
