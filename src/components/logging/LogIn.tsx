import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { routes, routesRequest } from "../../utils/constants";

import "./LogIn.css"
import { SERVER } from "../../utils/config";

/**
 * Creates a form for the user's logging that
 * takes the information inside it and sends it
 * to the server.
 *
 * The form asks for username and password.
 *
 * @returns The form
 */
const LogIn = (
    {
        setUsername
    } : {
        setUsername:React.Dispatch<React.SetStateAction<string>>
    }) => {
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            // If there is a good response, navigate to the
            // appropiate page
            if (response.status === 200)
            {
                setUsername(formData.username)
                navigate(routes.gamemenu)
            }
            else {
                console.log(response)
            }
        }
        catch (error)
        {
            console.error("Something went wrong:", error)
        }
    }


    /**
     * Create the form of the page
     */
    return (
        <div className="login-container">
            <form
                onSubmit={handleSubmit}
                className="login-form">
                    {/* Username */}
                    <p>Username:</p>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required>
                    </input>

                    {/* Password */}
                    <p>Password:</p>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required>
                    </input>

                    {/* Button for sending the form */}
                    <button
                        type="submit"
                        className="login-button">
                            Log In
                    </button>

                    {/* Link to the Sign Up page */}
                    <p>
                        Don&apos;t you have an accout yet?
                        <a href={routes.signup}>Sign Up</a>
                    </p>
            </form>
        </div>
    );
}

export default LogIn;
