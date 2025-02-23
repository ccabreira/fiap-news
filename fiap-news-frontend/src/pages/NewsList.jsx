import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://fiap-news-api.onrender.com/news";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://fiap-news-api.onrender.com/news")
      .then((response) => response.json())
      .then((data) => setNews(data.data)) // Certifique-se de acessar a chave correta
      .catch((error) => console.error("Erro ao buscar notícias:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Últimas Notícias</h1>
      {news.length === 0 ? <p>Nenhuma notícia encontrada.</p> : null}
      {news.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <Link to={`/news/${item._id}`} style={{ textDecoration: "none", color: "white" }}>
            <h2>{item.title}</h2>
          </Link>
          <p><strong>Categoria:</strong> {item.category}</p>
          <p>{item.content.substring(0, 100)}...</p> {/* Exibe apenas um trecho */}
        </div>
      ))}
    </div>
  );
}

export default NewsList;


