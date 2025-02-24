// src/pages/NewsList.jsx
import React, { useState, useEffect } from 'react';
import { getNews } from '../services/api';
import NewsCard from '../components/NewsCard';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews();
      setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) {
    return <p>Carregando notícias...</p>;
  }

  return (
    <div>
      <h1>Notícias</h1>
      <div className="news-list">
        {news.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
