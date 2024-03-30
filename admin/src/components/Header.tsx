// Header.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
  adminName: string;
  onLogOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ adminName, onLogOut }) => {
  return (
    <header className="bg-accentDark text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <FaUserCircle className="text-xl mr-2" />
          <div>
            <p className="font-semibold"> Welcome {adminName} !</p>
          </div>
        </div>
        <button
          className="bg-accentDark hover:bg-accentDark text-white px-4 py-2 rounded-full flex items-center"
          onClick={onLogOut}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
