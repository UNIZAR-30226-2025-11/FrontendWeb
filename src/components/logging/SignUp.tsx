// Code from: https://github.com/cooljasonmelton/cool-sign-up

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Container.css';
import { handleSignUp } from "../../services/apiService";

/**
 * Creates the form for the user's sign up process. It
 * takes all the information inside it and sends it to
 * the server.
 *
 * The form asks for username, password and password
 * validation.
 *
 * @returns The form
 */
export const SignUp = () => {
    /**
     * An object to manage the navigation inside
     * the page.
     */
    const navigate = useNavigate()

    /**
     * Objects for saving the information inside
     * the form
     */
    const [formData, setFormData] = useState(
    {
        username: "",
        password: "",
        password2: "",
    })

    /**
     * Saves the information inside the form in the
     * state of the form.
     *
     * @param {*} e The object that changed.
     */
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

  /**
   * Create the form for signing up
   */
  return (
    <div className="form-comp cfb">
      <h1>Create an Account!</h1>
        <form
          className="sign-up-form cfb"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp( formData.username,
                          formData.password,
                          formData.password2,
                          navigate
            )
          }}>
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

            {/* Password validation */}
            <label>
              Repeat password:
              <br/>
              <input
                  type="password"
                  name="password2"
                  placeholder="Repeat password"
                  value={formData.password2}
                  onChange={handleChange}
                  required>
              </input>
            </label>
            <br/>

              {/* Submit button */}
              <button
                  type="submit">
                      Sign Up!
              </button>
            </form>
        </div>
  );
}
