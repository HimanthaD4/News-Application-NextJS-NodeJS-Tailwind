"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import { isLogin, setAuthentication } from '@/utils/auth';
import { baseURL } from '@/utils/constant';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push('/admin/dashboard');
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const res = await axios.post(`${baseURL}/login`, payload);
      setAuthentication(res.data.token);
      toast.success('Login Successful');
      router.push('/admin/dashboard');
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      } else if (error.request) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Request failed. Please try again later.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <div className={`${pageReady ? 'block' : 'hidden'} grid grid-cols-1 md:grid-cols-[1fr,30%]`}>
      <div className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="text-[#000000] font-bold text-4xl">
            Login to Admin Account
          </h1>
          <div className="flex items-center gap-4 pt-8 w-fit mx-auto">
            <div className="icon__wrapper border-[#FA2E56] hover:border-neutral-700">
              <FaFacebookF className="text-neutral-600 hover:text-[#FA2E56]" />
            </div>
            <div className="icon__wrapper border-[#FA2E56] hover:border-neutral-700">
              <FaGoogle className="text-neutral-600 hover:text-[#FA2E56]" />
            </div>
            <div className="icon__wrapper border-[#FA2E56] hover:border-neutral-700">
              <FaInstagram className="text-neutral-600 hover:text-[#FA2E56]" />
            </div>
          </div>

          <p className="pt-8 text-[13px] text-gray-400">
            or contact admin for more details.
          </p>

          <form
            className="flex w-full max-w-xs mx-auto flex-col pt-2 gap-2"
            onSubmit={handleSubmit}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__style"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input__style"
              type="password"
              placeholder="Password"
              required
            />

            <p>Forgot your password?</p>

            <button className="uppercase bg-[#FA2E56] hover:bg-neutral-700 px-4 py-2 text-white mt-4">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-100 h-screen grid place-items-center">
        <div className="text-center w-full text-white space-y-8">
          <Image src="/d.png" alt="Company Logo" width={500} height={500} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;