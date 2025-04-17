import { SERVER } from "../utils/config";
import { routes, routesRequest } from "../utils/constants";

export interface ApiResponse {
	type: "success" | "error" | "info" | "warning";
	message: string;
	displayTime?: number;
	redirectPath?: string
}

/**
 * Sends a message to the server for Log In.
 * @param username The username of the account
 * @param password The password of the account
 */
export const handleLogInAPI = async (
	username:string,
	password:string,
): Promise<ApiResponse> =>
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
			return {
				type: "success",
				message: "Login successful!",
				redirectPath: routes.gamemenu,
				displayTime: 1000
			}
		}
		else if (response.status == 401)
			return {
				type: "error",
				message: "Username or password are incorrect!",
				displayTime: 2000
			}
		else
			return {
				type: "error",
				message: "There is some problems with the server...",
				displayTime: 2000
			}

	}
	catch (error)
	{
		return {
			type: "error",
			message: "There is some problems with the server...",
			displayTime: 2000
		}

	}
}

/**
 * Sends a message to the Backend for creating a new
 * user with the specified information.
 * 
 * @param username Username of the new account
 * @param password Password of the new account
 * @param repeatPassword Validation of the new password
 */
export const handleSignUpAPI = async (
	username:string,
	password:string,
	repeatPassword:string,
): Promise<ApiResponse> => {

	// Test if both passwords are the same
	if (password !== repeatPassword) {
		return {
			type: "error",
			message: "Passwords are not the same",
			displayTime: 2000
		}
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
		return {
			type: "success",
			message: "Account created!",
			redirectPath: routes.gamemenu,
			displayTime: 1000
		};
	else if (response.status == 400)
		return {
			type: "warning",
			message: "The username is already taken!",
			displayTime: 2000
		};
	else
	  	return {
			type: "error",
			message: "There is some problems with the server...",
			displayTime: 2000
		};
}

/**
 * Sends to the Backend a message for log out
 */
export const handleLogoutAPI = async (
): Promise<ApiResponse> =>
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
		return {
			type: "success",
			message: "Logout successful!",
			redirectPath: routes.login,
			displayTime: 1000
		}
	else
		return {
			type: "error",
			message: "There is some problems with the server...",
			displayTime: 2000
		}
}

/**
 * Sends to the backend a message for deleting the
 * user account
 */
export const handleDeleteAccountAPI = async (	
): Promise<ApiResponse> =>
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
        return {
            type: "success",
            message: "Account deleted successfully!",
            redirectPath: routes.login,
            displayTime: 1000
        };
    else if (response.status == 401)
        return {
            type: "error",
            message: "Authentication failed. Please log in again.",
            redirectPath: routes.login,
            displayTime: 2000
        };
    else
        return {
            type: "error",
            message: "There was a problem with the server...",
            displayTime: 2000
        };
};

/**
 * Changes the password of the account of the user
 * @param newPassword 		The new password
 * @param repeatPassword 	The confirmation of the new
 * 							password
 */
export const handleConfirmChangeAPI = async (
	newPassword:string,
	repeatPassword:string
): Promise<ApiResponse> =>
{
	// Check if both passwords are the same
	if (newPassword != repeatPassword)
	{
        return {
            type: "error",
            message: "Passwords don't match!",
            displayTime: 2000
        };
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
		return {
			type: "success",
			message: "Password successfully changed!",
			redirectPath: routes.login,
			displayTime: 1000
		};
	else if (response.status == 401)
		return {
			type: "error",
			message: "Authentication failed. Please log in again.",
			redirectPath: routes.login,
			displayTime: 2000
		};
	else
		return {
			type: "error",
			message: "There was a problem with the server...",
			displayTime: 2000
		};
};
