import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseURL } from '@/utils/constant';
import Image from 'next/image';

const AddArticles = () => {
  const [articles, setArticles] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState({});

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

  const toggleDescription = (id) => {
    setExpandedArticle(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const wordCount = (text) => {
    return text.split(/\s+/).length;
  };

  const renderDescription = (description, id) => {
    const isLongText = wordCount(description) > 190;
    const shouldDisplayButton = isLongText && !expandedArticle[id];
    const displayedText = shouldDisplayButton ? `${description.substring(0, 950)}...` : description;

    return (
      <>
        <div className="text-gray-700">
          {displayedText}
          {isLongText && (
            <button
              onClick={() => toggleDescription(id)}
              className="text-blue-500 hover:text-blue-700 mt-2"
            >
              {expandedArticle[id] ? 'See Less' : 'See More'}
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className='flex flex-grow'>
      <div className={`bg-gray-100 min-h-screen py-8 px-4 sm:px-12 w-full`}>
        {articles.map((article) => (
          <div key={article._id} className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{article.articleHead}</h2>
                <div className="text-gray-500 text-sm">
                  {new Date(article.createdAt).toLocaleDateString()}{' '}
                  {new Date(article.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex -mx-4">
                <div className="flex-none px-4" style={{ width: '250px' }}>
                  {article.image && (
                    <Image
                      src={`data:${article.image.contentType};base64,${Buffer.from(article.image.data).toString('base64')}`}
                      alt="Article Image"
                      width={350}
                      height={150}
                    />
                  )}
                </div>
                <div className="px-4 flex">
                  {renderDescription(article.articleDescription, article._id)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddArticles;
