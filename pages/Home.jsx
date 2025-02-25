import { useEffect, useState } from "react";
import { getNews } from "../services/api";
import NewsCard from "../components/NewsCard";

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  return (
    <div>
      <h1>Últimas Notícias</h1>
      {news.map((item) => (
        <NewsCard key={item._id} {...item} />
      ))}
    </div>
  );
}

export default Home;