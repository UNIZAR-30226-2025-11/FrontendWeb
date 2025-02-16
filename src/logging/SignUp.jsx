import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ips, routes } from "../.constants";

import "../styles/LogIn.css"

const SignUp = () => {
    const navigate = useNavigate()

    // Define the variables to use
    const [formData, setFormData] = useState(
    {
        username: "",
        password: "",
        password2: ""
    })

    // Save the data into the formData variable
    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    // Send data
    const handleSubmit = async (e) => {
        e.preventDefault() // Don't reload the page on submit
        console.log("Data sent:", formData)

        const response = await fetch(ips.server + routes.signup,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }
        )

        if (response.ok)
        {
            console.log("Everything is OK")
            navigate(routes.login)
        }
    }

    // Create the form
    return (
        <div className="login-container">
            <form
                onSubmit={handleSubmit}
                className="login-form">
                    <p>Username:</p>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required>
                    </input>

                    <p>Password:</p>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required>
                    </input>

                    <p>Repeat your password:</p>

                    <input
                        type="password"
                        name="password2"
                        placeholder="Password"
                        value={formData.password2}
                        onChange={handleChange}
                        required>
                    </input>

                    <button
                        type="submit"
                        className="login-button">
                            SIGN UP
                    </button>

                    <p>
                        Do you already have an accout?
                        <a href={routes.login}>Log In</a>
                    </p>
            </form>
        </div>
    );
}

export default SignUp;
