import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/news`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        setNews(data.data);
      })
      .catch((error) => console.error("Erro ao buscar notícias:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Últimas Notícias</h1>
      {news.length === 0 ? <p>Nenhuma notícia encontrada.</p> : null}
      {news.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <Link to={`/news/${item._id}`}>
            <h2>{item.title}</h2>
          </Link>
          <p><strong>Categoria:</strong> {item.category}</p>
          <p>{item.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
