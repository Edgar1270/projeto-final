import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecom-back-strapi.onrender.com/api/animes",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyODMyMTM0LCJleHAiOjE3MzU0MjQxMzR9.sJACvTbr35OFmbnGqprTbbLFSMEH5A3S7EbM_p39vOY",
          },
        }
      )
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
    <div>
      <h2>Animes</h2>
      <ul>
        {users.map((user) => (
          <div>
            <li key={user.id}> {user.attributes.title}</li>
            <img src={user.attributes.coverImage} alt={user.attributes.title} />
          </div>

        ))}

      </ul>
    </div>
  );

}export default UserList;