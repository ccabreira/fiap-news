// src/pages/NewsList.jsx
import React, { useState, useEffect } from 'react';
import { getNews } from '../services/api';
import NewsCard from '../components/NewsCard';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para armazenar o erro

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(); // Busca as notícias
        setNews(data); // Atualiza o estado com as notícias
      } catch (error) {
        setError('Erro ao carregar notícias. Tente novamente mais tarde.'); // Define a mensagem de erro
        console.error('Erro ao buscar notícias:', error); // Log do erro no console
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <p>Carregando notícias...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Exibe a mensagem de erro
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
