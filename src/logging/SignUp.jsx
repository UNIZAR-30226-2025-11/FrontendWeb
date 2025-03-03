import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ips, routes } from "../.constants";

import "../styles/LogIn.css"

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
const SignUp = () => {
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
    const handleChange = (e) => {
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
    const handleSubmit = async (e) => {
        // Don't reload the page on submit
        e.preventDefault()

        // Print the data
        console.log("Data sent:", {username: formData.username, password: formData.password});

        // Test if both passwords are the same
        if (formData.password !== formData.password2) {
            console.log("Passwords are not the same")
            return;
        }

        /**
         * Response from the server about the information we sent
         * for the sign up process.
         */
        const response = await fetch(ips.server + "/register",
            {
                mode: 'cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: formData.username, password:formData.password})
            }
        )

        // TODO: Call /login directly


        // If the answer is OK, we navigate to the appropiate page
        if (response.status === 201)
        {
            console.log("Everything is OK")
            navigate(routes.login)
        } else {
            console.log(response.body.message || "Something unexpected happenedt ")
        }
    }

    /**
     * Create the form for signing up
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

                    {/* Password validation */}
                    <p>Repeat your password:</p>

                    <input
                        type="password"
                        name="password2"
                        placeholder="Password"
                        value={formData.password2}
                        onChange={handleChange}
                        required>
                    </input>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="login-button">
                            SIGN UP
                    </button>

                    {/* Link to the loggin page */}
                    <p>
                        Do you already have an accout?
                        <a href={routes.login}>Log In</a>
                    </p>
            </form>
        </div>
    );
}

export default SignUp;
