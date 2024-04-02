import React from 'react';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Disclosure } from '@headlessui/react';
import {
  MdOutlineSpaceDashboard,
  MdOutlineAddCircle,
  MdOutlineCategory,
  MdOutlineSettings,
  MdOutlineLogout,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi'; 
import { AiOutlineUsergroupAdd } from 'react-icons/ai'; 
import Link from 'next/link';

function Sidebar() {
  const Logo = () => (
    <div className="flex-shrink-0">
      <Image src="/d.png" alt="Logo" width={80} height={40} />
    </div>
  );

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu className="block md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <div className="flex items-center justify-start mb-3">
              
              <Logo />
              <h2 className="text-base ml-4 cursor-pointer font-bold text-zinc-950 border-b border-gray-100 pb-4">
                 Dashboard
              </h2>
            </div>
            <div className="my-4 border-b border-gray-100 pb-4">
              <Link href="/admin/dashboard" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Dashboard
                  </h3>
                </div>
              </Link>
              <Link href="/admin/add-article" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineAddCircle className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Add Article
                  </h3>
                </div>
              </Link>
              <Link href="#" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineCategory className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Categories
                  </h3>
                </div>
              </Link>
              <Link href="#" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Comments
                  </h3>
                </div>
              </Link>

              <Link href="#" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <HiOutlineChartBar className="text-2xl text-gray-600 group-hover:text-white " /> {/* Added HiOutlineChartBar */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Analytics
                  </h3>
                </div>
              </Link>
              <Link href="#" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Messages
                  </h3>
                </div>
              </Link>
              <Link href="#" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Profile
                  </h3>
                </div>
              </Link>
              <Link href="/admin/manage-admins" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <AiOutlineUsergroupAdd className="text-2xl text-gray-600 group-hover:text-white " /> {/* Changed to AiOutlineUsergroupAdd */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Manage Admins
                  </h3>
                </div>
              </Link>
            </div>
            <div className="my-4">
              <Link href="/settings" passHref>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#FA2E56] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Settings
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default Sidebar;
