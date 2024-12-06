import React from "react";

function AnimeCard({ title, episodes, status, rating, genre}) {
  return (
    <div className="anime-card">
      <div className="anime-info">
        <h2 className="anime-title">{title}</h2>
        <p className="anime-episodes">Episódios: {episodes}</p>
        <p className="anime-status">Status: {status}</p>
        <p className="anime-genre">Genero: {genre}</p>
      </div>
      <div className="anime-rating">{rating}</div>
    </div>
  );
}

export default AnimeCard;
