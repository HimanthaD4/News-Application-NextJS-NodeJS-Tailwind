import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrashAlt, FaEdit, FaTimes } from 'react-icons/fa';
import ArticleCard from "../../components/ArticleCard";
import { baseURL } from "@/utils/constant";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Swal from 'sweetalert2';

// Define interface for Article
interface Article {
  _id: string;
  articleHead: string;
  articleDescription: string;
  image: {
    contentType: string;
    data: string;
  };
  createdAt: string;
}

// Define Dashboard component
const Dashboard: React.FC = () => {
  // Define state variables
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedArticle, setExpandedArticle] = useState<{ [key: string]: boolean }>({});
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState<File | null>(null);
  const router = useRouter();

  // Fetch articles on component mount
  useEffect(() => {
    axios
      .get<Article[]>(`${baseURL}/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch articles!',
        });
      });
  }, []);

  // Handle article deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseURL}/articles/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Article deleted successfully',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete article!',
      });
    }
  };

  // Toggle article description visibility
  const toggleDescription = (id: string) => {
    setExpandedArticle(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Handle article update
  const handleUpdate = (id: string) => {
    const article = articles.find((article) => article._id === id);
    if (article) {
      setSelectedArticle(article);
      setUpdatedTitle(article.articleHead);
      setUpdatedDescription(article.articleDescription);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedArticle(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedImage(null);
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    setUpdatedDescription(value);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUpdatedImage(e.target.files[0]);
    }
  };

  // Handle article update submission
  const handleArticleUpdate = async () => {
    if (!selectedArticle || !updatedTitle || !updatedDescription) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Title and Description cannot be empty!',
      });
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
      // Update the article list with the updated article
      setArticles(articles.map(article => article._id === updatedArticle._id ? updatedArticle : article));
      setSelectedArticle(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedImage(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Article updated successfully',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update article!',
      });
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    handleArticleUpdate();
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-12 md:px-24 lg:px-32 xl:px-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">Article Reading Page</h1>
        
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            toggleDescription={toggleDescription}
            isExpanded={expandedArticle[article._id] || false}
          />
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          
          <div className="bg-white rounded-lg overflow-hidden z-10 w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={handleTitleChange}
                className="text-lg font-semibold outline-none flex-1"
                placeholder="Enter article title"
              />
              <FaTimes onClick={handleCloseModal} className="text-gray-500 cursor-pointer" />
            </div>
            <img
              src={`data:${selectedArticle.image.contentType};base64,${Buffer.from(selectedArticle.image.data).toString('base64')}`}
              alt="Article Image"
              className="w-full h-40 object-cover mb-4"
            />
            <input type="file" onChange={handleImageChange} accept="image/*" className="mb-4" />
          
          
            {typeof window !== 'undefined' && (
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                <SimpleMDE
                  value={updatedDescription}
                  onChange={handleDescriptionChange}
                />
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div className="text-gray-500 text-sm">
                {new Date(selectedArticle.createdAt).toLocaleDateString()}{" "}
                {new Date(selectedArticle.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
