import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`https://fiap-news-api.onrender.com/news/${id}`)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Erro ao buscar notícia:", error));
  }, [id]);

  if (!news) return <p>Carregando...</p>;

  return (
    <div style={styles.container}>
      <h2>{news.title}</h2>
      <p><strong>Autor:</strong> {news.author}</p>
      <p>{news.content}</p>
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
};

export default NewsDetail;
