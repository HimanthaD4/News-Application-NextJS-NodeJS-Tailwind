import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const categories = [
    { name: "Technology", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Science", href: "#" },
    { name: "Business", href: "#" },
    { name: "Health", href: "#" },
    { name: "Entertainment", href: "#" },
  ];

  return (
    <header className="bg-white text-gray-600 py-6 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg font-bold" style={{ height: "80px" }}>
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <div>
            <Image src="/d.png" alt="Logo" width={90} height={30} />
          </div>
        </Link>
      </div>

      {/* Categories */}
      <nav className="hidden md:flex space-x-6">
        {categories.map((category, index) => (
          <Link key={index} href={category.href}>
            <div className="text-red-700 hover:text-gray-900 transition duration-200 ease-in-out cursor-pointer">
              {category.name}
            </div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
