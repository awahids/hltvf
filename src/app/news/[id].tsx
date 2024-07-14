"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsDetail from '../../components/NewsDetail';

interface Article {
  title: string;
  author: string;
  source: { name: string };
  urlToImage: string;
  content: string;
  url: string;
}

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=f14a82129f844616a68453c96e8ed113`)
        .then(response => response.json())
        .then(data => {
          const article = data.articles.find((article: Article) => article.title === id);
          setArticle(article);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!article) return <p>Article not found</p>;

  return <NewsDetail article={article} />;
};

export default NewsDetailPage;
