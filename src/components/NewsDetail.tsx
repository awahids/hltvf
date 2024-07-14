import React from 'react';

interface Article {
  title: string;
  author: string;
  source: { name: string };
  urlToImage: string;
  content: string;
  url: string;
}

interface NewsDetailProps {
  article: Article;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ article }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Source:</strong> {article.source.name}</p>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-auto mt-4" />}
      <p className="mt-4">{article.content}</p>
      <p className="mt-4"><a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read more</a></p>
    </div>
  );
};

export default NewsDetail;
