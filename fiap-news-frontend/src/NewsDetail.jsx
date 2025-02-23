import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/news/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a notícia.");
        }
        return response.json();
      })
      .then((data) => {
        setNewsItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{newsItem.title}</h1>
      <p><strong>Categoria:</strong> {newsItem.category}</p>
      <p>{newsItem.content}</p>
      <p><em>Publicado em: {new Date(newsItem.createdAt).toLocaleDateString()}</em></p>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <button
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#555",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </Link>
    </div>
  );
}

export default NewsDetail;

