import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function AnimeList() {
  // Renomeando os estados para representar melhor o que eles armazenam
  const [animeData, setAnimeData] = useState([]); // Para armazenar os animes recebidos
  const [isLoading, setIsLoading] = useState(true); // Para controlar o estado de carregamento
  const [errorMessage, setErrorMessage] = useState(null); // Para armazenar a mensagem de erro

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        // Fazendo a requisição e desestruturando a resposta diretamente
        const { data } = await axios.get("https://ecom-back-strapi.onrender.com/api/animes", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODMyMTM0LCJleHAiOjE3MzU0MjQxMzR9.sJACvTbr35OFmbnGqprTbbLFSMEH5A3S7EbM_p39vOY",
          },
        });

        // Desestruturando o objeto 'data' para pegar os animes
        const { data: animeList } = data; // 'data' dentro de 'response' contém a chave 'data' com os animes

        if (!animeList) {
          throw new Error("Dados inválidos recebidos da API.");
        }

        setAnimeData(animeList); // Set the anime list
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setErrorMessage("Erro ao carregar os animes. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    fetchAnimeData();
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setAnimeData([]); // Limpar os dados antigos antes de tentar novamente
    fetchAnimeData(); // Tenta carregar os dados novamente
  };

  if (isLoading) {
    return <div>Carregando...</div>; // Exibe a mensagem de carregando enquanto aguarda os dados
  }

  if (errorMessage) {
    return (
      <div className="error-container">
        <p>{errorMessage}</p> {/* Mensagem de erro */}
        <button onClick={handleRetry} className="retry-button">
          Tentar novamente
        </button>
      </div>
    ); // Exibe erro caso haja falha na requisição
  }

  return (
    <div className="anime-list">
      <h2>Meus Animes</h2>
      <div className="card-container">
        {animeData.map(({ id, attributes }) => {
          const { coverImage, title, synopsis, genre, episodes, rating } = attributes;

          return (
            <div className="card" key={id}>
              <img
                src={coverImage}
                alt={`Capa do anime ${title}`}
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">{title}</h3>

                {/* Exibindo a sinopse */}
                <p className="card-description">
                  <strong>Sinopse:</strong> {synopsis}
                </p>

                {/* Exibindo os gêneros */}
                <p className="card-genre">
                  <strong>Gênero:</strong> {genre}
                </p>

                {/* Exibindo o número de episódios */}
                <p className="card-episodes">
                  <strong>Episódios:</strong> {episodes}
                </p>

                {/* Exibindo a nota */}
                <p className="card-rating">
                  <strong>Nota:</strong> {rating}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnimeList;
