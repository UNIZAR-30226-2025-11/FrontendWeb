// Code from: https://github.com/cooljasonmelton/cool-sign-up
import React, { useState } from 'react';

// styling
import { useNavigate } from 'react-router-dom';
import { SERVER } from '../../utils/config';
import { routes, routesRequest } from '../../utils/constants';

import './Container.css';

export const SignIn = () => {

  /**
       * Object to manage the navigation inside the
       * application
       */
  const navigate = useNavigate()

  /**
   * Information of the logging form. It contains
   * the username and the password
   */
  const [formData, setFormData] = useState(
  {
      username: "",   // Identifier of the user
      password: ""    // His password
  });

  /**
   * Saves the information in the state of the
   * form.
   *
   * @param {*} e The object of the action
   */
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      // Save the value of the field inside the state
      // of the filed.
      setFormData(
          {
              ...formData,
              [e.target.name]: e.target.value
          }
      )
  }

  /**
   * Sends the data of the form to the server and show
   * the response.
   *
   * @param {*} e The object from the action
   */
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      // Don't reload the page on submit
      e.preventDefault()

      try
      {
        // Send the POST request with the user data
        const response = await fetch(SERVER + routesRequest.login,
        {
            mode:  "cors",
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })

        // If there is a good response, navigate to the
        // appropiate page
        if (response.status === 200)
        {
            navigate(routes.gamemenu);
            window.location.reload();
        }
        else if (response.status == 401)
          alert("Username or password are incorrect!")
        else
          alert("There is some problems with the server...")

      }
      catch (error)
      {
          console.error("Something went wrong:", error)
      }
  }


  return (
    <div className="form-comp cfb">
      <h1>Log In!</h1>
      <form className="sign-up-form cfb"
            onSubmit={handleSubmit}>

        {/* Username */}
        <label>
          Username:
          <br/>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required>
          </input>
        </label>

        {/* Password */}
        <label>
          Password:
          <br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required>
          </input>
        </label>
        <br/>

        {/* Button for sending the form */}
        <button
          type="submit"
          className="login-button">
              Log In!
        </button>
      </form>
    </div>
  );
}
