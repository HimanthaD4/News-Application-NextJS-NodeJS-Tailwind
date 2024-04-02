"use client"
import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import Swal from 'sweetalert2';

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

interface ArticleCardProps {
  article: Article;
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
  toggleDescription: (id: string) => void;
  isExpanded: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  handleUpdate,
  handleDelete,
  toggleDescription,
  isExpanded,
}) => {
  const renderDescription = (description: string, id: string) => {
    const toggleButtonText = isExpanded ? "See Less" : "See More";

    return (
      <>
        <div
          className={`description ${isExpanded ? 'overflow-auto' : 'overflow-hidden'}`}
          style={{ maxHeight: isExpanded ? 'none' : '10em' }} // Adjust the maxHeight accordingly
        >
          {description}
        </div>
        {description.length > 660 && (
          <button
            className="text-blue-500 hover:underline ml-1"
            onClick={() => toggleDescription(id)}
          >
            {toggleButtonText}
          </button>
        )}
      </>
    );
  };

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire(
          'Deleted!',
          'Your article has been deleted.',
          'success'
        );
      }
    });
  };

  return (
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
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-none mx-auto md:mx-0 md:mr-4" style={{ width: '250px' }}>
            {article.image && (
              <Image
                src={`data:${article.image.contentType};base64,${Buffer.from(article.image.data).toString('base64')}`}
                alt="Article Image"
                width={350}
                height={150}
              />
            )}
          </div>
          <div className="mt-4 md:mt-0 md:flex-1">
            <div className="text-gray-700">
              {renderDescription(article.articleDescription, article._id)}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleUpdate(article._id)}
            className="text-gray-500 hover:text-blue-600 mr-2"
          >
            <FaEdit />
          </button> 
          <button
            onClick={() => confirmDelete(article._id)}
            className="text-gray-500 hover:text-red-600"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
