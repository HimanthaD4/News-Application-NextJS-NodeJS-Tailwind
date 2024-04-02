"use client"
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import { baseURL } from "@/utils/constant";
import auth from '@/utils/withAuth';

const ManageAdmins = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Swal.fire("Missing Fields", "Please fill in all fields.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(form.password)) {
      Swal.fire("Weak Password", "Password must contain both numbers and letters.", "error");
      return;
    }
    if (form.password !== form.confirmPassword) {
      Swal.fire("Passwords Do Not Match", "Please ensure passwords match.", "error");
      return;
    }
    try {
      await axios.post(`${baseURL}/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Admin Added',
        text: 'The admin has been successfully added.'
      });
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      Swal.fire("Error", "An error occurred while creating the admin account.", "error");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center py-12">
      <Header />
      <Sidebar />
      <div className="mt-10 p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">Add Admin Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FA2E56] focus:border-[#FA2E56] sm:text-sm" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FA2E56] focus:border-[#FA2E56] sm:text-sm" placeholder="john.doe@example.com" required />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FA2E56] focus:border-[#FA2E56] sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FA2E56] focus:border-[#FA2E56] sm:text-sm" required />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FA2E56] hover:bg-[#D8345F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FA2E56]">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default auth(ManageAdmins);
