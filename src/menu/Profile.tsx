import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ips, routes } from "../utils/constants";

/*Only tests remain, but it is already functional. Here's an overview of what has been

    GET /users -> 200 OK always, will return an array of all users (can be empty)
    POST /users -> Not implemented, no sense in implementing it since /register already exists. Will return 501 Not
    GET /users/{:username} -> 200 OK if user exists, otherwise 404

These routes are protected using the data from the JWT: if the user or UUID don't match, it will throw 403 Forbidden.

    PUT /users/{:username} -> Will modify the record with whatever JSON you pass, as long as they are rows. 200 OK if it is updated successfully, 400 Bad Request with error message if something went wrong, 404 if not found.
    DELETE /users/{:username} -> Delete user. 200 OK if successful, 404 if not found.

There is also a /users/id/{:uuid} route available with the same three methods as the /users/{:username} route.*/


const Profile = () => {
  const navigate = useNavigate();


  /**
   * State of the users
   */
  const [users, setUser] = useState([{
      id: "",
      username: "",
      games_played: 0,
      games_won: 0,
      coins: 0
  }]);

  /**
   * Load the user when the profile is loaded
   */
//   useEffect(() => {
//       fetch(ips.server + routes.profile)
//           .then((response) => {
//               if (!response.ok) {
//                   throw new Error('HTTP Error: Status ${respone.status}')
//               }
//               return response.json()
//           })
//           .then((data) => setUser(data))
//           .catch((error) => console.error("Error:", error));
//   }
//   , []);

//   console.log(users);
//   console.log(users[0]);
//   console.log(users[0].username);
//   console.log(users[0].games_played);
//   console.log(users.length);

  /**
   * Get the information of our particular User
   */
//   const foundUser = users[0];
//   console.log(foundUser);
//   const user = { ...foundUser };
//   console.log(user);

  // Placeholder user
  const user = {
      id: "1",
      username: "test",
      games_played: 435,
      games_won: 231,
      coins: 4363
  };

  const user_id = user.id;
  console.log(user_id);

  const DeleteProfile = async (user) => {
      fetch(ips.server + routes.profile + `/${user.id}`, {
          method: 'DELETE',
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('HTTP Error: Status ${respone.status}')
          }
          return response.json()
      })
      .then((data) => setUser(data))
      .catch((error) => console.error("Error:", error));
  }




  return (
      <div style={{ height: `calc(100vh - 40px)`,
        marginTop:"40px"}}>
          <h1>User profile</h1>
          <p>Username: {user.username}</p>
          <p>Games played: {user.games_played}</p>
          <p>Games won: {user.games_won}</p>
          <p>Games lost: {user.games_played - user.games_won}</p>
          <p>Coins: {user.coins}</p>

          <button
              onClick={() => navigate(routes.gamemenu)}
          >
              Back to menu
          </button>

          <button
              onClick={() => navigate(routes.usermod)}
          >
              Modify user
          </button>
          <button
              onClick={() => DeleteProfile(user)}
          >
              Delete profile
          </button>
      </div>
);
};

export default Profile;
