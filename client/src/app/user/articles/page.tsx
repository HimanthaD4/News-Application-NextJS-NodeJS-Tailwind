import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Header from '@/components/User/Header';
import { FaRegShareSquare, FaRegHeart, FaRegComment } from 'react-icons/fa';


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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get<Article[]>('http://localhost:5000/api/articles');
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

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mx-auto px-4 sm:px-8 py-16 md:py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {articles.map((article) => (
              <div key={article._id} className="w-full">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden relative">
                  <div className="p-4 flex flex-col h-full">
                    <div className="h-52 w-full relative overflow-hidden rounded-t-lg mb-2">
                      <Image
                        src={`data:${article.image.contentType};base64,${Buffer.from(article.image.data).toString('base64')}`}
                        alt="Article Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <h2 className="text-lg font-semibold mb-2 h-16 overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{article.articleHead}</h2>
                    <div className="text-gray-500 text-sm mb-2">
                      {new Date(article.createdAt).toLocaleDateString()}{' '}
                      {new Date(article.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="border-t border-gray-300 mt-auto pt-4" />
                    <div className="text-sm h-20 overflow-hidden mb-2">
                      {article.articleDescription}
                    </div>


                    <div className="border-t border-gray-300 mt-auto pt-4 flex justify-between items-center">
  <button className="bg-[#FA2E56] text-white px-3 py-1 rounded-sm hover:bg-[#000000] transition duration-300" onClick={() => handleReadMore(article)}>
    Read More
  </button>
  <div className="flex items-center">
    <FaRegShareSquare className="text-gray-600 hover:text-[#FA2E56] cursor-pointer mr-2" />
    <FaRegHeart className="text-gray-600 hover:text-[#FA2E56] cursor-pointer mr-2" />
    <FaRegComment className="text-gray-600 hover:text-[#FA2E56] cursor-pointer" />
  </div>
</div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedArticle && (
      <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-4/5 h-4/5 max-w-4xl max-h-4xl overflow-auto">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={() => setIsModalOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-semibold mb-4">{selectedArticle.articleHead}</h2>
          <div className="relative h-72 mb-4">
            <Image
              src={`data:${selectedArticle.image.contentType};base64,${Buffer.from(selectedArticle.image.data).toString('base64')}`}
              alt="Article Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-gray-700 mb-4">{selectedArticle.articleDescription}</p>
          <button className="bg-[#FA2E56] text-white px-4 py-2 rounded-md hover:bg-[#000000] transition duration-300" onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Articles;
