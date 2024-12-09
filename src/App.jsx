import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://ecom-back-strapi.onrender.com/api/animes", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODMyMTM0LCJleHAiOjE3MzU0MjQxMzR9.sJACvTbr35OFmbnGqprTbbLFSMEH5A3S7EbM_p39vOY",
          },
        });
        setUsers(response.data.data); // Set the users data
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao carregar os animes. Tente novamente mais tarde.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Exibe a mensagem de carregando enquanto aguarda os dados
  }

  if (error) {
    return <div>{error}</div>; // Exibe erro caso haja falha na requisição
  }

  return (
    <div className="anime-list">
      <h2>Animes</h2>
      <div className="card-container">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <img
              src={user.attributes.coverImage}
              alt={`Capa do anime ${user.attributes.title}`}
              className="card-img"
            />
            <div className="card-content">
              <h3 className="card-title">{user.attributes.title}</h3>

              {/* Exibindo a sinopse */}
              <p className="card-description">
                <strong>Sinopse:</strong> {user.attributes.synopsis}
              </p>

              {/* Exibindo os gêneros */}
              <p className="card-genre">
                <strong>Gênero:</strong> {user.attributes.genre}
              </p>

              {/* Exibindo o número de episódios */}
              <p className="card-episodes">
                <strong>Episódios:</strong> {user.attributes.episodes}
              </p>

               {/* Exibindo a nota */}
               <p className="card-nota">
                <strong>Nota:</strong> {user.attributes.rating}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
