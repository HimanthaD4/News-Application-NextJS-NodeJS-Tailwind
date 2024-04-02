// pages/add.tsx
"use client"
// pages/add.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import { MdAddAPhoto, MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Admin/Sidebar';
import Header from '@/components/Admin/Header';
import axios from 'axios';
import auth from '@/utils/withAuth';

const Add = () => {
  const [articleHead, setArticleHead] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleArticleHeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleHead(e.target.value);
  };

  const handleArticleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    if (!articleHead || !articleDescription || !selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields are required',
      });
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append('articleHead', articleHead);
    formData.append('articleDescription', articleDescription);
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Article added successfully',
      });
      setSelectedImage(null);
      setImagePreview(null);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
      setUploading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add article. Please try again later.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <div className="w-full max-w-md mt-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg font-medium text-gray-800">Title</label>
              <input id="title" name="title" type="text" className="border border-gray-300 rounded-md px-4 py-2" value={articleHead} onChange={handleArticleHeadChange} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="text-lg font-medium flex items-center text-gray-800">
                <MdAddAPhoto className="mr-2 text-accent" /> Image
              </label>
              <div className="relative border-2 border-gray-300 rounded-md px-4 py-3 focus-within:ring focus-within:border-accent-light overflow-hidden">
                <input type="file" id="image" name="image" accept="image/*" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onChange={handleImageChange} />
                <div className="h-32 w-full">
                  {imagePreview && (
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePreview}
                        alt="Uploaded"
                        layout="fill"
                        objectFit="contain"
                        className="max-w-full max-h-full"
                      />
                      <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-0 right-0 bg-gray-800 text-white rounded-full p-1 m-2"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  )}
                  {!imagePreview && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-gray-600">Upload an image for your article</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="content" className="text-lg font-medium text-gray-800">Content</label>
              <textarea id="content" name="content" rows={3} className="border border-gray-300 rounded-md px-4 py-2" value={articleDescription} onChange={handleArticleDescriptionChange}></textarea>
            </div>
            <button type="submit" className="bg-[#FA2E56] text-white px-6 py-3 rounded-md hover:bg-accent-dark transition duration-300" disabled={uploading}>
              {uploading ? 'Adding...' : 'Add Article'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default auth(Add);
