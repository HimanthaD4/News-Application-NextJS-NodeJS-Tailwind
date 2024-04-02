"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ArticleCard from '@/components/Admin/ArticleCard';
import { baseURL } from '@/utils/constant';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Header from '@/components/Admin/Header';
import Sidebar from '@/components/Admin/Sidebar';
import auth from '@/utils/withAuth';

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState({});
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${baseURL}/articles`);
        setArticles(res.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch articles!',
        });
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/articles/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
      Swal.fire('Success', 'Article deleted successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to delete article!', 'error');
    }
  };

  const toggleDescription = (id) => {
    setExpandedArticle(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleUpdate = (id) => {
    const article = articles.find((article) => article._id === id);
    if (article) {
      setSelectedArticle(article);
      setUpdatedTitle(article.articleHead);
      setUpdatedDescription(article.articleDescription);
    }
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedImage(null);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (value) => {
    setUpdatedDescription(value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedImage(e.target.files[0]);
    }
  };

  const handleArticleUpdate = async () => {
    if (!selectedArticle || !updatedTitle || !updatedDescription) {
      Swal.fire('Error', 'Title and Description cannot be empty!', 'error');
      return;
    }
    const formData = new FormData();
    formData.append("articleHead", updatedTitle);
    formData.append("articleDescription", updatedDescription);
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    try {
      const response = await axios.put(`${baseURL}/articles/${selectedArticle._id}`, formData);
      const updatedArticle = response.data;
      setArticles(articles.map(article => article._id === updatedArticle._id ? updatedArticle : article));
      handleCloseModal();
      Swal.fire('Success', 'Article updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update article!', 'error');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      {isSidebarOpen && <Sidebar />}
      <div className="ml-64 px-4 py-24"> 
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            handleUpdate={() => handleUpdate(article._id)}
            handleDelete={() => handleDelete(article._id)}
            toggleDescription={() => toggleDescription(article._id)}
            isExpanded={expandedArticle[article._id] || false}
          />
        ))}
        {selectedArticle && (
          <div className='fixed inset-0 flex items-center justify-center z-20'>
            <div className='fixed inset-0 bg-black bg-opacity-50'></div>
            <div className='bg-white rounded-lg overflow-hidden z-10 w-full max-w-md p-4'>
              <button onClick={handleCloseModal} className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <input
                type='text'
                value={updatedTitle}
                onChange={handleTitleChange}
                className='text-lg font-semibold outline-none flex-1'
                placeholder='Enter article title'
              />
              {selectedArticle.image && (
                <img
                  src={`data:${selectedArticle.image.contentType};base64,${Buffer.from(selectedArticle.image.data).toString('base64')}`}
                  alt='Article'
                  className='w-full h-40 object-cover mb-4'
                />
              )}
              <input type='file' onChange={handleImageChange} accept='image/*' className='mb-4' />
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <SimpleMDE
                  value={updatedDescription}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className='flex justify-between items-center mt-4'>
                <div className='text-gray-500 text-sm'>
                  {new Date(selectedArticle.createdAt).toLocaleDateString()}{" "}
                  {new Date(selectedArticle.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <button onClick={handleCloseModal} className='bg-[#000000] text-white px-4 py-2 rounded-md hover:bg-red-600'>
                  Cancel
                </button>
                <button onClick={handleArticleUpdate} className='bg-[#FA2E56] text-white px-4 py-2 rounded-md hover:bg-#FA2E56'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default auth(Admin);
