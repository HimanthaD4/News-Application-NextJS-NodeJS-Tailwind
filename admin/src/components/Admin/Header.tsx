import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { isLogin, logOut } from "@/utils/auth";

interface User {
  name: string;
}

interface HeaderProps {
  adminName?: string;
}

const Header: React.FC<HeaderProps> = ({ adminName }) => {
  const [admin, setAdmin] = useState<User>({ name: adminName || '' });
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setAdmin(loggedIn.data);
      } else {
        router.push("/admin/login");
      }
    };

    authenticate();
  }, [router]);

  const handleLogOut = async () => {
    await logOut();
    toast.success("Logout Successfully");
    router.push("/admin/login");
  };

  return (
    <header className="bg-white text-gray-600 py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        <span className="hidden sm:block mr-4 text-sm font-medium">Welcome, {admin.name}</span>
        <button
          onClick={handleLogOut}
          className="bg-[#FA2E56] hover:bg-[#FFFFFF] text-[#FFFFFF] font-semibold hover:text-[#FA2E56] py-2 px-4 border hover:border-[#FA2E56] rounded transition-colors duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
