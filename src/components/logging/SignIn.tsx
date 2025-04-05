// Code from:
// https://github.com/cooljasonmelton/cool-sign-up
import React, { useState } from 'react';

// styling
import { useNavigate } from 'react-router-dom';

import './Container.css';
import { handleLogIn } from '../../services/apiService';

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

  return (
    <div className="form-comp cfb">
      <h1>Log In!</h1>
      <form className="sign-up-form cfb"
            onSubmit={(e) => {
              e.preventDefault(),
              handleLogIn(
                formData.username,
                formData.password,
                navigate)}}>

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
