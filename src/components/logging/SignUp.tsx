// Code from: https://github.com/cooljasonmelton/cool-sign-up

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { routes, routesRequest } from "../../utils/constants";

import { SERVER } from "../../utils/config";

import './Container.css';

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
     * Sends the information inside the form to the
     * server.
     *
     * @param {*} e The form to send.
     */
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        // Don't reload the page on submit
        e.preventDefault()

        // Test if both passwords are the same
        if (formData.password !== formData.password2) {
            alert("Passwords are not the same")
            return;
        }

        /**
         * Response from the server about the information we sent
         * for the sign up process.
         */
        const response = await fetch(SERVER + routesRequest.signup,
            {
                mode: 'cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: formData.username, password:formData.password})
            }
        )

        // If the answer is OK, we navigate to the appropiate page
        if (response.status === 201)
        {
            navigate(routes.gamemenu);
            window.location.reload();
        } else if (response.status == 400)
          alert("The username already exists!");
        else
          alert("Something has fail in the server...");
    }

    /**
     * Create the form for signing up
     */

  return (
    <div className="form-comp cfb">
      <h1>Create an Account!</h1>
        <form
          className="sign-up-form cfb"
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
