// src/components/NewsCard.jsx
import React from 'react';

const NewsCard = ({ title, description, image, date }) => (
  <div className="news-card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
    <span>{new Date(date).toLocaleDateString()}</span>
  </div>
);

export default NewsCard;