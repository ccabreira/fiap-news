import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/news/${id}`)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Erro ao buscar notícia:", error));
  }, [id]);

  if (!news) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{news.title}</h2>
      <p><strong>Categoria:</strong> {news.category}</p>
      <p>{news.content}</p>
    </div>
  );
}

export default NewsDetail;
