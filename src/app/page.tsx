"use client";

import Link from 'next/link';
import { getNews } from '@/services/newsApi';
import { useEffect, useState } from 'react';

interface Article {
  title: string;
  url: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      getNews({ country: 'id', q: searchTerm, sortBy: 'asc' })
        .then(data => setArticles(data.articles))
        .catch(err => console.error("Error:", err.response.data.message));
    } catch (err) {
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    fetchArticles();
    setLoading(false);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Top Headlines</h1>
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for news..."
          className="border p-2 mr-2 w-full max-w-xs md:max-w-md lg:max-w-lg text-black"
        />
        <button type="submit" className="bg-blue-500 text-slate-100 p-2 rounded">Search</button>
      </form>
      <ul className="space-y-4">
        {loading && <div className="flex items-center justify-center" role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>}
        {articles.map((article, index) => (
          <li key={index} className="border-b pb-2">
            <Link href={article.url}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
