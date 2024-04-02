"use client";
import { baseURL } from "@/utils/constant";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { isLogin, setAuthentication } from "@/utils/auth";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/admin/dashboard");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        console.log(res.data);

        setAuthentication(res.data.token);
        toast.success("Login Successful");
        router.push("/admin/dashboard");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className={`${pageReady ? "block" : "hidden"} grid grid-cols-[1fr,30%]`}>
      <div className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="text-[#000000] font-bold text-4xl">
            Login to Admin Account
          </h1>
          <div className="flex items-center gap-4 pt-8 w-fit mx-auto">
              <div className="icon__wrapper  border-[#FA2E56]  hover:border-neutral-700">
                <FaFacebookF className=" text-neutral-600  hover:text-[#FA2E56]" />
              </div>
              <div className="icon__wrapper border-[#FA2E56]  hover:border-neutral-700">
                <FaGoogle className="  text-neutral-600  hover:text-[#FA2E56]" />
              </div>
              <div className="icon__wrapper  border-[#FA2E56]  hover:border-neutral-700"  >
                <FaInstagram className="  text-neutral-600  hover:text-[#FA2E56]" />
              </div>
          </div>

          <p className="pt-8 text-[13px] text-gray-400">
            or contact admin for more details.
          </p>

          <form
            className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
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

            <button className="uppercase bg-[#FA2E56]  hover:bg-neutral-700 px-4 py-2 text-white mt-4">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-100 h-screen grid place-items-center">
        <div className="text-center w-full text-white space-y-8">
          <img src="/d.png" alt="Company Logo" className="h-62 mx-auto"  />
        </div>
      </div>
    </div>
  );
};

export default Login;

