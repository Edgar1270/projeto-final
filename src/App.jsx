import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecom-back-strapi.onrender.com/api/animes", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODMyMTM0LCJleHAiOjE3MzU0MjQxMzR9.sJACvTbr35OFmbnGqprTbbLFSMEH5A3S7EbM_p39vOY",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
