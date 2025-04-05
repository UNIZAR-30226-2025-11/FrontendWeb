import { NavigateFunction, useNavigate } from "react-router-dom";
import { SERVER } from "../utils/config";
import { routes, routesRequest } from "../utils/constants";

/**
 * Sends a message to the server for Log In.
 * @param username The username of the account
 * @param password The password of the account
 * @param navigate A way to navigate across the pages
 */
export const handleLogIn = async (
	username:string,
	password:string,
	navigate:NavigateFunction
) =>
{
   	try
   	{
		// Create the request
		const response = await fetch(
			SERVER + routesRequest.login,
		{
			mode:  "cors",
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password
			}),
		})

		// Check the answer
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

/**
 * Sends a message to the Backend for creating a new
 * user with the specified information.
 * 
 * @param username Username of the new account
 * @param password Password of the new account
 * @param repeatPassword Validation of the new password
 * @param navigate A way to navigate across the pages
 */
export const handleSignUp = async (
	username:string,
	password:string,
	repeatPassword:string,
	navigate:NavigateFunction
) => {

	// Test if both passwords are the same
	if (password !== repeatPassword) {
		alert("Passwords are not the same")
		return;
	}

	// Create the request to the server
	const response = await fetch(SERVER + routesRequest.signup,
		{
			mode: 'cors',
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password
			})
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
 * Sends to the Backend a message for log out
 */
export const handleLogout = async () =>
{
	// Create the request of logout
	const response = await fetch(
		SERVER + routesRequest.logout,
		{
			mode: "cors",
			method: "POST",
			credentials: "include",
			headers: {
			"Content-Type": "application/json",
			}
		}
	)

	// Check the answer
	if (response.status == 200)
		window.location.reload();
	else
		alert("Something didn't work...");
}

/**
 * Sends to the backend a message for deleting the
 * user account
 */
export const handleDeleteAccout = async () =>
{
	// Create the request
	const response = await fetch(
		SERVER + routesRequest.user,
		{
			mode: "cors",
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include',
		}
	)

	// Check the answer
	if (response.status == 200)
		window.location.reload();
	else if (response.status == 401)
		alert("Something went wrong with JWT");
	else
		alert("Something went wrong...")
};

/**
 * Changes the password of the account of the user
 * @param newPassword 		The new password
 * @param repeatPassword 	The confirmation of the new
 * 							password
 */
export const handleConfirmChange = async (
	newPassword:string,
	repeatPassword:string
) =>
{
	// Check if both passwords are the same
	if (newPassword != repeatPassword)
	{
		alert("Passwords don't match!");
		return
	}

	// Create the request
	const response = await fetch(
		SERVER + routesRequest.user,
		{
			mode: "cors",
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify({
				password: newPassword
			}),
		}
	)

	// Check the answer
	if (response.status == 200)
	{
		alert("Password successfully changed!");
		handleLogout();
	}
	else if (response.status == 401)
		alert("Something went wrong with JWT")
	else
	  	alert("Something went wrong...")
};
