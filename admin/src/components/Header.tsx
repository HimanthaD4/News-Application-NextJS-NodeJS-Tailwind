import React from "react";

interface HeaderProps {
  adminName: string;
  onLogOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ adminName, onLogOut }) => {
  return (
    <header className="bg-gray-200 text-gray-600 py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        <span className="hidden sm:block mr-4 text-sm font-medium">Welcome, {adminName}</span>
        <button
          onClick={onLogOut}
          className="bg-transparent hover:bg-gray-300 text-gray-600 font-semibold hover:text-gray-700 py-2 px-4 border border-gray-400 hover:border-transparent rounded transition-colors duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
